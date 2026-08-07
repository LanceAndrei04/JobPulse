import { NextResponse } from "next/server";
import { AnalyticsService } from "@/services/analytics.service";

export async function GET() {
  try {
    const service =
      new AnalyticsService();

    const data =
      await service.getDashboard();

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(
      "Dashboard analytics error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch dashboard analytics.",
      },
      {
        status: 500,
      }
    );
  }
}