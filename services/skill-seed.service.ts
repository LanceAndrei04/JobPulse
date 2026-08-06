import { skills } from "@/config/skills";
import { SkillRepository } from "@/repositories/skill.repository";

export class SkillSeedService {
  private repository = new SkillRepository();

  async seed() {
    await this.repository.upsertMany(skills);

    return {
      seeded: skills.length,
    };
  }
}