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
}