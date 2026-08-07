import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConfidenceLabel } from "./primitives/confidence-label";
import { MetricValue } from "./primitives/metric-value";
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
  estimatedSalary: number | null;
  salaryObservations: number;
  confidence: SampleConfidence;
};

export function SkillHero({
  name,
  category,
  matchingJobs,
  datasetShare,
  estimatedSalary,
  salaryObservations,
  confidence,
}: SkillHeroProps) {
  return (
    <header className="mx-auto w-full max-w-5xl px-5 pb-10 pt-8 sm:px-8 lg:px-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/35"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Overview
      </Link>

      <div className="mt-12 border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
            Skill Intelligence
          </p>
          <ConfidenceLabel confidence={confidence} />
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-balance text-5xl font-semibold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {formatCategory(category)}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:w-[26rem]">
            <MetricValue
              label="Market presence"
              value={formatCount(matchingJobs)}
              detail={`${formatApproxPercent(datasetShare)} of analyzed postings`}
            />
            <MetricValue
              label="Estimated salary"
              value={estimatedSalary ? formatSalary(estimatedSalary) : "Unavailable"}
              detail={`${formatCount(salaryObservations)} observations`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
