import { NextResponse } from "next/server";
import { jobDataConfig } from "@/config/job-data";
import { JobIngestionService } from "@/services/job-ingestion.service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const pages = jobDataConfig.dailyIngestPagesPerKeyword;
    const keywordLimit = jobDataConfig.dailyIngestKeywordLimit;
    const keywordOffset =
      getDaysSinceEpoch() * keywordLimit;

    const service = new JobIngestionService();
    const result = await service.run(pages, {
      keywordLimit,
      keywordOffset,
    });

    return NextResponse.json({
      success: true,
      schedule: "daily",
      pagesPerKeyword: pages,
      keywordLimit,
      ...result,
    });
  } catch (error) {
    console.error("Scheduled job ingestion failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Scheduled job ingestion failed.",
      },
      {
        status: 500,
      }
    );
  }
}

function getDaysSinceEpoch() {
  return Math.floor(Date.now() / 86_400_000);
}
