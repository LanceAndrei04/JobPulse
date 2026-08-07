import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
          aliases: skill.aliases,
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
