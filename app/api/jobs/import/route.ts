import { NextResponse } from "next/server";

import { fetchJobs } from "@/lib/adzuna";
import { mapAdzunaJob } from "@/lib/mappers/adzuna.mapper";

export async function GET() {
  try {
    const data = await fetchJobs();

    const mapped = data.results.map(mapAdzunaJob);

    return NextResponse.json({
      success: true,
      total: data.count,
      received: mapped.length,
      firstJob: mapped[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch jobs.",
      },
      {
        status: 500,
      }
    );
  }
}