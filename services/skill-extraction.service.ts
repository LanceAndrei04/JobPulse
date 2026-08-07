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

   for (const [index, job] of jobs.entries()) {
    const titleSkills = this.extract(job.title, skills);
    const descriptionSkills = this.extract(job.description, skills);

    // Merge without duplicates
    const extracted = [
      ...new Map(
        [...titleSkills, ...descriptionSkills].map(skill => [skill.id, skill])
      ).values(),
    ];

    console.log("----- Title Matches -----");
    console.log(
      titleSkills.length
        ? titleSkills.map(s => s.name).join(", ")
        : "None"
    );

    console.log("\n----- Description Matches -----");
    console.log(
      descriptionSkills.length
        ? descriptionSkills.map(s => s.name).join(", ")
        : "None"
    );

    console.log("\n----- Final Skills -----");
    console.log(
      extracted.length
        ? extracted.map(s => s.name).join(", ")
        : "None"
    );

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

  return skills.filter((skill) =>
    this.matchesSkill(normalizedText, skill.normalizedName)
  );
}

private matchesSkill(text: string, skill: string): boolean {
  // Special cases first

  if (skill === "c") {
    return /\bc\b(?![+#])/i.test(text);
  }

  if (skill === "c++") {
    return /\bc\+\+/i.test(text);
  }

  if (skill === "c#") {
    return /\bc#/i.test(text);
  }

  // Default matcher
  const escaped = this.escapeRegex(skill);
  const regex = new RegExp(`\\b${escaped}\\b`, "i");

  return regex.test(text);
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