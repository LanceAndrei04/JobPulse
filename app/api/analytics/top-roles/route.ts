import { NextResponse } from "next/server";
import { AnalyticsService } from "@/services/analytics.service";

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const limit =
      Number(searchParams.get("limit")) || 10;

    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return NextResponse.json(
        {
          message:
            "Limit must be between 1 and 100.",
        },
        {
          status: 400,
        }
      );
    }

    const service =
      new AnalyticsService();

    const data =
      await service.getTopRoles(limit);

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(
      "Top roles error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch top roles.",
      },
      {
        status: 500,
      }
    );
  }
}