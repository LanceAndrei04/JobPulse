import { NextResponse } from "next/server";
import { requireAdminApiAuth } from "@/lib/api-auth";
import { JobImportService } from "@/services/job-import.service";

async function runImport(request: Request) {
  const unauthorized = requireAdminApiAuth(request);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const pages = Number(searchParams.get("pages")) || 3;

  const service = new JobImportService();
  const result = await service.import(pages);

  return NextResponse.json(result);
}

export async function GET(request: Request) {
  return runImport(request);
}

export async function POST(request: Request) {
  return runImport(request);
}
