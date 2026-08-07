import { prisma } from "@/lib/prisma";
import { Prisma, Skill } from "@prisma/client";
import { JobQuery } from "@/types/jobs";

export class JobRepository {
  async findBySourceAndExternalId(
    source: string,
    externalId: string
  ) {
    return prisma.jobPosting.findUnique({
      where: {
        source_externalId: {
          source,
          externalId,
        },
      },
    });
  }

  async upsert(job: Prisma.JobPostingCreateInput) {
    return prisma.jobPosting.upsert({
      where: {
        source_externalId: {
          source: job.source,
          externalId: job.externalId,
        },
      },
      update: job,
      create: job,
    });
  }

  async getJobs(query: JobQuery) {
    const skip = (query.page - 1) * query.limit;

    const andConditions: Prisma.JobPostingWhereInput[] = [];

    // Search
    if (query.search) {
      andConditions.push({
        OR: [
          {
            title: {
              contains: query.search,
              mode: "insensitive",
            },
          },
          {
            companyName: {
              contains: query.search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    // Location
    if (query.location) {
      andConditions.push({
        OR: [
          {
            state: {
              contains: query.location,
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: query.location,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    // Contract Time
    if (query.contractTime) {
      andConditions.push({
        contractTime: query.contractTime,
      });
    }

    // Build WHERE clause
    const where: Prisma.JobPostingWhereInput =
      andConditions.length > 0
        ? { AND: andConditions }
        : {};

    // Build ORDER BY clause
    const orderBy: Prisma.JobPostingOrderByWithRelationInput = {
      postedAt: query.sort === "oldest" ? "asc" : "desc",
    };

    const [jobs, total] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
      }),

      prisma.jobPosting.count({
        where,
      }),
    ]);

    return {
      jobs,
      total,
      page: query.page,
      limit: query.limit,
    };
  }

  async findAll(limit?: number) {
    return prisma.jobPosting.findMany({
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  async attachSkills(jobId: string, skills: Skill[]) {
    if (skills.length === 0) return;

    await prisma.jobPostingSkill.createMany({
      data: skills.map((skill) => ({
        jobPostingId: jobId,
        skillId: skill.id,
      })),
      skipDuplicates: true,
    });
  }

  async findByIds(ids: string[]) {
    if (ids.length === 0) {
      return [];
    }

    return prisma.jobPosting.findMany({
      where: {
        id: {
          in: ids,
        },
      },

      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  }

  async deleteOlderThan(cutoff: Date) {
    return prisma.jobPosting.deleteMany({
      where: {
        postedAt: {
          lt: cutoff,
        },
      },
    });
  }
}
