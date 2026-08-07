import { Skill } from "@prisma/client";
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
      const titleSkills = this.extract(job.title, skills);
      const descriptionSkills = this.extract(job.description, skills);

      const extracted = [
        ...new Map(
          [...titleSkills, ...descriptionSkills].map((skill) => [
            skill.id,
            skill,
          ])
        ).values(),
      ];

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
async extractJobs(jobIds: string[]) {
  if (jobIds.length === 0) {
    return {
      jobsProcessed: 0,
      skillsMatched: 0,
    };
  }

  const skills =
    await this.skillRepository.findAll();

  const jobs =
    await this.jobRepository.findByIds(jobIds);

  let matched = 0;

  for (const job of jobs) {
    const titleSkills =
      this.extract(job.title, skills);

    const descriptionSkills =
      this.extract(job.description, skills);

    const extracted = [
      ...new Map(
        [
          ...titleSkills,
          ...descriptionSkills,
        ].map((skill) => [
          skill.id,
          skill,
        ])
      ).values(),
    ];

    if (extracted.length > 0) {
      await this.jobRepository.attachSkills(
        job.id,
        extracted
      );
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
    const candidates = [
      skill.normalizedName,
      ...skill.aliases,
    ];

    return candidates.some((candidate) =>
      this.matchesSkill(normalizedText, candidate)
    );
  });
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
