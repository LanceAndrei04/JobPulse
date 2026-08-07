import { JobImportService } from "@/services/job-import.service";
import { SkillExtractionService } from "@/services/skill-extraction.service";
import { JobCleanupService } from "@/services/job-cleanup.service";

export class JobIngestionService {
  private importService =
    new JobImportService();

  private skillExtractionService =
    new SkillExtractionService();

  private cleanupService =
    new JobCleanupService();

  async run(pages = 3) {
    const cleanupResult =
      await this.cleanupService.cleanup();

    const importResult =
      await this.importService.import(pages);

    const extractionResult =
      await this.skillExtractionService.extractJobs(
        importResult.affectedJobIds
      );

    return {
      cleanup: cleanupResult,

      import: {
        keywords:
          importResult.keywords,

        fetched:
          importResult.fetched,

        recent:
          importResult.recent,

        inserted:
          importResult.inserted,

        updated:
          importResult.updated,

        unchanged:
          importResult.unchanged,

        affectedJobs:
          importResult.affectedJobIds.length,
      },

      extraction:
        extractionResult,
    };
  }
}