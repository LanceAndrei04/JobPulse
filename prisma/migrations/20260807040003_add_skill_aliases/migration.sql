-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[];
