import { Prisma } from "@prisma/client";

export const roleNameToSlug = {
  "Software Engineer": "software-engineer",
  "Backend Developer": "backend-developer",
  "Frontend Developer": "frontend-developer",
  "Full Stack Developer": "full-stack-developer",
  "DevOps Engineer": "devops-engineer",
  "Machine Learning Engineer": "machine-learning-engineer",
  "AI Engineer": "ai-engineer",
  "Data Engineer": "data-engineer",
  "Cloud Engineer": "cloud-engineer",
  "Cybersecurity Engineer": "cybersecurity-engineer",
  "Mobile Developer": "mobile-developer",
} as const;

export type ClassifiedRoleName = keyof typeof roleNameToSlug;

export const roleSlugToName = Object.fromEntries(
  Object.entries(roleNameToSlug).map(([name, slug]) => [slug, name])
) as Record<string, ClassifiedRoleName>;

export const roleCaseSql = Prisma.sql`
  CASE
    WHEN LOWER("title") LIKE '%full stack%'
      OR LOWER("title") LIKE '%full-stack%'
      OR LOWER("title") LIKE '%fullstack%'
    THEN 'Full Stack Developer'

    WHEN LOWER("title") LIKE '%frontend%'
      OR LOWER("title") LIKE '%front-end%'
      OR LOWER("title") LIKE '%front end%'
    THEN 'Frontend Developer'

    WHEN LOWER("title") LIKE '%backend%'
      OR LOWER("title") LIKE '%back-end%'
      OR LOWER("title") LIKE '%back end%'
    THEN 'Backend Developer'

    WHEN LOWER("title") LIKE '%devops%'
      OR LOWER("title") LIKE '%dev ops%'
    THEN 'DevOps Engineer'

    WHEN LOWER("title") LIKE '%machine learning%'
      OR LOWER("title") LIKE '%ml engineer%'
    THEN 'Machine Learning Engineer'

    WHEN LOWER("title") LIKE '%ai engineer%'
      OR LOWER("title") LIKE '%artificial intelligence%'
    THEN 'AI Engineer'

    WHEN LOWER("title") LIKE '%data engineer%'
    THEN 'Data Engineer'

    WHEN LOWER("title") LIKE '%cloud engineer%'
      OR LOWER("title") LIKE '%cloud developer%'
    THEN 'Cloud Engineer'

    WHEN LOWER("title") LIKE '%cybersecurity%'
      OR LOWER("title") LIKE '%cyber security%'
      OR LOWER("title") LIKE '%security engineer%'
    THEN 'Cybersecurity Engineer'

    WHEN LOWER("title") LIKE '%android%'
      OR LOWER("title") LIKE '%ios developer%'
      OR LOWER("title") LIKE '%mobile developer%'
      OR LOWER("title") LIKE '%mobile engineer%'
    THEN 'Mobile Developer'

    WHEN LOWER("title") LIKE '%software engineer%'
      OR LOWER("title") LIKE '%software developer%'
    THEN 'Software Engineer'

    ELSE NULL
  END
`;

export function getRoleSlug(name: string) {
  return roleNameToSlug[name as ClassifiedRoleName] ?? slugify(name);
}

export function getRoleNameFromSlug(slug: string) {
  return roleSlugToName[slug] ?? null;
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
