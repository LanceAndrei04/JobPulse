export interface JobQuery {
  page: number;
  limit: number;
  search?: string;
  location?: string;
  sort?: "latest" | "oldest";
}

export interface JobListResponse<T> {
  jobs: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}