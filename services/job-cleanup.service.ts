// services/job-cleanup.service.ts

import { jobDataConfig } from "@/config/job-data";
import { JobRepository } from "@/repositories/job.repository";

export class JobCleanupService {
  private repository = new JobRepository();

  async cleanup() {
    const cutoff = new Date();

    cutoff.setDate(
      cutoff.getDate() -
        jobDataConfig.retentionDays
    );

    const result =
      await this.repository.deleteOlderThan(
        cutoff
      );

    return {
      retentionDays:
        jobDataConfig.retentionDays,

      deletedJobs: result.count,

      cutoff,
    };
  }
}