import type { RoleIntelligence } from "@/features/role-intelligence/types/role-intelligence.types";
import type { SkillIntelligence } from "@/features/skill-intelligence/types/skill-intelligence.types";

export type OverviewAnalyticsDto = {
  overview: {
    totalJobs: number;
    totalSkills: number;
    companies: number;
    averageSalary: number | null;
    jobsWithSalary: number;
  };
  topSkills: Array<{
    id: string;
    name: string;
    category: string | null;
    jobCount: number;
  }>;
  highestPayingSkills: Array<{
    id: string;
    name: string;
    category: string | null;
    averageSalary: number;
    jobsWithSalary: number;
  }>;
  topRoles: Array<{
    role: string;
    jobCount: number;
    averageSalary: number | null;
    jobsWithSalary: number;
  }>;
  topStates: Array<{
    state: string | null;
    jobCount: number;
  }>;
  topCities: Array<{
    city: string | null;
    state: string | null;
    jobCount: number;
  }>;
};

export type SearchEntityDto = {
  name: string;
  slug: string;
  type: "Skill" | "Role";
  href: string;
};

export type SkillIntelligenceDto = SkillIntelligence;
export type RoleIntelligenceDto = RoleIntelligence;
