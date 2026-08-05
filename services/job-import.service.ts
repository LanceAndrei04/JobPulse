import { techKeywords } from "@/config/tech-words";
import { fetchJobs } from "@/lib/adzuna";
import { mapAdzunaJob } from "@/lib/mappers/adzuna.mapper";
import { JobRepository } from "@/repositories/job.repository";

export class JobImportService {
  private repository = new JobRepository();

async import(maxPages = 3) {
  let fetched = 0;
  let processed = 0;

  for (const search of techKeywords) {
    for (let page = 1; page <= maxPages; page++) {
      const response = await fetchJobs(search.keyword, page);

      const mappedJobs = response.results.map(mapAdzunaJob);

      fetched += mappedJobs.length;

      for (const job of mappedJobs) {
        await this.repository.upsert(job);
        processed++;
      }
    }
  }

  return {
    keywords: techKeywords.length,
    fetched,
    processed,
  };
}
}