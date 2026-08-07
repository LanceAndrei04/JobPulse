import { SectionHeader } from "./primitives/section-header";
import {
  formatCategory,
  formatCount,
  formatSalary,
} from "../utils/format";
import type {
  SalaryPeer,
  SkillInsight,
  SkillIntelligence,
} from "../types/skill-intelligence.types";

type CompensationSectionProps = {
  selectedSkillSlug: string;
  category: SkillIntelligence["skill"]["category"];
  salary: SkillIntelligence["salary"];
  peers: SalaryPeer[];
  insight: SkillInsight | null;
};

export function CompensationSection({
  selectedSkillSlug,
  category,
  salary,
  peers,
  insight,
}: CompensationSectionProps) {
  return (
    <section id="salary">
      <SectionHeader
        eyebrow="04"
        title="Compensation Position"
        question="How does this skill compare with similar tracked skills?"
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Estimated average salary</p>
          <p className="mt-2 text-4xl font-semibold text-foreground">
            {salary.estimatedAverage
              ? formatSalary(salary.estimatedAverage)
              : "Not enough data"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatCount(salary.observations)} salary observations
          </p>
        </div>
        {salary.datasetBaseline ? (
          <div className="sm:text-right">
            <p className="text-sm text-muted-foreground">Dataset baseline</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {formatSalary(salary.datasetBaseline)}
            </p>
          </div>
        ) : null}
      </div>

      {peers.length > 0 ? (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {formatCategory(category)} peers
          </p>
          <div className="border-t border-border">
            {peers.map((peer) => {
              const selected = peer.slug === selectedSkillSlug;

              return (
                <div
                  key={peer.slug}
                  className={`grid gap-3 border-b border-border py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center ${
                    selected ? "text-primary" : "text-foreground"
                  }`}
                >
                  <p className="font-semibold">
                    {peer.name}
                    {selected ? <span className="ml-2 font-mono text-xs">selected</span> : null}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatCount(peer.observations)} obs.
                  </p>
                  <p className="font-semibold">{formatSalary(peer.estimatedAverage)}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="rounded-xl border border-border bg-card/35 p-4 text-sm leading-6 text-muted-foreground">
          Not enough same-category salary peer data is available for a useful
          ranking.
        </p>
      )}

      {insight ? <SalaryInsight insight={insight} /> : null}
    </section>
  );
}

function SalaryInsight({ insight }: { insight: SkillInsight }) {
  if (
    insight.type !== "salary_near_baseline" &&
    insight.type !== "salary_above_baseline" &&
    insight.type !== "salary_below_baseline"
  ) {
    return null;
  }

  const message = {
    salary_near_baseline:
      "Estimated compensation is broadly aligned with the dataset baseline.",
    salary_above_baseline:
      "Estimated compensation sits above the dataset baseline in this sample.",
    salary_below_baseline:
      "Estimated compensation sits below the dataset baseline in this sample.",
  }[insight.type];

  return (
    <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
      {message}
    </p>
  );
}
