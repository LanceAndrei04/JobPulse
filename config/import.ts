export const importConfig = {
  defaultPage: 1,

  resultsPerPage: 20,

  maxPagesPerRun: 5,

  schedule: {
    enabled: true,

    // later you can connect this to cron
    frequency: "daily",
  },

  retentionDays: 90,
};