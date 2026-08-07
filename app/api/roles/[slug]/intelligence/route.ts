import { NextResponse } from "next/server";
import { IntelligenceService } from "@/services/intelligence.service";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/roles/[slug]/intelligence">
) {
  try {
    const { slug } = await params;
    const service = new IntelligenceService();
    const data = await service.getRoleIntelligence(slug);

    if (!data) {
      return NextResponse.json(
        { message: "Role intelligence not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Role intelligence error:", error);

    return NextResponse.json(
      { message: "Failed to fetch role intelligence." },
      { status: 500 }
    );
  }
}
