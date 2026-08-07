import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { roleCaseSql } from "@/lib/role-classifier";

type SalaryStatsRow = {
  averageSalary: number | null;
  observations: bigint;
};

type RoleDistributionRow = {
  role: string;
  jobCount: bigint;
};

type SkillDistributionRow = {
  id: string;
  name: string;
  normalizedName: string;
  category: string | null;
  jobCount: bigint;
};

type LocationDistributionRow = {
  state: string;
  jobCount: bigint;
};

export class IntelligenceRepository {
  async getTotalJobs() {
    return prisma.jobPosting.count();
  }

  async getDatasetSalaryBaseline() {
    const stats = await prisma.jobPosting.aggregate({
      where: {
        OR: [{ salaryMin: { not: null } }, { salaryMax: { not: null } }],
      },
      _avg: {
        salaryMin: true,
        salaryMax: true,
      },
    });

    const min = stats._avg.salaryMin;
    const max = stats._avg.salaryMax;

    if (min !== null && max !== null) return Math.round((min + max) / 2);
    return Math.round(min ?? max ?? 0) || null;
  }

  async findSkillBySlug(slug: string) {
    return prisma.skill.findFirst({
      where: {
        OR: [
          { normalizedName: slug },
          { normalizedName: slug.replace(/-/g, " ") },
          { name: { equals: slug.replace(/-/g, " "), mode: "insensitive" } },
        ],
      },
    });
  }

  async getSkillJobCount(skillId: string) {
    return prisma.jobPostingSkill.count({ where: { skillId } });
  }

  async getSkillSalaryStats(skillId: string) {
    const [row] = await prisma.$queryRaw<SalaryStatsRow[]>`
      SELECT
        ROUND(AVG(
          CASE
            WHEN j."salaryMin" IS NOT NULL AND j."salaryMax" IS NOT NULL
            THEN (j."salaryMin" + j."salaryMax") / 2.0
            WHEN j."salaryMin" IS NOT NULL THEN j."salaryMin"
            ELSE j."salaryMax"
          END
        )::numeric)::float8 AS "averageSalary",
        COUNT(*) AS "observations"
      FROM "JobPostingSkill" jps
      JOIN "JobPosting" j ON j."id" = jps."jobPostingId"
      WHERE jps."skillId" = ${skillId}
        AND (j."salaryMin" IS NOT NULL OR j."salaryMax" IS NOT NULL);
    `;

    return row ?? { averageSalary: null, observations: BigInt(0) };
  }

  async getRolesForSkill(skillId: string, limit = 8) {
    return prisma.$queryRaw<RoleDistributionRow[]>`
      SELECT "role", COUNT(*) AS "jobCount"
      FROM (
        SELECT ${roleCaseSql} AS "role"
        FROM "JobPosting" j
        JOIN "JobPostingSkill" jps ON jps."jobPostingId" = j."id"
        WHERE jps."skillId" = ${skillId}
      ) classified
      WHERE "role" IS NOT NULL
      GROUP BY "role"
      ORDER BY COUNT(*) DESC
      LIMIT ${limit};
    `;
  }

  async getRelatedSkills(skillId: string, limit = 8) {
    return prisma.$queryRaw<SkillDistributionRow[]>`
      SELECT
        s."id",
        s."name",
        s."normalizedName",
        s."category"::text AS "category",
        COUNT(*) AS "jobCount"
      FROM "JobPostingSkill" selected
      JOIN "JobPostingSkill" related
        ON related."jobPostingId" = selected."jobPostingId"
        AND related."skillId" <> selected."skillId"
      JOIN "Skill" s ON s."id" = related."skillId"
      WHERE selected."skillId" = ${skillId}
      GROUP BY s."id", s."name", s."normalizedName", s."category"
      ORDER BY COUNT(*) DESC
      LIMIT ${limit};
    `;
  }

  async getLocationsForSkill(skillId: string, limit = 8) {
    return prisma.$queryRaw<LocationDistributionRow[]>`
      SELECT j."state", COUNT(*) AS "jobCount"
      FROM "JobPostingSkill" jps
      JOIN "JobPosting" j ON j."id" = jps."jobPostingId"
      WHERE jps."skillId" = ${skillId}
        AND j."state" IS NOT NULL
      GROUP BY j."state"
      ORDER BY COUNT(*) DESC
      LIMIT ${limit};
    `;
  }

  async getSalaryPeersByCategory(category: string | null, limit = 12) {
    if (!category) return [];

    return prisma.$queryRaw<
      Array<{
        id: string;
        name: string;
        normalizedName: string;
        category: string | null;
        averageSalary: number;
        observations: bigint;
      }>
    >`
      SELECT
        s."id",
        s."name",
        s."normalizedName",
        s."category"::text AS "category",
        ROUND(AVG(
          CASE
            WHEN j."salaryMin" IS NOT NULL AND j."salaryMax" IS NOT NULL
            THEN (j."salaryMin" + j."salaryMax") / 2.0
            WHEN j."salaryMin" IS NOT NULL THEN j."salaryMin"
            ELSE j."salaryMax"
          END
        )::numeric)::float8 AS "averageSalary",
        COUNT(*) AS "observations"
      FROM "Skill" s
      JOIN "JobPostingSkill" jps ON jps."skillId" = s."id"
      JOIN "JobPosting" j ON j."id" = jps."jobPostingId"
      WHERE s."category"::text = ${category}
        AND (j."salaryMin" IS NOT NULL OR j."salaryMax" IS NOT NULL)
      GROUP BY s."id", s."name", s."normalizedName", s."category"
      ORDER BY "averageSalary" DESC
      LIMIT ${limit};
    `;
  }

  async getRoleJobCount(roleName: string) {
    const [row] = await prisma.$queryRaw<Array<{ jobCount: bigint }>>`
      SELECT COUNT(*) AS "jobCount"
      FROM (
        SELECT ${roleCaseSql} AS "role"
        FROM "JobPosting"
      ) classified
      WHERE "role" = ${roleName};
    `;

    return Number(row?.jobCount ?? BigInt(0));
  }

  async getRoleSalaryStats(roleName: string) {
    const [row] = await prisma.$queryRaw<SalaryStatsRow[]>`
      SELECT
        ROUND(AVG(
          CASE
            WHEN "salaryMin" IS NOT NULL AND "salaryMax" IS NOT NULL
            THEN ("salaryMin" + "salaryMax") / 2.0
            WHEN "salaryMin" IS NOT NULL THEN "salaryMin"
            ELSE "salaryMax"
          END
        )::numeric)::float8 AS "averageSalary",
        COUNT(*) AS "observations"
      FROM (
        SELECT "salaryMin", "salaryMax", ${roleCaseSql} AS "role"
        FROM "JobPosting"
      ) classified
      WHERE "role" = ${roleName}
        AND ("salaryMin" IS NOT NULL OR "salaryMax" IS NOT NULL);
    `;

    return row ?? { averageSalary: null, observations: BigInt(0) };
  }

  async getSkillsForRole(roleName: string, limit = 10) {
    return prisma.$queryRaw<SkillDistributionRow[]>`
      SELECT
        s."id",
        s."name",
        s."normalizedName",
        s."category"::text AS "category",
        COUNT(*) AS "jobCount"
      FROM (
        SELECT "id", ${roleCaseSql} AS "role"
        FROM "JobPosting"
      ) classified
      JOIN "JobPostingSkill" jps ON jps."jobPostingId" = classified."id"
      JOIN "Skill" s ON s."id" = jps."skillId"
      WHERE classified."role" = ${roleName}
      GROUP BY s."id", s."name", s."normalizedName", s."category"
      ORDER BY COUNT(*) DESC
      LIMIT ${limit};
    `;
  }

  async getLocationsForRole(roleName: string, limit = 8) {
    return prisma.$queryRaw<LocationDistributionRow[]>`
      SELECT "state", COUNT(*) AS "jobCount"
      FROM (
        SELECT "state", ${roleCaseSql} AS "role"
        FROM "JobPosting"
      ) classified
      WHERE "role" = ${roleName}
        AND "state" IS NOT NULL
      GROUP BY "state"
      ORDER BY COUNT(*) DESC
      LIMIT ${limit};
    `;
  }

  async getRolePeers(limit = 12) {
    return prisma.$queryRaw<
      Array<{
        role: string;
        jobCount: bigint;
        averageSalary: number | null;
        observations: bigint;
      }>
    >`
      SELECT
        "role",
        COUNT(*) AS "jobCount",
        ROUND(AVG(
          CASE
            WHEN "salaryMin" IS NOT NULL AND "salaryMax" IS NOT NULL
            THEN ("salaryMin" + "salaryMax") / 2.0
            WHEN "salaryMin" IS NOT NULL THEN "salaryMin"
            WHEN "salaryMax" IS NOT NULL THEN "salaryMax"
            ELSE NULL
          END
        )::numeric)::float8 AS "averageSalary",
        COUNT(CASE WHEN "salaryMin" IS NOT NULL OR "salaryMax" IS NOT NULL THEN 1 END) AS "observations"
      FROM (
        SELECT "salaryMin", "salaryMax", ${roleCaseSql} AS "role"
        FROM "JobPosting"
      ) classified
      WHERE "role" IS NOT NULL
      GROUP BY "role"
      ORDER BY COUNT(*) DESC
      LIMIT ${limit};
    `;
  }

  async getSearchSkills(query = "", limit = 20) {
    return prisma.skill.findMany({
      take: limit,
      where: query
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: { name: "asc" },
      select: { name: true, normalizedName: true },
    });
  }

  async getTopSearchSkills(limit = 3) {
    const grouped = await prisma.jobPostingSkill.groupBy({
      by: ["skillId"],
      _count: {
        skillId: true,
      },
      orderBy: {
        _count: {
          skillId: "desc",
        },
      },
      take: limit,
    });

    const skillIds = grouped.map((item) => item.skillId);
    const skills = await prisma.skill.findMany({
      where: {
        id: {
          in: skillIds,
        },
      },
      select: {
        id: true,
        name: true,
        normalizedName: true,
      },
    });
    const skillMap = new Map(skills.map((skill) => [skill.id, skill]));

    return grouped
      .map((item) => skillMap.get(item.skillId))
      .filter((skill) => skill !== undefined);
  }

  rawRoleCase() {
    return Prisma.sql`${roleCaseSql}`;
  }
}
