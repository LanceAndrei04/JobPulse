import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { JobQuery } from "@/types/job";

export class JobRepository {
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

    const where: Prisma.JobPostingWhereInput = {};

    if (query.search) {
      where.OR = [
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
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: {
          postedAt: "desc",
        },
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
}