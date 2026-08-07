import { techKeywords } from "@/config/tech-words";
import { jobDataConfig } from "@/config/job-data";
import { fetchJobs } from "@/lib/adzuna";
import { mapAdzunaJob } from "@/lib/mappers/adzuna.mapper";
import { JobRepository } from "@/repositories/job.repository";

export class JobImportService {
  private repository = new JobRepository();

  private sameValue(
    a: string | number | boolean | null | undefined,
    b: string | number | boolean | null | undefined
  ) {
    return (a ?? null) === (b ?? null);
  }

  async import(maxPages = 3) {
    let fetched = 0;
    let recent = 0;

    let inserted = 0;
    let updated = 0;
    let unchanged = 0;

    const affectedJobIds = new Set<string>();

    const cutoff = new Date();

    cutoff.setDate(
      cutoff.getDate() -
        jobDataConfig.importLookbackDays
    );

    for (const search of techKeywords) {
      for (
        let page = 1;
        page <= maxPages;
        page++
      ) {
        const response = await fetchJobs(
          search.keyword,
          page
        );

        const mappedJobs =
          response.results.map(mapAdzunaJob);

        fetched += mappedJobs.length;

        for (const job of mappedJobs) {
          // Ignore jobs outside our recent import window
          if (job.postedAt < cutoff) {
            continue;
          }

          recent++;

          try {
            const existing =
              await this.repository.findBySourceAndExternalId(
                job.source,
                job.externalId
              );

            // =====================================================
            // NEW JOB
            // =====================================================

            if (!existing) {
              const saved =
                await this.repository.upsert(job);

              inserted++;

              affectedJobIds.add(
                saved.id
              );

              continue;
            }

            // =====================================================
            // CHECK FOR MEANINGFUL CHANGES
            // =====================================================

            const hasChanged =
              !this.sameValue(
                existing.title,
                job.title
              ) ||
              !this.sameValue(
                existing.companyName,
                job.companyName
              ) ||
              !this.sameValue(
                existing.description,
                job.description
              ) ||
              !this.sameValue(
                existing.category,
                job.category
              ) ||
              !this.sameValue(
                existing.contractTime,
                job.contractTime
              ) ||
              !this.sameValue(
                existing.contractType,
                job.contractType
              ) ||
              !this.sameValue(
                existing.salaryMin,
                job.salaryMin
              ) ||
              !this.sameValue(
                existing.salaryMax,
                job.salaryMax
              ) ||
              !this.sameValue(
                existing.salaryPredicted,
                job.salaryPredicted
              ) ||
              !this.sameValue(
                existing.country,
                job.country
              ) ||
              !this.sameValue(
                existing.state,
                job.state
              ) ||
              !this.sameValue(
                existing.city,
                job.city
              );

            // =====================================================
            // UNCHANGED JOB
            // =====================================================

            if (!hasChanged) {
              unchanged++;
              continue;
            }

            // =====================================================
            // UPDATED JOB
            // =====================================================

            const saved =
              await this.repository.upsert(job);

            updated++;

            affectedJobIds.add(
              saved.id
            );
          } catch (error) {
            console.error(
              `Failed to import job ${job.externalId}:`,
              error
            );
          }
        }
      }
    }

    return {
      keywords: techKeywords.length,

      fetched,
      recent,

      inserted,
      updated,
      unchanged,

      affectedJobIds: [
        ...affectedJobIds,
      ],
    };
  }
}