import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

type HighestPayingSkillRow = {
  id: string;
  name: string;
  category: string | null;
  averageSalary: number;
  jobsWithSalary: bigint;
};

type CompanyCountRow = {
  count: bigint;
};

type TopRoleRow = {
  role: string;
  jobCount: bigint;
  averageSalary: number | null;
  jobsWithSalary: bigint;
};

export class AnalyticsRepository {
  // =========================================================
  // TOP SKILLS - KEEP YOUR WORKING VERSION
  // =========================================================

  async getTopSkills(limit: number) {
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

  const skillIds = grouped.map(
    (item) => item.skillId
  );

  const skills = await prisma.skill.findMany({
    where: {
      id: {
        in: skillIds,
      },
    },

    select: {
      id: true,
      name: true,
      category: true,
    },
  });

  const skillMap = new Map(
    skills.map((skill) => [
      skill.id,
      skill,
    ])
  );

  return grouped.map((item) => {
    const skill =
      skillMap.get(item.skillId);

    return {
      id: item.skillId,
      name:
        skill?.name ?? "Unknown",
      category:
        skill?.category ?? null,
      jobCount:
        item._count.skillId,
    };
  });
}
  // =========================================================
  // HIGHEST PAYING SKILLS
  // PostgreSQL does all salary calculations
  // =========================================================

  async getHighestPayingSkills(
    limit: number,
    minimumJobs = 3
  ) {
    return prisma.$queryRaw<HighestPayingSkillRow[]>`
      SELECT
        s."id",
        s."name",
        s."category"::text AS "category",

        ROUND(
          AVG(
            CASE
              WHEN j."salaryMin" IS NOT NULL
                AND j."salaryMax" IS NOT NULL
              THEN (j."salaryMin" + j."salaryMax") / 2.0

              WHEN j."salaryMin" IS NOT NULL
              THEN j."salaryMin"

              ELSE j."salaryMax"
            END
          )::numeric
        )::float8 AS "averageSalary",

        COUNT(*) AS "jobsWithSalary"

      FROM "Skill" s

      JOIN "JobPostingSkill" jps
        ON jps."skillId" = s."id"

      JOIN "JobPosting" j
        ON j."id" = jps."jobPostingId"

      WHERE
        j."salaryMin" IS NOT NULL
        OR j."salaryMax" IS NOT NULL

      GROUP BY
        s."id",
        s."name",
        s."category"

      HAVING COUNT(*) >= ${minimumJobs}

      ORDER BY "averageSalary" DESC

      LIMIT ${limit};
    `;
  }

  // =========================================================
  // JOBS BY STATE
  // PostgreSQL groups before returning anything
  // =========================================================

  async getJobsByState(limit: number) {
    return prisma.jobPosting.groupBy({
      by: ["state"],

      where: {
        state: {
          not: null,
        },
      },

      _count: {
        _all: true,
      },

      orderBy: {
        _count: {
          state: "desc",
        },
      },

      take: limit,
    });
  }

  // =========================================================
  // JOBS BY CITY
  // =========================================================

  async getJobsByCity(limit: number) {
    return prisma.jobPosting.groupBy({
      by: ["city", "state"],

      where: {
        city: {
          not: null,
        },
      },

      _count: {
        _all: true,
      },

      orderBy: {
        _count: {
          city: "desc",
        },
      },

      take: limit,
    });
  }

  // =========================================================
  // TOP ROLES
  // Classification + grouping happens in PostgreSQL
  // =========================================================

  async getTopRoles(limit: number) {
  return prisma.$queryRaw<TopRoleRow[]>`
    SELECT
      "role",

      COUNT(*) AS "jobCount",

      ROUND(
        AVG(
          CASE
            WHEN "salaryMin" IS NOT NULL
              AND "salaryMax" IS NOT NULL
            THEN ("salaryMin" + "salaryMax") / 2.0

            WHEN "salaryMin" IS NOT NULL
            THEN "salaryMin"

            WHEN "salaryMax" IS NOT NULL
            THEN "salaryMax"

            ELSE NULL
          END
        )::numeric
      )::float8 AS "averageSalary",

      COUNT(
        CASE
          WHEN "salaryMin" IS NOT NULL
            OR "salaryMax" IS NOT NULL
          THEN 1
        END
      ) AS "jobsWithSalary"

    FROM (
      SELECT
        "salaryMin",
        "salaryMax",

        CASE
          WHEN LOWER("title") LIKE '%full stack%'
            OR LOWER("title") LIKE '%full-stack%'
            OR LOWER("title") LIKE '%fullstack%'
          THEN 'Full Stack Developer'

          WHEN LOWER("title") LIKE '%frontend%'
            OR LOWER("title") LIKE '%front-end%'
            OR LOWER("title") LIKE '%front end%'
          THEN 'Frontend Developer'

          WHEN LOWER("title") LIKE '%backend%'
            OR LOWER("title") LIKE '%back-end%'
            OR LOWER("title") LIKE '%back end%'
          THEN 'Backend Developer'

          WHEN LOWER("title") LIKE '%devops%'
            OR LOWER("title") LIKE '%dev ops%'
          THEN 'DevOps Engineer'

          WHEN LOWER("title") LIKE '%machine learning%'
            OR LOWER("title") LIKE '%ml engineer%'
          THEN 'Machine Learning Engineer'

          WHEN LOWER("title") LIKE '%ai engineer%'
            OR LOWER("title") LIKE '%artificial intelligence%'
          THEN 'AI Engineer'

          WHEN LOWER("title") LIKE '%data engineer%'
          THEN 'Data Engineer'

          WHEN LOWER("title") LIKE '%cloud engineer%'
            OR LOWER("title") LIKE '%cloud developer%'
          THEN 'Cloud Engineer'

          WHEN LOWER("title") LIKE '%cybersecurity%'
            OR LOWER("title") LIKE '%cyber security%'
            OR LOWER("title") LIKE '%security engineer%'
          THEN 'Cybersecurity Engineer'

          WHEN LOWER("title") LIKE '%android%'
            OR LOWER("title") LIKE '%ios developer%'
            OR LOWER("title") LIKE '%mobile developer%'
            OR LOWER("title") LIKE '%mobile engineer%'
          THEN 'Mobile Developer'

          WHEN LOWER("title") LIKE '%software engineer%'
            OR LOWER("title") LIKE '%software developer%'
          THEN 'Software Engineer'

          ELSE NULL
        END AS "role"

      FROM "JobPosting"
    ) classified

    WHERE "role" IS NOT NULL

    GROUP BY "role"

    ORDER BY COUNT(*) DESC

    LIMIT ${limit};
  `;
}

  // =========================================================
  // TOTAL JOBS + TOTAL SKILLS
  // =========================================================

  async getCounts() {
    const [totalJobs, totalSkills] = await Promise.all([
      prisma.jobPosting.count(),
      prisma.skill.count(),
    ]);

    return {
      totalJobs,
      totalSkills,
    };
  }


  async getCompanyCount() {
    const result = await prisma.$queryRaw<CompanyCountRow[]>`
      SELECT
        COUNT(DISTINCT "companyName") AS "count"
      FROM "JobPosting"
      WHERE "companyName" IS NOT NULL;
    `;

    return Number(result[0]?.count ?? 0);
  }

  async getAverageSalary() {
    return prisma.jobPosting.aggregate({
      where: {
        salaryMin: {
          not: null,
        },

        salaryMax: {
          not: null,
        },
      },

      _avg: {
        salaryMin: true,
        salaryMax: true,
      },

      _count: {
        _all: true,
      },
    });
  }
}