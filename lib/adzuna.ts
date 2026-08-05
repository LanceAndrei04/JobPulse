const BASE_URL = "https://api.adzuna.com/v1/api/jobs";

const APP_ID = process.env.ADZUNA_APP_ID!;
const APP_KEY = process.env.ADZUNA_APP_KEY!;

export async function fetchJobs(page = 1) {
  const url =
    `${BASE_URL}/us/search/${page}` +
    `?app_id=${APP_ID}` +
    `&app_key=${APP_KEY}` +
    `&results_per_page=20`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Adzuna request failed: ${response.status}`);
  }

  return response.json();
}