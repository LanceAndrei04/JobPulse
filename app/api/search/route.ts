import { NextResponse } from "next/server";
import { IntelligenceService } from "@/services/intelligence.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";
    const limit = Number(searchParams.get("limit")) || 8;

    if (!Number.isInteger(limit) || limit < 1 || limit > 25) {
      return NextResponse.json(
        { message: "Limit must be between 1 and 25." },
        { status: 400 }
      );
    }

    const service = new IntelligenceService();
    const data = await service.search(query, limit);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Search error:", error);

    return NextResponse.json(
      { message: "Failed to fetch search results." },
      { status: 500 }
    );
  }
}
