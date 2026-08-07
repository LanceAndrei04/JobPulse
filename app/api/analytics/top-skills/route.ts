import { NextResponse } from "next/server";
import { AnalyticsService } from "@/services/analytics.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limitParam = searchParams.get("limit");

    const limit = limitParam
      ? Number(limitParam)
      : 10;

    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return NextResponse.json(
        {
          message: "Limit must be between 1 and 100.",
        },
        {
          status: 400,
        }
      );
    }

    const service = new AnalyticsService();

    const skills = await service.getTopSkills(limit);

    return NextResponse.json({
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch top skills:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch top skills.",
      },
      {
        status: 500,
      }
    );
  }
}