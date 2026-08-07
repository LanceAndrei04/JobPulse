import { NextResponse } from "next/server";
import { IntelligenceService } from "@/services/intelligence.service";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/skills/[slug]/intelligence">
) {
  try {
    const { slug } = await params;
    const service = new IntelligenceService();
    const data = await service.getSkillIntelligence(slug);

    if (!data) {
      return NextResponse.json(
        { message: "Skill intelligence not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Skill intelligence error:", error);

    return NextResponse.json(
      { message: "Failed to fetch skill intelligence." },
      { status: 500 }
    );
  }
}
