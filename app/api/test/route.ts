import { NextResponse } from "next/server";
import { JobRepository } from "@/repositories/job.repository";

export async function GET() {
  const repository = new JobRepository();

  const jobs = await repository.getJobs({
    page: 1,
    limit: 20,
  });

  return NextResponse.json(jobs);
}