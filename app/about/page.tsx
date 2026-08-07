import Link from "next/link";
import { Activity, Database, ShieldCheck, TimerReset } from "lucide-react";
import { OverviewBackground } from "@/features/overview/components/overview-background";

const details = [
  {
    icon: Database,
    title: "Data Source",
    body: "JobPulse uses job posting data retrieved through the Adzuna API. The app transforms those postings into market summaries for technologies, roles, salaries, and locations.",
  },
  {
    icon: TimerReset,
    title: "Data Window",
    body: "The production dataset is designed around recent job activity, retaining up to roughly six months of postings while daily imports focus on fresh listings.",
  },
  {
    icon: ShieldCheck,
    title: "Interpretation",
    body: "The numbers are directional signals, not a complete labor market census. Salary and location insights depend on postings that include usable salary or location fields.",
  },
];

export default function AboutPage() {
  return (
    <main className="overview-shell relative flex-1 overflow-hidden">
      <OverviewBackground />
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl grid-cols-[0.85fr_1.15fr] items-center gap-10 px-5 py-16 sm:px-8 lg:px-10 max-lg:grid-cols-1">
        <div className="reveal-panel max-w-2xl">
          <p className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
            About JobPulse
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
            Transparent market signals for developer careers.
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            JobPulse helps developers and early career builders understand which skills,
            roles, salary bands, and locations appear most often in recent job postings.
            It is built to make the dataset understandable without overstating what the
            market data can prove.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground outline-none transition hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/45"
            >
              View Overview
            </Link>
            <a
              href="https://developer.adzuna.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border/85 bg-card/70 px-5 text-sm font-semibold text-foreground outline-none transition hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/45"
            >
              Adzuna API
            </a>
          </div>
        </div>

        <div className="reveal-panel grid gap-4">
          <div className="rounded-2xl border border-border/85 bg-card/88 p-5 shadow-[var(--shadow-md)] sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/12">
                <Activity className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Built By</p>
                <p className="text-sm text-muted-foreground">LanceWork</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              This MVP focuses on clarity: searchable skill and role pages, a live market
              overview, protected ingestion jobs, and scheduled daily updates.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {details.map((detail) => (
              <article
                key={detail.title}
                className="rounded-2xl border border-border/85 bg-card/82 p-5 shadow-[var(--shadow-md)]"
              >
                <detail.icon className="size-5 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-base font-semibold text-foreground">
                  {detail.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {detail.body}
                </p>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-border/85 bg-background/35 p-5 text-sm leading-6 text-muted-foreground shadow-[var(--shadow-sm)] backdrop-blur">
            Data attribution: job posting data is provided through Adzuna. JobPulse adds
            normalization, skill extraction, role grouping, salary summaries, and location
            aggregation for exploration.
          </div>
        </div>
      </section>
    </main>
  );
}
