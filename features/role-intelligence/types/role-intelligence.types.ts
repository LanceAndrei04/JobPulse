import type { SampleConfidence, SkillCategory } from "@/features/skill-intelligence/types/skill-intelligence.types";

export type RoleIntelligence = {
  role: {
    id?: string;
    name: string;
    slug: string;
  };
  opportunity: {
    matchingJobs: number;
    datasetShare: number;
    totalJobs?: number;
    rank?: number;
  };
  salary: {
    estimatedAverage: number | null;
    observations: number;
    datasetBaseline?: number | null;
    confidence?: SampleConfidence;
  };
  skills: RoleSkillDistribution[];
  skillCategories?: RoleSkillCategoryDistribution[];
  salaryPeers?: RoleSalaryPeer[];
  opportunityPeers?: OpportunityCompensationPoint[];
  locations: RoleLocationDistribution[];
  adjacentRoles?: RelatedRole[];
};

export type RoleSkillDistribution = {
  name: string;
  slug: string;
  category: SkillCategory;
  matchingJobs: number;
  share: number;
};

export type RoleSkillCategoryDistribution = {
  category: SkillCategory;
  uniqueSkills?: number;
  totalDetections?: number;
  share?: number;
  topSkills: Array<{
    name: string;
    slug: string;
    matchingJobs: number;
    share: number;
  }>;
};

export type RoleSalaryPeer = {
  name: string;
  slug: string;
  matchingJobs: number;
  estimatedAverage: number | null;
  salaryObservations: number;
};

export type OpportunityCompensationPoint = {
  name: string;
  slug: string;
  jobCount: number;
  estimatedSalary: number;
  salaryObservations: number;
};

export type RoleLocationDistribution = {
  name: string;
  matchingJobs: number;
  share: number;
};

export type RelatedRole = {
  name: string;
  slug: string;
  reason?: string;
  metric?: number;
};

export type RoleInsight =
  | {
      type: "dominant_skill";
      skillName: string;
      share: number;
      observations: number;
    }
  | {
      type: "skill_category_pattern";
      category: SkillCategory;
      qualifyingSkills: string[];
    }
  | {
      type: "opportunity_salary_position";
      opportunityPosition: "low" | "mid" | "high";
      salaryPosition: "low" | "mid" | "high";
    }
  | {
      type: "salary_near_baseline";
      estimatedAverage: number;
      baseline: number;
    }
  | {
      type: "salary_above_baseline";
      estimatedAverage: number;
      baseline: number;
    }
  | {
      type: "salary_below_baseline";
      estimatedAverage: number;
      baseline: number;
    }
  | {
      type: "geographic_concentration";
      locationNames: string[];
      combinedShare: number;
    };

export type RoleExploreEntity = {
  type: "skill" | "role";
  name: string;
  slug: string;
  description: string;
  metric?: string;
};
