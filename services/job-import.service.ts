import { fetchJobs } from "@/lib/adzuna";
import { mapAdzunaJob } from "@/lib/mappers/adzuna.mapper";
import { JobRepository } from "@/repositories/job.repository";

export class JobImportService {
  private repository = new JobRepository();

  async import(page = 1) {
    const response = await fetchJobs(page);

    const mappedJobs = response.results.map(mapAdzunaJob);

    let inserted = 0;

    for (const job of mappedJobs) {
      await this.repository.upsert(job);
      inserted++;
    }

    return {
      fetched: mappedJobs.length,
      inserted,
    };
  }
}