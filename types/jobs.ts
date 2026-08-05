export interface JobQuery {
  page: number;
  limit: number;
}

export interface JobListResponse<T> {
  jobs: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}