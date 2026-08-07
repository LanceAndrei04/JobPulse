export type EntityKind = "skill" | "role";

export type SearchEntity = {
  name: string;
  slug: string;
  type: "Skill" | "Role";
  supportingText: string;
  href: string;
};

export type ConfidenceLevel =
  | "Insufficient"
  | "Limited sample"
  | "Directional"
  | "Supported";

export type RelatedMetric = {
  label: string;
  href?: string;
  count: number;
  share: number;
  note: string;
};

export type LocationMetric = {
  label: string;
  count: number;
  share: number;
};

export type SalarySignal = {
  averageSalary: number | null;
  observations: number;
  baselineSalary: number;
};

type BaseAnalysis = {
  slug: string;
  name: string;
  type: "Skill" | "Role";
  eyebrow: string;
  summary: string;
  matchingPostings: number;
  totalPostings: number;
  salary: SalarySignal;
  primaryMetrics: RelatedMetric[];
  secondaryMetrics: RelatedMetric[];
  locations: LocationMetric[];
  explore: SearchEntity[];
};

export type SkillAnalysis = BaseAnalysis & {
  type: "Skill";
  primaryTitle: string;
  secondaryTitle: string;
};

export type RoleAnalysis = BaseAnalysis & {
  type: "Role";
  primaryTitle: string;
  secondaryTitle: string;
};

// Mock/dev data for the current frontend milestone. Replace this module with
// service-backed DTOs once entity analytics endpoints are ready.
const totalPostings = 1284;
const baselineSalary = 138000;

export const searchEntities: SearchEntity[] = [
  skillSearch("React", "react", "427 detected postings"),
  skillSearch("AWS", "aws", "386 detected postings"),
  skillSearch("Python", "python", "342 detected postings"),
  skillSearch("TypeScript", "typescript", "311 detected postings"),
  roleSearch("Software Engineer", "software-engineer", "232 classified postings"),
  roleSearch("Backend Developer", "backend-developer", "Python, Java, AWS pattern"),
  roleSearch("Frontend Developer", "frontend-developer", "Strong React association"),
  roleSearch("Full Stack Developer", "full-stack-developer", "React and Node.js overlap"),
];

const skillAnalyses: Record<string, SkillAnalysis> = {
    react: skillAnalysis({
      slug: "react",
      name: "React",
      summary:
        "React is the strongest frontend signal in this dataset and frequently appears with TypeScript, Next.js, and frontend-heavy role titles.",
      matchingPostings: 427,
      salary: { averageSalary: 137000, observations: 312, baselineSalary },
      primaryMetrics: [
        metric("Frontend Developer", "/role/frontend-developer", 188, 44, "Most common role pairing"),
        metric("Full Stack Developer", "/role/full-stack-developer", 109, 26, "Often paired with backend APIs"),
        metric("Software Engineer", "/role/software-engineer", 83, 19, "Broad title usage"),
      ],
      secondaryMetrics: [
        metric("TypeScript", "/skill/typescript", 289, 68, "Frequent co-detected language"),
        metric("Next.js", undefined, 92, 22, "Common framework pairing"),
        metric("AWS", "/skill/aws", 76, 18, "Cloud deployment overlap"),
      ],
      locations: [
        location("California", 61, 14),
        location("Texas", 47, 11),
        location("New York", 36, 8),
      ],
      explore: [
        skillSearch("TypeScript", "typescript", "68% co-detected with React"),
        roleSearch("Frontend Developer", "frontend-developer", "188 matching postings"),
        skillSearch("AWS", "aws", "Deployment and platform overlap"),
      ],
    }),
    typescript: skillAnalysis({
      slug: "typescript",
      name: "TypeScript",
      summary:
        "TypeScript behaves like a quality-of-code signal across frontend and full-stack postings, especially where React is present.",
      matchingPostings: 311,
      salary: { averageSalary: 140000, observations: 228, baselineSalary },
      primaryMetrics: [
        metric("Frontend Developer", "/role/frontend-developer", 128, 41, "Frontend-heavy use"),
        metric("Full Stack Developer", "/role/full-stack-developer", 81, 26, "Shared app/API work"),
        metric("Software Engineer", "/role/software-engineer", 64, 21, "General engineering titles"),
      ],
      secondaryMetrics: [
        metric("React", "/skill/react", 289, 93, "Dominant co-detected skill"),
        metric("Next.js", undefined, 76, 24, "Framework overlap"),
        metric("Node.js", undefined, 69, 22, "Backend JavaScript pairing"),
      ],
      locations: [
        location("California", 43, 14),
        location("Texas", 34, 11),
        location("Washington", 25, 8),
      ],
      explore: [
        skillSearch("React", "react", "289 co-detected postings"),
        roleSearch("Frontend Developer", "frontend-developer", "Primary role context"),
        skillSearch("AWS", "aws", "Cloud-adjacent path"),
      ],
    }),
    aws: skillAnalysis({
      slug: "aws",
      name: "AWS",
      summary:
        "AWS is the strongest cloud signal and leans toward backend, DevOps, and platform-oriented roles in the current sample.",
      matchingPostings: 386,
      salary: { averageSalary: 145000, observations: 214, baselineSalary },
      primaryMetrics: [
        metric("Backend Developer", "/role/backend-developer", 142, 37, "Most visible role pairing"),
        metric("DevOps Engineer", undefined, 81, 21, "Infrastructure-heavy postings"),
        metric("Software Engineer", "/role/software-engineer", 73, 19, "Broad engineering usage"),
      ],
      secondaryMetrics: [
        metric("Docker", undefined, 139, 36, "Deployment and container overlap"),
        metric("Python", "/skill/python", 116, 30, "Backend and automation pairing"),
        metric("PostgreSQL", undefined, 68, 18, "Data layer overlap"),
      ],
      locations: [
        location("Virginia", 45, 12),
        location("California", 42, 11),
        location("Texas", 39, 10),
      ],
      explore: [
        roleSearch("Backend Developer", "backend-developer", "142 matching postings"),
        skillSearch("Python", "python", "Common backend pairing"),
        roleSearch("Backend Developer", "backend-developer", "Cloud-heavy role path"),
      ],
    }),
    python: skillAnalysis({
      slug: "python",
      name: "Python",
      summary:
        "Python spans backend, data, and automation-heavy postings, so its signal is broad rather than tied to one role family.",
      matchingPostings: 342,
      salary: { averageSalary: 141000, observations: 196, baselineSalary },
      primaryMetrics: [
        metric("Backend Developer", "/role/backend-developer", 119, 35, "Backend services pattern"),
        metric("Data Engineer", undefined, 73, 21, "Data pipeline context"),
        metric("Software Engineer", "/role/software-engineer", 69, 20, "Broad engineering usage"),
      ],
      secondaryMetrics: [
        metric("AWS", "/skill/aws", 116, 34, "Cloud pairing"),
        metric("PostgreSQL", undefined, 71, 21, "Data persistence overlap"),
        metric("Docker", undefined, 64, 19, "Deployment overlap"),
      ],
      locations: [
        location("California", 48, 14),
        location("Texas", 37, 11),
        location("Virginia", 31, 9),
      ],
      explore: [
        roleSearch("Backend Developer", "backend-developer", "119 matching postings"),
        skillSearch("AWS", "aws", "Cloud pairing"),
        roleSearch("Software Engineer", "software-engineer", "Broad role path"),
      ],
    }),
};

const roleAnalyses: Record<string, RoleAnalysis> = {
    "backend-developer": roleAnalysis({
      slug: "backend-developer",
      name: "Backend Developer",
      summary:
        "Backend Developer postings cluster around APIs, databases, and cloud deployment, with AWS and Python showing the strongest skill overlap.",
      matchingPostings: 192,
      salary: { averageSalary: 143000, observations: 118, baselineSalary },
      primaryMetrics: [
        metric("AWS", "/skill/aws", 142, 74, "Strongest detected skill"),
        metric("Python", "/skill/python", 119, 62, "Common backend language"),
        metric("PostgreSQL", undefined, 68, 35, "Database layer signal"),
      ],
      secondaryMetrics: [
        metric("Docker", undefined, 73, 38, "Deployment context"),
        metric("Java", undefined, 63, 33, "Enterprise backend pattern"),
        metric("React", "/skill/react", 41, 21, "Full-stack overlap"),
      ],
      locations: [
        location("California", 27, 14),
        location("Texas", 22, 11),
        location("Virginia", 19, 10),
      ],
      explore: [
        skillSearch("AWS", "aws", "142 matching postings"),
        skillSearch("Python", "python", "119 matching postings"),
        roleSearch("Software Engineer", "software-engineer", "Adjacent broad role"),
      ],
    }),
    "frontend-developer": roleAnalysis({
      slug: "frontend-developer",
      name: "Frontend Developer",
      summary:
        "Frontend Developer postings are concentrated around React and TypeScript, with Next.js adding a smaller but distinct modern web signal.",
      matchingPostings: 154,
      salary: { averageSalary: 134000, observations: 94, baselineSalary },
      primaryMetrics: [
        metric("React", "/skill/react", 188, 100, "Dominant frontend skill"),
        metric("TypeScript", "/skill/typescript", 128, 83, "Common typed JavaScript signal"),
        metric("Next.js", undefined, 76, 49, "Framework-specific overlap"),
      ],
      secondaryMetrics: [
        metric("AWS", "/skill/aws", 34, 22, "Deployment context"),
        metric("Node.js", undefined, 31, 20, "Full-stack overlap"),
        metric("PostgreSQL", undefined, 19, 12, "Product app data layer"),
      ],
      locations: [
        location("California", 23, 15),
        location("Texas", 18, 12),
        location("New York", 14, 9),
      ],
      explore: [
        skillSearch("React", "react", "188 matching postings"),
        skillSearch("TypeScript", "typescript", "128 matching postings"),
        roleSearch("Full Stack Developer", "full-stack-developer", "Adjacent role path"),
      ],
    }),
    "software-engineer": roleAnalysis({
      slug: "software-engineer",
      name: "Software Engineer",
      summary:
        "Software Engineer is the broadest role label in the dataset, mixing frontend, backend, and cloud requirements.",
      matchingPostings: 232,
      salary: { averageSalary: 139000, observations: 147, baselineSalary },
      primaryMetrics: [
        metric("React", "/skill/react", 83, 36, "Frontend overlap"),
        metric("AWS", "/skill/aws", 73, 31, "Cloud overlap"),
        metric("Python", "/skill/python", 69, 30, "Backend and data overlap"),
      ],
      secondaryMetrics: [
        metric("TypeScript", "/skill/typescript", 64, 28, "Frontend app overlap"),
        metric("Docker", undefined, 52, 22, "Deployment context"),
        metric("PostgreSQL", undefined, 44, 19, "Data layer context"),
      ],
      locations: [
        location("California", 34, 15),
        location("Texas", 25, 11),
        location("Virginia", 20, 9),
      ],
      explore: [
        roleSearch("Backend Developer", "backend-developer", "Backend specialization"),
        roleSearch("Frontend Developer", "frontend-developer", "Frontend specialization"),
        skillSearch("React", "react", "83 matching postings"),
      ],
    }),
    "full-stack-developer": roleAnalysis({
      slug: "full-stack-developer",
      name: "Full Stack Developer",
      summary:
        "Full Stack Developer postings bridge React-facing UI work with API and deployment skills.",
      matchingPostings: 128,
      salary: { averageSalary: 137000, observations: 81, baselineSalary },
      primaryMetrics: [
        metric("React", "/skill/react", 109, 85, "Frontend side of the role"),
        metric("TypeScript", "/skill/typescript", 81, 63, "Shared app code signal"),
        metric("AWS", "/skill/aws", 49, 38, "Deployment context"),
      ],
      secondaryMetrics: [
        metric("PostgreSQL", undefined, 37, 29, "Data layer pairing"),
        metric("Docker", undefined, 36, 28, "Deployment pairing"),
        metric("Python", "/skill/python", 28, 22, "API-side overlap"),
      ],
      locations: [
        location("California", 19, 15),
        location("Texas", 15, 12),
        location("New York", 11, 9),
      ],
      explore: [
        skillSearch("React", "react", "109 matching postings"),
        skillSearch("TypeScript", "typescript", "81 matching postings"),
        roleSearch("Backend Developer", "backend-developer", "Backend-adjacent path"),
      ],
    }),
};

export function getSkillAnalysis(slug: string) {
  return skillAnalyses[slug];
}

export function getRoleAnalysis(slug: string) {
  return roleAnalyses[slug];
}

export function getConfidenceLevel(count: number): ConfidenceLevel {
  if (count >= 30) return "Supported";
  if (count >= 15) return "Directional";
  if (count >= 5) return "Limited sample";
  return "Insufficient";
}

export function getSalaryConfidence(observations: number) {
  if (observations >= 30) return "Supported";
  if (observations >= 10) return "Limited sample";
  return "Insufficient";
}

export function formatSalary(value: number) {
  return `$${Math.round(value / 1000)}K`;
}

export function datasetShare(count: number) {
  return Math.round((count / totalPostings) * 100);
}

function skillSearch(name: string, slug: string, supportingText: string): SearchEntity {
  return {
    name,
    slug,
    type: "Skill",
    supportingText,
    href: `/skill/${slug}`,
  };
}

function roleSearch(name: string, slug: string, supportingText: string): SearchEntity {
  return {
    name,
    slug,
    type: "Role",
    supportingText,
    href: `/role/${slug}`,
  };
}

function metric(
  label: string,
  href: string | undefined,
  count: number,
  share: number,
  note: string
): RelatedMetric {
  return { label, href, count, share, note };
}

function location(label: string, count: number, share: number): LocationMetric {
  return { label, count, share };
}

function skillAnalysis(
  analysis: Omit<SkillAnalysis, "type" | "eyebrow" | "totalPostings" | "primaryTitle" | "secondaryTitle">
): SkillAnalysis {
  return {
    ...analysis,
    type: "Skill",
    eyebrow: "Skill Analysis",
    totalPostings,
    primaryTitle: "Role Fit",
    secondaryTitle: "Often Detected With",
  };
}

function roleAnalysis(
  analysis: Omit<RoleAnalysis, "type" | "eyebrow" | "totalPostings" | "primaryTitle" | "secondaryTitle">
): RoleAnalysis {
  return {
    ...analysis,
    type: "Role",
    eyebrow: "Role Analysis",
    totalPostings,
    primaryTitle: "Most Associated Skills",
    secondaryTitle: "Supporting Signals",
  };
}
