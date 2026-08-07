import { ConfidenceLabel } from "@/features/skill-intelligence/components/primitives/confidence-label";
import { formatApproxPercent, formatCount, formatSalary } from "@/features/skill-intelligence/utils/format";
import type { SampleConfidence } from "@/features/skill-intelligence/types/skill-intelligence.types";

type RolePreviewSectionProps = {
  name: string;
  matchingJobs: number;
  datasetShare: number;
  totalJobs?: number;
  rank?: number;
  estimatedSalary: number | null;
  salaryObservations: number;
  confidence: SampleConfidence;
};

export function RolePreviewSection({
  name,
  matchingJobs,
  datasetShare,
  totalJobs,
  rank,
  estimatedSalary,
  salaryObservations,
  confidence,
}: RolePreviewSectionProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
      <section className="relative overflow-hidden rounded-2xl border border-emerald-300/18 bg-[radial-gradient(circle_at_18%_10%,rgba(52,211,153,0.2),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(6,18,18,0.94))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-emerald-300/15 bg-emerald-300/5 blur-sm" />
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          Role Intelligence
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-none text-foreground sm:text-6xl">
          {name}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          A role-level view of job presence, required skills, salary position, and market shape
          across analyzed postings.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100">
            {formatApproxPercent(datasetShare)} of analyzed postings
          </span>
          {rank ? (
            <span className="rounded-full border border-border/80 bg-card/55 px-4 py-2 text-sm font-medium text-foreground">
              Rank #{rank} by role presence
            </span>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-2xl border border-border/75 bg-card/70 p-5">
          <p className="text-sm text-muted-foreground">Opportunity presence</p>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <p className="text-4xl font-semibold text-foreground">{formatCount(matchingJobs)}</p>
            <ConfidenceLabel confidence={confidence} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Matching postings{totalJobs ? ` out of ${formatCount(totalJobs)} analyzed jobs` : ""}
          </p>
          <span className="mt-5 block h-2 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full rounded-full bg-emerald-300 motion-safe:animate-[skill-bar-grow_700ms_ease-out_both]"
              style={{ width: `${Math.min(datasetShare * 100, 100)}%` }}
            />
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-300/18 bg-emerald-300/8 p-5">
          <p className="text-sm text-emerald-100/80">Estimated salary</p>
          <p className="mt-3 text-4xl font-semibold text-foreground">
            {estimatedSalary ? formatSalary(estimatedSalary) : "N/A"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {formatCount(salaryObservations)} salary-bearing postings for this role.
          </p>
        </div>
      </section>
    </div>
  );
}
