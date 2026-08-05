import { adzunaConfig } from "@/config/adzuna";

export async function fetchJobs(
  keyword: string,
  page = 1
) {
  const url =
    `${adzunaConfig.baseUrl}/${adzunaConfig.country}/search/${page}` +
    `?app_id=${adzunaConfig.appId}` +
    `&app_key=${adzunaConfig.appKey}` +
    `&results_per_page=${adzunaConfig.resultsPerPage}` +
    `&what=${encodeURIComponent(keyword)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Adzuna request failed: ${response.status}`);
  }

  return response.json();
}