import { NextResponse } from "next/server";
import { requireAdminApiAuth } from "@/lib/api-auth";
import { JobIngestionService } from "@/services/job-ingestion.service";

export async function POST(request: Request) {
  const unauthorized = requireAdminApiAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);

    const pages =
      Number(searchParams.get("pages")) || 3;
    const keywordLimit =
      Number(searchParams.get("keywordLimit")) || undefined;
    const keywordOffset =
      Number(searchParams.get("keywordOffset")) || undefined;

    const service = new JobIngestionService();

    const result = await service.run(pages, {
      keywordLimit,
      keywordOffset,
    });

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
