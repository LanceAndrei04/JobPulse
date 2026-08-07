const implementedSkillSlugs = new Set(["react", "typescript", "aws", "python"]);
const implementedRoleSlugs = new Set([
  "backend-developer",
  "frontend-developer",
  "software-engineer",
  "full-stack-developer",
]);

export function getSkillHref(slug: string) {
  return implementedSkillSlugs.has(slug) ? `/skill/${slug}` : undefined;
}

export function getRoleHref(slug: string) {
  return implementedRoleSlugs.has(slug) ? `/role/${slug}` : undefined;
}
