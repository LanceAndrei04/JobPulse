import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { formatCategory, formatPercent, formatSalary } from "@/features/skill-intelligence/utils/format";
import type { RoleInsight } from "../types/role-intelligence.types";

type RoleInsightsSectionProps = {
  insights: RoleInsight[];
};

export function RoleInsightsSection({ insights }: RoleInsightsSectionProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="What Data Suggests"
        title="Readable role signals"
        question="Short, cautious interpretations based on the strongest role-level patterns."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight, index) => (
          <article
            key={`${insight.type}-${index}`}
            className="rounded-2xl border border-border/75 bg-card/55 p-5"
          >
            <p className="font-mono text-xs font-semibold text-emerald-200">
              Signal {index + 1}
            </p>
            <p className="mt-3 text-base leading-7 text-foreground">
              {getInsightText(insight)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function getInsightText(insight: RoleInsight) {
  if (insight.type === "dominant_skill") {
    return `${insight.skillName} appears in ${formatPercent(insight.share)} of matching postings, making it the clearest defining skill signal.`;
  }

  if (insight.type === "skill_category_pattern") {
    return `${formatCategory(insight.category)} skills cluster around ${insight.qualifyingSkills.join(", ")}, so the role has a recognizable technical center.`;
  }

  if (insight.type === "opportunity_salary_position") {
    return `Compared with nearby roles, opportunity is ${insight.opportunityPosition} and compensation is ${insight.salaryPosition}.`;
  }

  if (insight.type === "salary_near_baseline") {
    return `Estimated salary is close to the dataset baseline at ${formatSalary(insight.estimatedAverage)} versus ${formatSalary(insight.baseline)}.`;
  }

  if (insight.type === "salary_above_baseline") {
    return `Estimated salary is above the dataset baseline at ${formatSalary(insight.estimatedAverage)} versus ${formatSalary(insight.baseline)}.`;
  }

  if (insight.type === "salary_below_baseline") {
    return `Estimated salary is below the dataset baseline at ${formatSalary(insight.estimatedAverage)} versus ${formatSalary(insight.baseline)}.`;
  }

  return `${insight.locationNames.join(" and ")} combine for ${formatPercent(insight.combinedShare)} of matching postings, suggesting a visible location concentration.`;
}
