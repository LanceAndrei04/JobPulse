import type {
  ExploreEntity,
  RelatedSkill,
  SalaryPeer,
  SampleConfidence,
  SkillInsight,
  SkillIntelligence,
} from "../types/skill-intelligence.types";

const minimumSalaryPeerObservations = 30;

export function getSampleConfidence(count: number): SampleConfidence {
  if (count >= 30) return "supported";
  if (count >= 15) return "directional";
  if (count >= 5) return "limited";
  return "insufficient";
}

export function getSalaryConfidence(observations: number): SampleConfidence {
  if (observations >= 30) return "supported";
  if (observations >= 10) return "limited";
  return "insufficient";
}

export function getPrimaryRelatedSkill(
  relatedSkills: RelatedSkill[]
): RelatedSkill | null {
  const [first, second] = relatedSkills;

  if (!first || first.matchingJobs < 30 || first.share < 0.35) {
    return null;
  }

  if (second && first.share - second.share < 0.15) {
    return null;
  }

  return first;
}

export function getRoleConcentration(data: SkillIntelligence): SkillInsight | null {
  const topRoles = data.roles.slice(0, 2);

  if (topRoles.length < 2) {
    return null;
  }

  const combinedShare = topRoles.reduce((sum, role) => sum + role.share, 0);

  if (combinedShare < 0.55) {
    return null;
  }

  return {
    type: "role_concentration",
    roleNames: topRoles.map((role) => role.name),
    combinedShare,
  };
}

export function getSalaryContext(data: SkillIntelligence): SkillInsight | null {
  const { estimatedAverage, observations, datasetBaseline } = data.salary;

  if (!estimatedAverage || !datasetBaseline || observations < 30) {
    return null;
  }

  const differencePercent = (estimatedAverage - datasetBaseline) / datasetBaseline;

  if (Math.abs(differencePercent) < 0.03) {
    return { type: "salary_near_baseline", estimatedAverage, baseline: datasetBaseline };
  }

  if (differencePercent > 0) {
    return { type: "salary_above_baseline", estimatedAverage, baseline: datasetBaseline };
  }

  return { type: "salary_below_baseline", estimatedAverage, baseline: datasetBaseline };
}

export function getSupportedInsights(data: SkillIntelligence): SkillInsight[] {
  const insights: SkillInsight[] = [];
  const primaryRelatedSkill = getPrimaryRelatedSkill(data.relatedSkills);
  const roleConcentration = getRoleConcentration(data);
  const salaryContext = getSalaryContext(data);

  if (primaryRelatedSkill) {
    insights.push({
      type: "strong_skill_association",
      relatedSkillName: primaryRelatedSkill.name,
      share: primaryRelatedSkill.share,
      observations: primaryRelatedSkill.matchingJobs,
    });
  }

  if (roleConcentration) {
    insights.push(roleConcentration);
  }

  if (salaryContext) {
    insights.push(salaryContext);
  }

  return insights;
}

export function getSalaryPeerRanking(data: SkillIntelligence): SalaryPeer[] {
  const peers = data.salaryPeers ?? [];
  const comparablePeers = peers
    .filter(
      (peer) =>
        peer.category === data.skill.category &&
        peer.observations >= minimumSalaryPeerObservations
    )
    .sort((a, b) => b.estimatedAverage - a.estimatedAverage);

  const selectedIndex = comparablePeers.findIndex(
    (peer) => peer.slug === data.skill.slug
  );

  if (selectedIndex === -1 || comparablePeers.length < 3) {
    return [];
  }

  const start = Math.max(selectedIndex - 3, 0);
  const end = Math.min(selectedIndex + 4, comparablePeers.length);

  return comparablePeers.slice(start, end);
}

export function getExploreEntities(data: SkillIntelligence): ExploreEntity[] {
  const primaryRelatedSkill = getPrimaryRelatedSkill(data.relatedSkills);
  const items: ExploreEntity[] = [];

  if (primaryRelatedSkill) {
    items.push({
      type: "skill",
      name: primaryRelatedSkill.name,
      slug: primaryRelatedSkill.slug,
      description: "Strongest detected skill association",
      metric: `${Math.round(primaryRelatedSkill.share * 100)}%`,
    });
  }

  data.roles.slice(0, 2).forEach((role, index) => {
    items.push({
      type: "role",
      name: role.name,
      slug: role.slug,
      description:
        index === 0 ? "Largest role concentration" : "Adjacent role pattern",
      metric: `${role.matchingJobs.toLocaleString()} postings`,
    });
  });

  data.relatedSkills
    .filter((skill) => skill.slug !== primaryRelatedSkill?.slug)
    .slice(0, 2)
    .forEach((skill) => {
      items.push({
        type: "skill",
        name: skill.name,
        slug: skill.slug,
        description: "Related skill in the ecosystem",
        metric: `${Math.round(skill.share * 100)}%`,
      });
    });

  return items.slice(0, 5);
}
