"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ContinueExploringSection } from "./continue-exploring-section";
import { CompensationSection } from "./compensation-section";
import { GeographySection } from "./geography-section";
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
  { id: "preview", label: "Preview" },
  { id: "roles", label: "Roles" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "salary", label: "Salary" },
  { id: "geography", label: "Geography" },
  { id: "insights", label: "Insights" },
  { id: "explore", label: "Explore" },
];

export function SkillIntelligencePage({ data }: SkillIntelligencePageProps) {
  const [activeId, setActiveId] = useState(sectionNavItems[0].id);
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const primaryRelatedSkill = getPrimaryRelatedSkill(data.relatedSkills);
  const roleConcentration = getRoleConcentration(data);
  const salaryContext = getSalaryContext(data);
  const insights = getSupportedInsights(data);
  const salaryPeers = getSalaryPeerRanking(data);
  const exploreItems = getExploreEntities(data);
  const confidence = getSampleConfidence(data.demand.matchingJobs);
  const activePanel = useMemo(() => {
    if (activeId === "preview") {
      return (
        <SkillHero
          name={data.skill.name}
          category={data.skill.category}
          matchingJobs={data.demand.matchingJobs}
          datasetShare={data.demand.datasetShare}
          totalJobs={data.demand.totalJobs}
          estimatedSalary={data.salary.estimatedAverage}
          salaryObservations={data.salary.observations}
          confidence={confidence}
        />
      );
    }

    if (activeId === "roles") {
      return (
        <RoleAlignmentSection
          skillName={data.skill.name}
          roles={data.roles}
          insight={roleConcentration}
        />
      );
    }

    if (activeId === "ecosystem") {
      return (
        <SkillEcosystemSection
          skillName={data.skill.name}
          relatedSkills={data.relatedSkills}
          primaryRelatedSkill={primaryRelatedSkill}
        />
      );
    }

    if (activeId === "salary") {
      return (
        <CompensationSection
          selectedSkillSlug={data.skill.slug}
          category={data.skill.category}
          salary={data.salary}
          peers={salaryPeers}
          insight={salaryContext}
        />
      );
    }

    if (activeId === "geography") {
      return <GeographySection locations={data.locations} />;
    }

    if (activeId === "insights") {
      return <SkillInsightsSection insights={insights} />;
    }

    return <ContinueExploringSection items={exploreItems} />;
  }, [
    activeId,
    confidence,
    data,
    exploreItems,
    insights,
    primaryRelatedSkill,
    roleConcentration,
    salaryContext,
    salaryPeers,
  ]);

  function handleTabChange(id: string) {
    if (id === activeId) {
      return;
    }

    setIsSwitching(true);

    if (switchTimer.current) {
      clearTimeout(switchTimer.current);
    }

    switchTimer.current = setTimeout(() => {
      setActiveId(id);
      setIsSwitching(false);
    }, 110);
  }

  useEffect(() => {
    return () => {
      if (switchTimer.current) {
        clearTimeout(switchTimer.current);
      }
    };
  }, []);

  return (
    <main className="flex-1 overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-8">
        <SkillSectionNav
          items={sectionNavItems}
          activeId={activeId}
          onChange={handleTabChange}
        />
        <section
          id={`skill-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeId}`}
          className="scrollbar-none h-[calc(100svh-6.5rem)] min-h-[28rem] overflow-y-auto motion-safe:animate-[skill-panel-in_180ms_ease-out_both] lg:border-l lg:border-border lg:pl-8"
        >
          {isSwitching ? <SkillPanelSkeleton /> : activePanel}
        </section>
      </div>
    </main>
  );
}

function SkillPanelSkeleton() {
  return (
    <div aria-label="Loading section" className="space-y-6">
      <div>
        <div className="h-3 w-8 rounded bg-muted" />
        <div className="mt-3 h-8 w-60 rounded bg-muted" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-muted" />
      </div>
      <div className="space-y-4">
        <div className="h-16 rounded-xl bg-card/60" />
        <div className="h-16 rounded-xl bg-card/60" />
        <div className="h-16 rounded-xl bg-card/60" />
      </div>
    </div>
  );
}
