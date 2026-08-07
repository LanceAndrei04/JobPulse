import { AnalyticsRepository } from "@/repositories/analytics.repository";

export class AnalyticsService {
  private repository = new AnalyticsRepository();

  // =========================================================
  // TOP SKILLS
  // =========================================================

  async getTopSkills(limit = 10) {
    return this.repository.getTopSkills(limit);
  }

  // =========================================================
  // HIGHEST PAYING SKILLS
  // =========================================================

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
      jobsWithSalary: Number(row.jobsWithSalary),
    }));
  }

  // =========================================================
  // JOBS BY STATE
  // =========================================================

  async getJobsByState(limit = 10) {
    const rows =
      await this.repository.getJobsByState(limit);

    return rows.map((row) => ({
      state: row.state,
      jobCount: row._count._all,
    }));
  }

  // =========================================================
  // JOBS BY CITY
  // =========================================================

  async getJobsByCity(limit = 10) {
    const rows =
      await this.repository.getJobsByCity(limit);

    return rows.map((row) => ({
      city: row.city,
      state: row.state,
      jobCount: row._count._all,
    }));
  }

  // =========================================================
  // TOP ROLES
  // =========================================================

    async getTopRoles(limit = 10) {
    const rows =
        await this.repository.getTopRoles(limit);

    return rows.map((row) => ({
        role: row.role,
        jobCount: Number(row.jobCount),
        averageSalary: row.averageSalary,
        jobsWithSalary: Number(row.jobsWithSalary),
    }));
    }

  // =========================================================
  // DASHBOARD OVERVIEW
  // =========================================================

  async getDashboardOverview() {
    const [
      counts,
      companyCount,
      salaryStats,
    ] = await Promise.all([
      this.repository.getCounts(),
      this.repository.getCompanyCount(),
      this.repository.getAverageSalary(),
    ]);

    const averageMin =
      salaryStats._avg.salaryMin;

    const averageMax =
      salaryStats._avg.salaryMax;

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
        salaryStats._count._all,
    };
  }

  // =========================================================
  // FULL DASHBOARD
  // =========================================================

  async getDashboard() {
    const [
      overview,
      topSkills,
      highestPayingSkills,
      topRoles,
      topStates,
      topCities,
    ] = await Promise.all([
      this.getDashboardOverview(),

      this.getTopSkills(10),

      this.getHighestPayingSkills(
        10,
        3
      ),

      this.getTopRoles(10),

      this.getJobsByState(10),

      this.getJobsByCity(10),
    ]);

    return {
      overview,
      topSkills,
      highestPayingSkills,
      topRoles,
      topStates,
      topCities,
    };
  }
}