import { NextResponse } from "next/server";
import { JobService } from "@/services/job.service";
import { validateJobQuery } from "@/validators/job.validator";

const service = new JobService();

export async function GET(request: Request) {
  try {
    const query = validateJobQuery(request);

    const result = await service.getJobs(query);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 400,
      }
    );
  }
}