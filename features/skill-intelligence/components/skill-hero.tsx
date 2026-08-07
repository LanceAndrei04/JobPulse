import { ConfidenceLabel } from "./primitives/confidence-label";
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
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
      <section className="relative overflow-hidden rounded-2xl border border-primary/18 bg-[radial-gradient(circle_at_18%_10%,hsl(var(--primary)/0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(7,17,28,0.94))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-primary/15 bg-primary/5 blur-sm" />
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
          Skill Intelligence
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-none text-foreground sm:text-6xl">
          {name}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          A skill-level view of market demand, connected roles, salary signal, and hiring geography
          across analyzed postings.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            {formatCategory(category)}
          </span>
          <span className="rounded-full border border-border/80 bg-card/55 px-4 py-2 text-sm font-medium text-foreground">
            {formatApproxPercent(datasetShare)} of analyzed postings
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-2xl border border-border/75 bg-card/70 p-5">
          <p className="text-sm text-muted-foreground">Market presence</p>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <p className="text-4xl font-semibold text-foreground">{formatCount(matchingJobs)}</p>
            <ConfidenceLabel confidence={confidence} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Matching postings{totalJobs ? ` out of ${formatCount(totalJobs)} analyzed jobs` : ""}
          </p>
          <span className="mt-5 block h-2 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full rounded-full bg-primary motion-safe:animate-[skill-bar-grow_700ms_ease-out_both]"
              style={{ width: `${Math.min(datasetShare * 100, 100)}%` }}
            />
          </span>
        </div>

        <div className="rounded-2xl border border-primary/18 bg-primary/8 p-5">
          <p className="text-sm text-primary/85">Estimated salary</p>
          <p className="mt-3 text-4xl font-semibold text-foreground">
            {estimatedSalary ? formatSalary(estimatedSalary) : "N/A"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {formatCount(salaryObservations)} salary-bearing postings for this skill.
          </p>
        </div>
      </section>
    </div>
  );
}
