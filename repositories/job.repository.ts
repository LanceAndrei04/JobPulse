import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

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

  async getJobs({
    page = 1,
    limit = 20,
  }: {
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      prisma.jobPosting.findMany({
        skip,
        take: limit,
        orderBy: {
          postedAt: "desc",
        },
      }),
      prisma.jobPosting.count(),
    ]);

    return {
      jobs,
      total,
      page,
      limit,
    };
  }
}