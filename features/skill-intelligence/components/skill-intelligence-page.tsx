import { ContinueExploringSection } from "./continue-exploring-section";
import { CompensationSection } from "./compensation-section";
import { GeographySection } from "./geography-section";
import { MarketPresenceSection } from "./market-presence-section";
import { RoleAlignmentSection } from "./role-alignment-section";
import { SkillEcosystemSection } from "./skill-ecosystem-section";
import { SkillHero } from "./skill-hero";
import { SkillInsightsSection } from "./skill-insights-section";
import { SkillSectionNav } from "./skill-section-nav";
import {
  getExploreEntities,
  getPrimaryRelatedSkill,
  getRoleConcentration,
  getSalaryContext,
  getSalaryPeerRanking,
  getSampleConfidence,
  getSupportedInsights,
} from "../selectors/skill-intelligence.selectors";
import type { SkillIntelligence } from "../types/skill-intelligence.types";

type SkillIntelligencePageProps = {
  data: SkillIntelligence;
};

const sectionNavItems = [
  { id: "presence", label: "Presence" },
  { id: "roles", label: "Roles" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "salary", label: "Salary" },
  { id: "geography", label: "Geography" },
  { id: "insights", label: "Insights" },
];

export function SkillIntelligencePage({ data }: SkillIntelligencePageProps) {
  const primaryRelatedSkill = getPrimaryRelatedSkill(data.relatedSkills);
  const roleConcentration = getRoleConcentration(data);
  const salaryContext = getSalaryContext(data);
  const insights = getSupportedInsights(data);
  const salaryPeers = getSalaryPeerRanking(data);
  const exploreItems = getExploreEntities(data);
  const confidence = getSampleConfidence(data.demand.matchingJobs);

  return (
    <main className="flex-1">
      <SkillHero
        name={data.skill.name}
        category={data.skill.category}
        matchingJobs={data.demand.matchingJobs}
        datasetShare={data.demand.datasetShare}
        estimatedSalary={data.salary.estimatedAverage}
        salaryObservations={data.salary.observations}
        confidence={confidence}
      />

      <SkillSectionNav items={sectionNavItems} />

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
        <MarketPresenceSection
          skillName={data.skill.name}
          matchingJobs={data.demand.matchingJobs}
          datasetShare={data.demand.datasetShare}
          totalJobs={data.demand.totalJobs}
        />
        <RoleAlignmentSection
          skillName={data.skill.name}
          roles={data.roles}
          insight={roleConcentration}
        />
        <SkillEcosystemSection
          skillName={data.skill.name}
          relatedSkills={data.relatedSkills}
          primaryRelatedSkill={primaryRelatedSkill}
        />
        <CompensationSection
          selectedSkillSlug={data.skill.slug}
          category={data.skill.category}
          salary={data.salary}
          peers={salaryPeers}
          insight={salaryContext}
        />
        <GeographySection locations={data.locations} />
        <SkillInsightsSection insights={insights} />
        <ContinueExploringSection items={exploreItems} />
      </div>
    </main>
  );
}
