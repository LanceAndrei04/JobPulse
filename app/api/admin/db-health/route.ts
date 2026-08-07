import { NextResponse } from "next/server";
import { requireAdminApiAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = requireAdminApiAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const [jobs, skills, jobSkillLinks] = await Promise.all([
      prisma.jobPosting.count(),
      prisma.skill.count(),
      prisma.jobPostingSkill.count(),
    ]);

    return NextResponse.json({
      success: true,
      env: {
        databaseUrlPresent: Boolean(process.env.DATABASE_URL),
        adminSecretPresent: Boolean(process.env.ADMIN_API_SECRET),
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV ?? null,
      },
      counts: {
        jobs,
        skills,
        jobSkillLinks,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        env: {
          databaseUrlPresent: Boolean(process.env.DATABASE_URL),
          adminSecretPresent: Boolean(process.env.ADMIN_API_SECRET),
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV ?? null,
        },
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
              }
            : {
                name: "UnknownError",
                message: "Database health check failed.",
              },
      },
      {
        status: 500,
      }
    );
  }
}
