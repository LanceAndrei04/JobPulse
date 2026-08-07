import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Database,
  MapPin,
  Search,
} from "lucide-react";
import { RankedMetricRow } from "@/components/ranked-metric-row";
import {
  datasetShare,
  formatSalary,
  getConfidenceLevel,
  getSalaryConfidence,
  type RelatedMetric,
  type RoleAnalysis,
  type SearchEntity,
  type SkillAnalysis,
} from "@/lib/market-analysis-data";

type EntityAnalysisPageProps = {
  analysis: SkillAnalysis | RoleAnalysis;
};

export function EntityAnalysisPage({ analysis }: EntityAnalysisPageProps) {
  const confidence = getConfidenceLevel(analysis.matchingPostings);
  const share = datasetShare(analysis.matchingPostings);

  return (
    <main className="flex-1">
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/35"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Overview
          </Link>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(20rem,0.38fr)]">
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                {analysis.eyebrow}
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
                {analysis.name}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
                {analysis.summary}
              </p>
              <p className="mt-4 inline-flex rounded-md border border-border bg-background/35 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                MVP sample metrics, ready for API-backed entity analytics.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <HeaderMetric
                icon={Database}
                label="Matching postings"
                value={analysis.matchingPostings.toLocaleString()}
                detail={`${share}% of collected postings`}
              />
              <HeaderMetric
                icon={BadgeCheck}
                label="Confidence"
                value={confidence}
                detail="Based on sample size"
              />
              <HeaderMetric
                icon={CircleDollarSign}
                label="Salary observations"
                value={analysis.salary.observations.toLocaleString()}
                detail={getSalaryConfidence(analysis.salary.observations)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.58fr)_minmax(20rem,0.42fr)] lg:px-10">
        <div className="min-w-0 space-y-8">
          <MetricSection
            title={analysis.primaryTitle}
            description={
              analysis.type === "Skill"
                ? "Roles where this skill appears most often in the current sample."
                : "Skills most often detected in postings for this role."
            }
            metrics={analysis.primaryMetrics}
          />

          <MetricSection
            title={analysis.secondaryTitle}
            description="Related terms that help explain the surrounding market context."
            metrics={analysis.secondaryMetrics}
          />
        </div>

        <aside className="min-w-0 space-y-6">
          <SalaryPanel salary={analysis.salary} />
          <LocationPanel locations={analysis.locations} />
          <ExplorePanel entities={analysis.explore} />
        </aside>
      </section>
    </main>
  );
}

function HeaderMetric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Database;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-4 shadow-[var(--shadow-xs)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Icon className="size-4 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-3 text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

function MetricSection({
  title,
  description,
  metrics,
}: {
  title: string;
  description: string;
  metrics: RelatedMetric[];
}) {
  return (
    <section>
      <SectionHeader title={title} description={description} />
      <div className="mt-4 space-y-3">
        {metrics.map((metric, index) => (
          <RankedMetricRow
            key={metric.label}
            rank={index + 1}
            label={metric.label}
            value={`${metric.share}%`}
            detail={`${metric.count.toLocaleString()} matching postings`}
            context={metric.note}
            percentage={metric.share}
            href={metric.href}
          />
        ))}
      </div>
    </section>
  );
}

function SalaryPanel({ salary }: { salary: SkillAnalysis["salary"] }) {
  const confidence = getSalaryConfidence(salary.observations);
  const canCompare = salary.averageSalary !== null && salary.observations >= 30;
  const delta =
    salary.averageSalary === null ? 0 : salary.averageSalary - salary.baselineSalary;

  return (
    <section className="rounded-2xl border border-border bg-card/70 p-5 shadow-[var(--shadow-sm)]">
      <SectionHeader
        title="Salary Signals"
        description="Shown only when salary observations are strong enough to support comparison."
      />

      <div className="mt-5 rounded-xl border border-border bg-background/35 p-4">
        <p className="text-xs font-medium text-muted-foreground">
          Estimated average salary
        </p>
        <p className="mt-3 text-3xl font-semibold text-foreground">
          {salary.averageSalary && salary.observations >= 10
            ? formatSalary(salary.averageSalary)
            : "Not enough data"}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {salary.observations.toLocaleString()} salary observations. Confidence:
          {" "}
          {confidence}.
        </p>
      </div>

      {canCompare ? (
        <div className="mt-4">
          <div className="relative h-10">
            <span
              className="absolute left-1/2 top-0 h-full w-px bg-muted-foreground/45"
              aria-hidden="true"
            />
            <span
              className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-emerald-300"
              style={{
                left: delta < 0 ? `${50 + (delta / 1000) * 1.5}%` : "50%",
                width: `${Math.min(Math.abs(delta / 1000) * 6, 72)}px`,
              }}
            />
            <span
              className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-emerald-200 shadow-[0_0_20px_rgba(110,231,183,0.45)]"
              style={{
                left: `${Math.min(Math.max(50 + (delta / 1000) * 1.5, 8), 92)}%`,
              }}
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Baseline: {formatSalary(salary.baselineSalary)} dataset average.
          </p>
        </div>
      ) : null}
    </section>
  );
}

function LocationPanel({ locations }: { locations: SkillAnalysis["locations"] }) {
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-5 shadow-[var(--shadow-sm)]">
      <SectionHeader
        title="Geographic Context"
        description="Top detected posting locations in this sample."
      />
      <div className="mt-4 space-y-3">
        {locations.map((location) => (
          <div key={location.label} className="rounded-xl px-1 py-2">
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="flex min-w-0 items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate text-sm font-semibold text-foreground">
                  {location.label}
                </span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                {location.share}%
              </span>
            </div>
            <span className="block h-2 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${location.share * 6}%` }}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExplorePanel({ entities }: { entities: SearchEntity[] }) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/10 p-5 shadow-[var(--shadow-sm)]">
      <SectionHeader
        title="Continue Exploring"
        description="Follow related skills and roles without returning to the Overview."
      />
      <div className="mt-4 space-y-2">
        {entities.map((entity) => (
          <Link
            key={`${entity.type}-${entity.slug}`}
            href={entity.href}
            className="group flex items-center justify-between gap-4 rounded-xl border border-transparent bg-background/35 px-3 py-3 outline-none transition-all hover:border-primary/35 hover:bg-background/55 focus-visible:ring-3 focus-visible:ring-ring/35"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate">{entity.name}</span>
              </span>
              <span className="mt-1 block truncate text-xs text-muted-foreground">
                {entity.type} - {entity.supportingText}
              </span>
            </span>
            <ArrowRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
