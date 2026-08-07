import { ConfidenceLabel } from "./primitives/confidence-label";
import { PercentageBar } from "./primitives/percentage-bar";
import {
  formatApproxPercent,
  formatCategory,
  formatCount,
  formatSalary,
} from "../utils/format";
import type { SampleConfidence, SkillCategory } from "../types/skill-intelligence.types";

type SkillHeroProps = {
  name: string;
  category: SkillCategory;
  matchingJobs: number;
  datasetShare: number;
  totalJobs?: number;
  estimatedSalary: number | null;
  salaryObservations: number;
  confidence: SampleConfidence;
};

export function SkillHero({
  name,
  category,
  matchingJobs,
  datasetShare,
  totalJobs,
  estimatedSalary,
  salaryObservations,
  confidence,
}: SkillHeroProps) {
  return (
    <section>
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
            Skill Intelligence
          </p>
          <ConfidenceLabel confidence={confidence} />
        </div>

        <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_30rem] xl:items-end">
          <div>
            <h1 className="text-balance text-5xl font-semibold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {formatCategory(category)}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/45 p-4 shadow-[var(--shadow-xs)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Market presence
                </p>
                <p className="mt-2 text-2xl font-semibold leading-none text-foreground">
                  {formatCount(matchingJobs)}
                </p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">
                  {formatApproxPercent(datasetShare)} of analyzed postings
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Estimated salary
                </p>
                <p className="mt-2 text-2xl font-semibold leading-none text-foreground">
                  {estimatedSalary ? formatSalary(estimatedSalary) : "Unavailable"}
                </p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">
                  {formatCount(salaryObservations)} observations
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex justify-between gap-4 text-xs text-muted-foreground">
                <span>Presence preview</span>
                <span>
                  {totalJobs
                    ? `${formatCount(matchingJobs)} / ${formatCount(totalJobs)}`
                    : formatApproxPercent(datasetShare)}
                </span>
              </div>
              <PercentageBar value={datasetShare} className="h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
