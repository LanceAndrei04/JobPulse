import { NextResponse } from "next/server";
import { SkillSeedService } from "@/services/skill-seed.service";

export async function POST() {
  try {
    const service = new SkillSeedService();

    const result = await service.seed();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to seed skills." },
      { status: 500 }
    );
  }
}