import type { SkillIntelligence } from "../types/skill-intelligence.types";

const datasetBaseline = 138000;
const totalJobs = 1284;

export const skillIntelligenceMocks: Record<string, SkillIntelligence> = {
  react: {
    skill: { name: "React", slug: "react", category: "framework" },
    demand: { matchingJobs: 427, datasetShare: 0.33, totalJobs },
    salary: {
      estimatedAverage: 137000,
      observations: 312,
      datasetBaseline,
    },
    roles: [
      role("Frontend Developer", "frontend-developer", 188, 0.44),
      role("Full Stack Developer", "full-stack-developer", 109, 0.26),
      role("Software Engineer", "software-engineer", 83, 0.19),
    ],
    relatedSkills: [
      skill("TypeScript", "typescript", "language", 289, 0.68),
      skill("Next.js", "nextjs", "framework", 92, 0.22),
      skill("AWS", "aws", "cloud", 76, 0.18),
    ],
    locations: [
      location("California", 61, 0.14),
      location("Texas", 47, 0.11),
      location("New York", 36, 0.08),
    ],
    salaryPeers: frameworkPeers("react"),
  },
  typescript: {
    skill: { name: "TypeScript", slug: "typescript", category: "language" },
    demand: { matchingJobs: 311, datasetShare: 0.24, totalJobs },
    salary: {
      estimatedAverage: 140000,
      observations: 228,
      datasetBaseline,
    },
    roles: [
      role("Frontend Developer", "frontend-developer", 128, 0.41),
      role("Full Stack Developer", "full-stack-developer", 81, 0.26),
      role("Software Engineer", "software-engineer", 64, 0.21),
    ],
    relatedSkills: [
      skill("React", "react", "framework", 289, 0.93),
      skill("Next.js", "nextjs", "framework", 76, 0.24),
      skill("Node.js", "nodejs", "platform", 69, 0.22),
    ],
    locations: [
      location("California", 43, 0.14),
      location("Texas", 34, 0.11),
      location("Washington", 25, 0.08),
    ],
    salaryPeers: [
      salaryPeer("Go", "go", "language", 149000, 37),
      salaryPeer("TypeScript", "typescript", "language", 140000, 228),
      salaryPeer("Python", "python", "language", 141000, 196),
      salaryPeer("Java", "java", "language", 139000, 130),
    ],
  },
  aws: {
    skill: { name: "AWS", slug: "aws", category: "cloud" },
    demand: { matchingJobs: 386, datasetShare: 0.3, totalJobs },
    salary: {
      estimatedAverage: 145000,
      observations: 214,
      datasetBaseline,
    },
    roles: [
      role("Backend Developer", "backend-developer", 142, 0.37),
      role("DevOps Engineer", "devops-engineer", 81, 0.21),
      role("Software Engineer", "software-engineer", 73, 0.19),
    ],
    relatedSkills: [
      skill("Docker", "docker", "platform", 139, 0.36),
      skill("Python", "python", "language", 116, 0.3),
      skill("PostgreSQL", "postgresql", "database", 68, 0.18),
    ],
    locations: [
      location("Virginia", 45, 0.12),
      location("California", 42, 0.11),
      location("Texas", 39, 0.1),
    ],
    salaryPeers: [
      salaryPeer("AWS", "aws", "cloud", 145000, 214),
      salaryPeer("Azure", "azure", "cloud", 142000, 64),
      salaryPeer("Google Cloud", "google-cloud", "cloud", 141000, 48),
    ],
  },
  python: {
    skill: { name: "Python", slug: "python", category: "language" },
    demand: { matchingJobs: 342, datasetShare: 0.27, totalJobs },
    salary: {
      estimatedAverage: 141000,
      observations: 196,
      datasetBaseline,
    },
    roles: [
      role("Backend Developer", "backend-developer", 119, 0.35),
      role("Data Engineer", "data-engineer", 73, 0.21),
      role("Software Engineer", "software-engineer", 69, 0.2),
    ],
    relatedSkills: [
      skill("AWS", "aws", "cloud", 116, 0.34),
      skill("PostgreSQL", "postgresql", "database", 71, 0.21),
      skill("Docker", "docker", "platform", 64, 0.19),
    ],
    locations: [
      location("California", 48, 0.14),
      location("Texas", 37, 0.11),
      location("Virginia", 31, 0.09),
    ],
    salaryPeers: [
      salaryPeer("Go", "go", "language", 149000, 37),
      salaryPeer("Python", "python", "language", 141000, 196),
      salaryPeer("TypeScript", "typescript", "language", 140000, 228),
      salaryPeer("Java", "java", "language", 139000, 130),
    ],
  },
};

export function getSkillIntelligenceMock(slug: string) {
  return skillIntelligenceMocks[slug];
}

function frameworkPeers(selectedSlug: string) {
  return [
    salaryPeer("Ruby on Rails", "ruby-on-rails", "framework", 148000, 34),
    salaryPeer("Next.js", "nextjs", "framework", 142000, 86),
    salaryPeer("React", selectedSlug, "framework", 137000, 312),
    salaryPeer("Angular", "angular", "framework", 134000, 75),
    salaryPeer("Vue.js", "vuejs", "framework", 131000, 42),
  ];
}

function role(name: string, slug: string, matchingJobs: number, share: number) {
  return { name, slug, matchingJobs, share };
}

function skill(
  name: string,
  slug: string,
  category: SkillIntelligence["skill"]["category"],
  matchingJobs: number,
  share: number
) {
  return { name, slug, category, matchingJobs, share };
}

function location(name: string, matchingJobs: number, share: number) {
  return { name, matchingJobs, share };
}

function salaryPeer(
  name: string,
  slug: string,
  category: SkillIntelligence["skill"]["category"],
  estimatedAverage: number,
  observations: number
) {
  return { name, slug, category, estimatedAverage, observations };
}
