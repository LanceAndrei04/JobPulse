import { JobQuery } from "@/types/job";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function validateJobQuery(request: Request): JobQuery {
  const { searchParams } = new URL(request.url);

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const page = pageParam ? Number(pageParam) : DEFAULT_PAGE;
  const limit = limitParam ? Number(limitParam) : DEFAULT_LIMIT;

  if (!Number.isInteger(page) || page < 1) {
    throw new Error("Page must be a positive integer.");
  }

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > MAX_LIMIT
  ) {
    throw new Error(`Limit must be between 1 and ${MAX_LIMIT}.`);
  }

  return {
    page,
    limit,
  };
}