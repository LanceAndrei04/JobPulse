import { NextResponse } from "next/server";
import { JobImportService } from "@/services/job-import.service";

export async function GET() {
  const service = new JobImportService();

  const result = await service.import();

  return NextResponse.json(result);
}