import { JobRepository } from "@/repositories/job.repository";
import { JobQuery } from "@/types/jobs";

export class JobService {
  private repository = new JobRepository();

  async getJobs(query: JobQuery) {
    const result = await this.repository.getJobs(query);

    return {
      ...result,
      totalPages: Math.ceil(result.total / result.limit),
    };
  }
}
