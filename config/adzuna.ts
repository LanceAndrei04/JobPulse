export const adzunaConfig = {
  baseUrl: "https://api.adzuna.com/v1/api/jobs",

  country: "us",

  resultsPerPage: 20,

  appId: process.env.ADZUNA_APP_ID!,

  appKey: process.env.ADZUNA_APP_KEY!,
};