import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";

export class SkillRepository {
  async upsertMany(skills: Prisma.SkillCreateManyInput[]) {
    for (const skill of skills) {
      await prisma.skill.upsert({
        where: {
          normalizedName: skill.normalizedName,
        },
        update: {
          name: skill.name,
          category: skill.category,
        },
        create: skill,
      });
    }
  }

  async findAll() {
    return prisma.skill.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}