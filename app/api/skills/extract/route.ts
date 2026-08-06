import { NextResponse } from "next/server";
import { SkillExtractionService } from "@/services/skill-extraction.service";

export async function POST() {
  try {
    const service = new SkillExtractionService();

    const result = await service.extractAll();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Skill extraction failed." },
      { status: 500 }
    );
  }
}