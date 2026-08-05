import { NextResponse } from "next/server";
import { JobImportService } from "@/services/job-import.service";

export async function GET() {
  try {
    const service = new JobImportService();

    const result = await service.import();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
  console.error("Import Error:", error);

  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  );
}
}