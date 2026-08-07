import {
  getSalaryConfidence,
  getSampleConfidence,
} from "@/features/skill-intelligence/selectors/skill-intelligence.selectors";
import type {
  RoleExploreEntity,
  RoleInsight,
  RoleIntelligence,
  RoleSkillCategoryDistribution,
  RoleSalaryPeer,
} from "../types/role-intelligence.types";

export { getSampleConfidence, getSalaryConfidence };

export function getRoleSalaryPeers(data: RoleIntelligence): RoleSalaryPeer[] {
  const peers = (data.salaryPeers ?? [])
    .filter((peer) => peer.estimatedAverage !== null && peer.salaryObservations >= 30)
    .sort((a, b) => (b.estimatedAverage ?? 0) - (a.estimatedAverage ?? 0));

  const selectedIndex = peers.findIndex((peer) => peer.slug === data.role.slug);

  if (selectedIndex === -1 || peers.length < 3) {
    return [];
  }

  return peers.slice(Math.max(selectedIndex - 3, 0), Math.min(selectedIndex + 4, peers.length));
}

export function getOpportunitySalaryPosition(data: RoleIntelligence) {
  const peers = data.opportunityPeers ?? [];
  const selected = peers.find((peer) => peer.slug === data.role.slug);

  if (!selected || peers.length < 3) {
    return null;
  }

  const jobMedian = median(peers.map((peer) => peer.jobCount));
  const salaryMedian = median(peers.map((peer) => peer.estimatedSalary));

  return {
    opportunityPosition: position(selected.jobCount, jobMedian),
    salaryPosition: position(selected.estimatedSalary, salaryMedian),
  };
}

export function getRoleInsights(data: RoleIntelligence): RoleInsight[] {
  const insights: RoleInsight[] = [];
  const topSkill = data.skills[0];
  const topCategory = getRoleSkillCategoryGroups(data)[0];
  const opportunitySalary = getOpportunitySalaryPosition(data);
  const salary = data.salary;
  const topLocations = data.locations.slice(0, 2);
  const locationShare = topLocations.reduce((sum, location) => sum + location.share, 0);

  if (topSkill && topSkill.matchingJobs >= 30 && topSkill.share >= 0.3) {
    insights.push({
      type: "dominant_skill",
      skillName: topSkill.name,
      share: topSkill.share,
      observations: topSkill.matchingJobs,
    });
  }

  if (topCategory && topCategory.topSkills.length >= 2) {
    insights.push({
      type: "skill_category_pattern",
      category: topCategory.category,
      qualifyingSkills: topCategory.topSkills.map((skill) => skill.name),
    });
  }

  if (opportunitySalary) {
    insights.push({
      type: "opportunity_salary_position",
      ...opportunitySalary,
    });
  }

  if (salary.estimatedAverage && salary.datasetBaseline && salary.observations >= 30) {
    const difference = (salary.estimatedAverage - salary.datasetBaseline) / salary.datasetBaseline;
    insights.push(
      Math.abs(difference) < 0.03
        ? {
            type: "salary_near_baseline",
            estimatedAverage: salary.estimatedAverage,
            baseline: salary.datasetBaseline,
          }
        : difference > 0
          ? {
            type: "salary_above_baseline",
            estimatedAverage: salary.estimatedAverage,
            baseline: salary.datasetBaseline,
          }
          : {
              type: "salary_below_baseline",
              estimatedAverage: salary.estimatedAverage,
              baseline: salary.datasetBaseline,
            }
    );
  }

  if (topLocations.length >= 2 && locationShare >= 0.2) {
    insights.push({
      type: "geographic_concentration",
      locationNames: topLocations.map((location) => location.name),
      combinedShare: locationShare,
    });
  }

  return insights;
}

export function getRoleExploreEntities(data: RoleIntelligence): RoleExploreEntity[] {
  const skillItems = data.skills.slice(0, 3).map((skill) => ({
    type: "skill" as const,
    name: skill.name,
    slug: skill.slug,
    description: "Frequently detected role skill",
    metric: `${Math.round(skill.share * 100)}%`,
  }));

  const roleItems = (data.adjacentRoles ?? []).slice(0, 2).map((role) => ({
    type: "role" as const,
    name: role.name,
    slug: role.slug,
    description: role.reason ?? "Adjacent role",
    metric: role.metric ? `${role.metric.toLocaleString()} postings` : undefined,
  }));

  return [...skillItems, ...roleItems].slice(0, 5);
}

export function getRoleSkillCategoryGroups(
  data: RoleIntelligence
): RoleSkillCategoryDistribution[] {
  const groups = new Map<string, RoleSkillCategoryDistribution>();

  data.skills.forEach((skill) => {
    const existing = groups.get(skill.category) ?? {
      category: skill.category,
      uniqueSkills: 0,
      totalDetections: 0,
      share: 0,
      topSkills: [],
    };

    existing.uniqueSkills = (existing.uniqueSkills ?? 0) + 1;
    existing.totalDetections = (existing.totalDetections ?? 0) + skill.matchingJobs;
    existing.share = Math.min((existing.share ?? 0) + skill.share, 1);
    existing.topSkills.push({
      name: skill.name,
      slug: skill.slug,
      matchingJobs: skill.matchingJobs,
      share: skill.share,
    });

    groups.set(skill.category, existing);
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      topSkills: group.topSkills.sort((a, b) => b.share - a.share).slice(0, 4),
    }))
    .sort((a, b) => (b.totalDetections ?? 0) - (a.totalDetections ?? 0));
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function position(value: number, baseline: number): "low" | "mid" | "high" {
  if (value > baseline * 1.08) return "high";
  if (value < baseline * 0.92) return "low";
  return "mid";
}
