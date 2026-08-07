import { SectionHeader } from "./primitives/section-header";
import { formatCount, formatPercent, formatSalary } from "../utils/format";
import type { SkillInsight } from "../types/skill-intelligence.types";

type SkillInsightsSectionProps = {
  insights: SkillInsight[];
};

export function SkillInsightsSection({ insights }: SkillInsightsSectionProps) {
  if (insights.length === 0) {
    return null;
  }

  return (
    <section id="insights" className="scroll-mt-28 border-b border-border py-14">
      <SectionHeader
        eyebrow="06"
        title="What the Data Suggests"
        question="Supported interpretations generated from the structured sample."
      />

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <p
            key={`${insight.type}-${index}`}
            className="border-l border-primary/60 pl-4 text-sm leading-6 text-muted-foreground sm:text-base"
          >
            {renderInsight(insight)}
          </p>
        ))}
      </div>
    </section>
  );
}

function renderInsight(insight: SkillInsight) {
  if (insight.type === "strong_skill_association") {
    return `${insight.relatedSkillName} appears in ${formatPercent(
      insight.share
    )} of matching postings, based on ${formatCount(insight.observations)} observations.`;
  }

  if (insight.type === "role_concentration") {
    return `${insight.roleNames.join(" and ")} account for approximately ${formatPercent(
      insight.combinedShare
    )} of matching postings in this sample.`;
  }

  if (insight.type === "salary_near_baseline") {
    return `Estimated compensation is broadly aligned with the ${formatSalary(
      insight.baseline
    )} dataset baseline.`;
  }

  if (insight.type === "salary_above_baseline") {
    return `Estimated compensation is above the ${formatSalary(
      insight.baseline
    )} dataset baseline.`;
  }

  return `Estimated compensation is below the ${formatSalary(
    insight.baseline
  )} dataset baseline.`;
}
