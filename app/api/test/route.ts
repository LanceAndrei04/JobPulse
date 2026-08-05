import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const job = await prisma.jobPosting.create({
    data: {
      externalId: "TEST-001",
      source: "Adzuna",
      title: "Frontend Developer",
      companyName: "OpenAI",
      description: "Looking for React developers.",
      postedAt: new Date(),
      fetchedAt: new Date(),
    },
  });

  return NextResponse.json(job);
}