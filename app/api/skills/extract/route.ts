import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiAuth } from "@/lib/api-auth";
import { SkillExtractionService } from "@/services/skill-extraction.service";

export async function POST(request: NextRequest) {
  const unauthorized = requireAdminApiAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;

    const service = new SkillExtractionService();

    const result = await service.extractAll(limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Skill extraction failed." },
      { status: 500 }
    );
  }
}
