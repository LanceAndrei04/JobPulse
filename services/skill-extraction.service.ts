import { Skill } from "@/lib/generated/prisma";
import { JobRepository } from "@/repositories/job.repository";
import { SkillRepository } from "@/repositories/skill.repository";

export class SkillExtractionService {
  private jobRepository = new JobRepository();
  private skillRepository = new SkillRepository();

  async extractAll(limit?: number) {
    const skills = await this.skillRepository.findAll();
    const jobs = await this.jobRepository.findAll(limit);

    let matched = 0;

    for (const job of jobs) {
      const text = `${job.title} ${job.description}`;

      const extracted = this.extract(text, skills);

      if (extracted.length > 0) {
        await this.jobRepository.attachSkills(job.id, extracted);
      }

      matched += extracted.length;
    }

    return {
      jobsProcessed: jobs.length,
      skillsMatched: matched,
    };
  }

  private extract(text: string, skills: Skill[]): Skill[] {
    const normalizedText = this.normalize(text);

    return skills.filter((skill) => {
      const escaped = this.escapeRegex(skill.normalizedName);

      // Match whole words only
      const regex = new RegExp(`\\b${escaped}\\b`, "i");

      return regex.test(normalizedText);
    });
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/\r\n/g, " ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}