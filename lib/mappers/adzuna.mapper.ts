export function mapAdzunaJob(job: any) {
  return {
    externalId: job.id,
    source: "Adzuna",

    title: job.title,
    companyName: job.company?.display_name ?? "Unknown",

    description: job.description,

    category: job.category?.label ?? null,

    contractTime: job.contract_time ?? null,
    contractType: job.contract_type ?? null,

    salaryMin: job.salary_min ?? null,
    salaryMax: job.salary_max ?? null,

    salaryPredicted:
      job.salary_is_predicted === "1",

    country: job.location?.area?.[0] ?? null,
    state: job.location?.area?.[1] ?? null,
    city: job.location?.area?.[3] ?? null,

    latitude: job.latitude ?? null,
    longitude: job.longitude ?? null,

    redirectUrl: job.redirect_url ?? null,

    postedAt: new Date(job.created),

    fetchedAt: new Date(),
  };
}