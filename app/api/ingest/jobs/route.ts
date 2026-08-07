import { NextResponse } from "next/server";
import { JobIngestionService } from "@/services/job-ingestion.service";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const pages =
      Number(searchParams.get("pages")) || 3;

    const service = new JobIngestionService();

    const result = await service.run(pages);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Job ingestion failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Job ingestion failed.",
      },
      {
        status: 500,
      }
    );
  }
}