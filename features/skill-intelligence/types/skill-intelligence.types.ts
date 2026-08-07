export type SampleConfidence =
  | "insufficient"
  | "limited"
  | "directional"
  | "supported";

export type SkillCategory =
  | "framework"
  | "language"
  | "cloud"
  | "database"
  | "platform";

export type SkillIntelligence = {
  skill: {
    id?: string;
    name: string;
    slug: string;
    category: SkillCategory;
  };
  demand: {
    matchingJobs: number;
    datasetShare: number;
    totalJobs?: number;
  };
  salary: {
    estimatedAverage: number | null;
    observations: number;
    datasetBaseline?: number | null;
    confidence?: SampleConfidence;
  };
  roles: SkillRoleDistribution[];
  relatedSkills: RelatedSkill[];
  locations: SkillLocationDistribution[];
  salaryPeers?: SalaryPeer[];
};

export type SkillRoleDistribution = {
  name: string;
  slug: string;
  matchingJobs: number;
  share: number;
};

export type RelatedSkill = {
  name: string;
  slug: string;
  category: SkillCategory;
  matchingJobs: number;
  share: number;
};

export type SkillLocationDistribution = {
  name: string;
  matchingJobs: number;
  share: number;
};

export type SalaryPeer = {
  name: string;
  slug: string;
  category: SkillCategory;
  estimatedAverage: number;
  observations: number;
};

export type SkillInsight =
  | {
      type: "strong_skill_association";
      relatedSkillName: string;
      share: number;
      observations: number;
    }
  | {
      type: "role_concentration";
      roleNames: string[];
      combinedShare: number;
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
    };

export type ExploreEntity = {
  type: "skill" | "role";
  name: string;
  slug: string;
  description: string;
  metric?: string;
};
