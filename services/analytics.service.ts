import { AnalyticsRepository } from "@/repositories/analytics.repository";

export class AnalyticsService {
  private repository = new AnalyticsRepository();

  async getTopSkills(limit = 10) {
    return this.repository.getTopSkills(limit);
  }
}