"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RoleCompensationSection } from "./role-compensation-section";
import { RoleContinueExploringSection } from "./role-continue-exploring-section";
import { RoleGeographySection } from "./role-geography-section";
import { RoleInsightsSection } from "./role-insights-section";
import { RoleOpportunityCompensationSection } from "./role-opportunity-compensation-section";
import { RolePreviewSection } from "./role-preview-section";
import { RoleSectionNav } from "./role-section-nav";
import { RoleSkillProfileSection } from "./role-skill-profile-section";
import { RoleTechnologyPatternSection } from "./role-technology-pattern-section";
import {
  getRoleExploreEntities,
  getRoleInsights,
  getRoleSalaryPeers,
  getRoleSkillCategoryGroups,
  getSampleConfidence,
} from "../selectors/role-intelligence.selectors";
import type { RoleIntelligence } from "../types/role-intelligence.types";

type RoleIntelligencePageProps = {
  data: RoleIntelligence;
};

const sectionNavItems = [
  { id: "preview", label: "Preview" },
  { id: "skills", label: "Skills" },
  { id: "pattern", label: "Pattern" },
  { id: "opportunity", label: "Opportunity" },
  { id: "salary", label: "Salary" },
  { id: "geography", label: "Geography" },
  { id: "insights", label: "Insights" },
  { id: "explore", label: "Explore" },
];

export function RoleIntelligencePage({ data }: RoleIntelligencePageProps) {
  const [activeId, setActiveId] = useState(sectionNavItems[0].id);
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confidence = getSampleConfidence(data.opportunity.matchingJobs);
  const skillGroups = getRoleSkillCategoryGroups(data);
  const salaryPeers = getRoleSalaryPeers(data);
  const insights = getRoleInsights(data);
  const exploreItems = getRoleExploreEntities(data);

  const activePanel = useMemo(() => {
    if (activeId === "preview") {
      return (
        <RolePreviewSection
          name={data.role.name}
          matchingJobs={data.opportunity.matchingJobs}
          datasetShare={data.opportunity.datasetShare}
          totalJobs={data.opportunity.totalJobs}
          rank={data.opportunity.rank}
          estimatedSalary={data.salary.estimatedAverage}
          salaryObservations={data.salary.observations}
          confidence={confidence}
        />
      );
    }

    if (activeId === "skills") {
      return <RoleSkillProfileSection roleName={data.role.name} skills={data.skills} />;
    }

    if (activeId === "pattern") {
      return <RoleTechnologyPatternSection roleName={data.role.name} groups={skillGroups} />;
    }

    if (activeId === "opportunity") {
      return (
        <RoleOpportunityCompensationSection
          roleSlug={data.role.slug}
          points={data.opportunityPeers ?? []}
        />
      );
    }

    if (activeId === "salary") {
      return <RoleCompensationSection roleSlug={data.role.slug} peers={salaryPeers} />;
    }

    if (activeId === "geography") {
      return <RoleGeographySection locations={data.locations} />;
    }

    if (activeId === "insights") {
      return <RoleInsightsSection insights={insights} />;
    }

    return <RoleContinueExploringSection items={exploreItems} />;
  }, [activeId, confidence, data, exploreItems, insights, salaryPeers, skillGroups]);

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
        <RoleSectionNav
          items={sectionNavItems}
          activeId={activeId}
          onChange={handleTabChange}
        />
        <section
          id={`role-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`role-tab-${activeId}`}
          className="scrollbar-none h-[calc(100svh-6.5rem)] min-h-[28rem] overflow-y-auto motion-safe:animate-[skill-panel-in_180ms_ease-out_both] lg:border-l lg:border-border lg:pl-8"
        >
          {isSwitching ? <RolePanelSkeleton /> : activePanel}
        </section>
      </div>
    </main>
  );
}

function RolePanelSkeleton() {
  return (
    <div aria-label="Loading section" className="space-y-6">
      <div>
        <div className="h-3 w-10 rounded bg-muted" />
        <div className="mt-3 h-8 w-64 rounded bg-muted" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-muted" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40 rounded-2xl bg-card/60" />
        <div className="h-40 rounded-2xl bg-card/60" />
      </div>
    </div>
  );
}
