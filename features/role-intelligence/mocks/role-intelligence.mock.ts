import type { RoleIntelligence } from "../types/role-intelligence.types";

const totalJobs = 1284;
const datasetBaseline = 138000;

const opportunityPeers = [
  peer("Software Engineer", "software-engineer", 232, 139000, 147),
  peer("Backend Developer", "backend-developer", 192, 143000, 118),
  peer("Frontend Developer", "frontend-developer", 154, 134000, 94),
  peer("Full Stack Developer", "full-stack-developer", 128, 137000, 81),
  peer("DevOps Engineer", "devops-engineer", 97, 151000, 62),
  peer("Data Engineer", "data-engineer", 88, 146000, 58),
  peer("Cloud Engineer", "cloud-engineer", 76, 147000, 44),
];

export const roleIntelligenceMocks: Record<string, RoleIntelligence> = {
  "backend-developer": {
    role: { name: "Backend Developer", slug: "backend-developer" },
    opportunity: { matchingJobs: 192, datasetShare: 0.15, totalJobs, rank: 2 },
    salary: { estimatedAverage: 143000, observations: 118, datasetBaseline },
    skills: [
      skill("AWS", "aws", "cloud", 142, 0.74),
      skill("Python", "python", "language", 119, 0.62),
      skill("PostgreSQL", "postgresql", "database", 68, 0.35),
      skill("Docker", "docker", "platform", 73, 0.38),
      skill("Java", "java", "language", 63, 0.33),
      skill("React", "react", "framework", 41, 0.21),
    ],
    skillCategories: [
      category("language", 2, 182, 0.34, ["Python", "Java"]),
      category("cloud", 1, 142, 0.26, ["AWS"]),
      category("platform", 1, 73, 0.14, ["Docker"]),
      category("database", 1, 68, 0.13, ["PostgreSQL"]),
      category("framework", 1, 41, 0.08, ["React"]),
    ],
    salaryPeers: opportunityPeers,
    opportunityPeers,
    locations: [
      location("California", 27, 0.14),
      location("Texas", 22, 0.11),
      location("Virginia", 19, 0.1),
      location("New York", 16, 0.08),
    ],
    adjacentRoles: [
      relatedRole("Software Engineer", "software-engineer", "Broad adjacent role", 232),
      relatedRole("Full Stack Developer", "full-stack-developer", "React and API overlap", 128),
    ],
  },
  "frontend-developer": {
    role: { name: "Frontend Developer", slug: "frontend-developer" },
    opportunity: { matchingJobs: 154, datasetShare: 0.12, totalJobs, rank: 3 },
    salary: { estimatedAverage: 134000, observations: 94, datasetBaseline },
    skills: [
      skill("React", "react", "framework", 188, 0.88),
      skill("TypeScript", "typescript", "language", 128, 0.83),
      skill("AWS", "aws", "cloud", 34, 0.22),
    ],
    salaryPeers: opportunityPeers,
    opportunityPeers,
    locations: [location("California", 23, 0.15), location("Texas", 18, 0.12)],
    adjacentRoles: [relatedRole("Full Stack Developer", "full-stack-developer", "Adjacent app role", 128)],
  },
  "software-engineer": {
    role: { name: "Software Engineer", slug: "software-engineer" },
    opportunity: { matchingJobs: 232, datasetShare: 0.18, totalJobs, rank: 1 },
    salary: { estimatedAverage: 139000, observations: 147, datasetBaseline },
    skills: [
      skill("React", "react", "framework", 83, 0.36),
      skill("AWS", "aws", "cloud", 73, 0.31),
      skill("Python", "python", "language", 69, 0.3),
    ],
    salaryPeers: opportunityPeers,
    opportunityPeers,
    locations: [location("California", 34, 0.15), location("Texas", 25, 0.11)],
    adjacentRoles: [relatedRole("Backend Developer", "backend-developer", "Backend specialization", 192)],
  },
  "full-stack-developer": {
    role: { name: "Full Stack Developer", slug: "full-stack-developer" },
    opportunity: { matchingJobs: 128, datasetShare: 0.1, totalJobs, rank: 4 },
    salary: { estimatedAverage: 137000, observations: 81, datasetBaseline },
    skills: [
      skill("React", "react", "framework", 109, 0.85),
      skill("TypeScript", "typescript", "language", 81, 0.63),
      skill("AWS", "aws", "cloud", 49, 0.38),
    ],
    salaryPeers: opportunityPeers,
    opportunityPeers,
    locations: [location("California", 19, 0.15), location("Texas", 15, 0.12)],
    adjacentRoles: [relatedRole("Backend Developer", "backend-developer", "Backend-adjacent path", 192)],
  },
};

export function getRoleIntelligenceMock(slug: string) {
  return roleIntelligenceMocks[slug];
}

function skill(
  name: string,
  slug: string,
  category: RoleIntelligence["skills"][number]["category"],
  matchingJobs: number,
  share: number
) {
  return { name, slug, category, matchingJobs, share };
}

function category(
  categoryName: RoleIntelligence["skills"][number]["category"],
  uniqueSkills: number,
  totalDetections: number,
  share: number,
  names: string[]
) {
  return {
    category: categoryName,
    uniqueSkills,
    totalDetections,
    share,
    topSkills: names.map((name) => {
      const slug = name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
      return { name, slug, matchingJobs: 0, share: 0 };
    }),
  };
}

function peer(
  name: string,
  slug: string,
  matchingJobs: number,
  estimatedAverage: number,
  salaryObservations: number
) {
  return {
    name,
    slug,
    matchingJobs,
    estimatedAverage,
    salaryObservations,
    jobCount: matchingJobs,
    estimatedSalary: estimatedAverage,
  };
}

function location(name: string, matchingJobs: number, share: number) {
  return { name, matchingJobs, share };
}

function relatedRole(name: string, slug: string, reason: string, metric: number) {
  return { name, slug, reason, metric };
}
