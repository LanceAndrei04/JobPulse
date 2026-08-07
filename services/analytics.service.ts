import { AnalyticsRepository } from "@/repositories/analytics.repository";

export class AnalyticsService {
  private repository = new AnalyticsRepository();

  async getTopSkills(limit = 10) {
    return this.repository.getTopSkills(limit);
  }

  async getHighestPayingSkills(
    limit = 10,
    minimumJobs = 3
  ) {
    const rows =
      await this.repository.getHighestPayingSkills(
        limit,
        minimumJobs
      );

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,

      averageSalary: row.averageSalary,

      // PostgreSQL COUNT returns bigint
      jobsWithSalary: Number(row.jobsWithSalary),
    }));
  }

  async getJobsByState(limit = 10) {
    const rows =
      await this.repository.getJobsByState(limit);

    return rows.map((row) => ({
      state: row.state,
      jobCount: row._count._all,
    }));
  }

  async getJobsByCity(limit = 10) {
    const rows =
      await this.repository.getJobsByCity(limit);

    return rows.map((row) => ({
      city: row.city,
      state: row.state,
      jobCount: row._count._all,
    }));
  }

  async getDashboardOverview() {
    const [
      counts,
      companyCount,
      salary,
    ] = await Promise.all([
      this.repository.getCounts(),
      this.repository.getCompanyCount(),
      this.repository.getAverageSalary(),
    ]);

    const averageMin =
      salary._avg.salaryMin;

    const averageMax =
      salary._avg.salaryMax;

    const averageSalary =
      averageMin !== null &&
      averageMax !== null
        ? Math.round(
            (averageMin + averageMax) / 2
          )
        : null;

    return {
      totalJobs: counts.totalJobs,
      totalSkills: counts.totalSkills,

      companies: companyCount,

      averageSalary,

      jobsWithSalary:
        salary._count._all,
    };
  }

  async getDashboard() {
    const [
      overview,
      topSkills,
      highestPayingSkills,
      topStates,
      topCities,
    ] = await Promise.all([
      this.getDashboardOverview(),

      this.getTopSkills(10),

      this.getHighestPayingSkills(
        10,
        3
      ),

      this.getJobsByState(10),

      this.getJobsByCity(10),
    ]);

    return {
      overview,
      topSkills,
      highestPayingSkills,
      topStates,
      topCities,
    };
  }
}