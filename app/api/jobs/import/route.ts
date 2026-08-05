import { NextResponse } from "next/server";
import { fetchJobs } from "@/lib/adzuna";

export async function GET() {
  try {
    const data = await fetchJobs();

    return NextResponse.json({
      success: true,
      total: data.count,
      received: data.results.length,
      firstJob: data.results[0],
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