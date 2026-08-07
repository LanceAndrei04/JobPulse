import { prisma } from "@/lib/prisma";

export class AnalyticsRepository {
  async getTopSkills(limit: number) {
    const grouped = await prisma.jobPostingSkill.groupBy({
      by: ["skillId"],
      _count: {
        skillId: true,
      },
      orderBy: {
        _count: {
          skillId: "desc",
        },
      },
      take: limit,
    });

    const skillIds = grouped.map((item) => item.skillId);

    const skills = await prisma.skill.findMany({
      where: {
        id: {
          in: skillIds,
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
      },
    });

    const skillMap = new Map(
      skills.map((skill) => [skill.id, skill])
    );

    return grouped.map((item) => {
      const skill = skillMap.get(item.skillId);

      return {
        id: item.skillId,
        name: skill?.name ?? "Unknown",
        category: skill?.category ?? null,
        jobCount: item._count.skillId,
      };
    });
  }
}