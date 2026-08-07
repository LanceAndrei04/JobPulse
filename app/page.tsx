import { Activity, Building2, CircleDollarSign, Database, Layers3 } from "lucide-react";
import { GlobalEntitySearch } from "@/components/global-entity-search";

const datasetContext = [
  "US developer postings",
  "Rolling 180-day dataset",
  "Adzuna sample",
];

const snapshotMetrics = [
  {
    label: "Developer Postings",
    value: "1,284",
    detail: "Collected postings analyzed",
    icon: Database,
  },
  {
    label: "Companies Represented",
    value: "826",
    detail: "Distinct detected employers",
    icon: Building2,
  },
  {
    label: "Estimated Avg. Salary",
    value: "$138K",
    detail: "Based on postings with salary data",
    icon: CircleDollarSign,
  },
  {
    label: "Skills Tracked",
    value: "242",
    detail: "Normalized developer signals",
    icon: Layers3,
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-md border border-border bg-card shadow-[var(--shadow-xs)]">
                <Activity className="size-4 text-primary" aria-hidden="true" />
              </span>
              <span>Developer Market Intelligence</span>
            </div>

            <h1 className="max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-normal text-foreground sm:text-[3.25rem]">
              Understand what developer job postings appear to be asking for.
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-muted-foreground">
              JobPulse turns collected posting data into cautious, explorable signals about skills, roles, salary estimates, and geographic concentration.
            </p>

            <div className="mt-9">
              <GlobalEntitySearch />
            </div>
          </div>

          <aside className="border-l border-border pl-6 lg:pl-8">
            <p className="text-sm font-medium text-foreground">Dataset Context</p>
            <div className="mt-5 grid gap-3">
              {datasetContext.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Counts are detected in the current JobPulse dataset and should be read as sample-based estimates.
            </p>
          </aside>
        </div>

        <section aria-labelledby="market-snapshot" className="pt-4">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 id="market-snapshot" className="text-xl font-semibold text-foreground">
                Market Snapshot
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Dataset-scale context before exploring individual technologies or roles.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {snapshotMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-normal text-foreground">{metric.value}</p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-md bg-accent text-primary">
                    <metric.icon className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{metric.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
      </main>
  );
}
