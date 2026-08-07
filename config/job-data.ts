// config/job-data.ts

export const jobDataConfig = {
  importLookbackDays: 30,
  retentionDays: 180,
  dailyIngestPagesPerKeyword: Number(process.env.INGEST_PAGES_PER_KEYWORD) || 3,
  dailyIngestKeywordLimit: Number(process.env.INGEST_DAILY_KEYWORD_LIMIT) || 5,
};
