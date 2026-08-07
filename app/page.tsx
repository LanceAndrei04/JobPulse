import Link from "next/link";
import {
  Atom,
  Building2,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  Layers3,
  Link2,
  MapPin,
  Network,
  Search,
  TrendingUp,
} from "lucide-react";
import { GlobalEntitySearch } from "@/components/global-entity-search";

const snapshotMetrics = [
  {
    label: "Postings analyzed",
    value: "1,284",
    detail: "Collected developer postings",
    context: "Sample size behind page percentages.",
    icon: Database,
    fill: 82,
  },
  {
    label: "Companies represented",
    value: "826",
    detail: "Distinct detected employers",
    context: "Distinct employers in the sample.",
    icon: Building2,
    fill: 64,
  },
  {
    label: "Est. avg salary",
    value: "$138K",
    detail: "Based on salary data",
    context: "Baseline for salary comparison.",
    icon: CircleDollarSign,
    fill: 72,
    delta: "+4% vs sample median",
  },
  {
    label: "Skills tracked",
    value: "242",
    detail: "Normalized tech signals",
    context: "Normalized skill terms tracked.",
    icon: Layers3,
    fill: 58,
  },
];

const keySignals = [
  {
    icon: TrendingUp,
    title: "React and AWS lead detected technology patterns.",
    stat: "18% and 16%",
  },
  {
    icon: Network,
    title:
      "Software engineering and backend roles dominate classified postings.",
    stat: "33% combined",
  },
  {
    icon: Link2,
    title: "TypeScript appears alongside React in most matching postings.",
    stat: "68% co-detected",
  },
];

const technologyDemand = [
  {
    label: "React",
    logo: "react",
    count: "427",
    value: "~18%",
    percentage: 100,
    href: "/skill/react",
  },
  {
    label: "AWS",
    logo: "aws",
    count: "386",
    value: "~16%",
    percentage: 90,
    href: "/skill/aws",
  },
  {
    label: "Python",
    logo: "python",
    count: "342",
    value: "~14%",
    percentage: 80,
    href: "/skill/python",
  },
  {
    label: "TypeScript",
    logo: "ts",
    count: "311",
    value: "~13%",
    percentage: 73,
    href: "/skill/typescript",
  },
];

const roleSegments = [
  { label: "Software engineer", value: 18, color: "bg-primary" },
  { label: "Backend", value: 15, color: "bg-sky-300" },
  { label: "Frontend", value: 12, color: "bg-emerald-300" },
  { label: "Full stack", value: 10, color: "bg-amber-300" },
  { label: "DevOps", value: 8, color: "bg-slate-500" },
];

const salarySignals = [
  {
    label: "Go",
    salary: "$149K",
    observations: "37 obs.",
    delta: 8,
    href: "/skill/go",
  },
  {
    label: "AWS",
    salary: "$145K",
    observations: "214 obs.",
    delta: 5,
    href: "/skill/aws",
  },
  {
    label: "React",
    salary: "$137K",
    observations: "312 obs.",
    delta: -1,
    href: "/skill/react",
  },
];

const geographicSignals = [
  { label: "California", value: "14%", percentage: 100 },
  { label: "Texas", value: "11%", percentage: 79 },
  { label: "Virginia", value: "9%", percentage: 64 },
];

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
        Overview
      </p>
      <h2
        id={id}
        className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

function SectionIntro({
  id,
  title,
  description,
  note,
}: {
  id: string;
  title: string;
  description: string;
  note?: string;
}) {
  return (
    <div>
      <SectionHeading id={id} title={title} description={description} />
      {note ? <ContextNote>{note}</ContextNote> : null}
    </div>
  );
}

function SnapshotCard({
  metric,
}: {
  metric: (typeof snapshotMetrics)[number];
}) {
  return (
    <article className="relative min-h-40 overflow-hidden rounded-xl border border-border bg-card/82 p-5 shadow-[var(--shadow-sm)] backdrop-blur">
      <div
        className="absolute -right-10 -top-10 size-36 rounded-full border border-primary/20"
        style={{
          background: `radial-gradient(circle, color-mix(in oklch, var(--primary) ${metric.fill}%, transparent) 0 2px, transparent 2px 100%)`,
          backgroundSize: "12px 12px",
          opacity: 0.24,
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {metric.label}
          </p>
          <p className="mt-3 text-3xl font-semibold leading-none text-foreground">
            {metric.value}
          </p>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {metric.detail}
          </p>
          <p className="mt-2 text-xs leading-5 text-foreground/78">
            {metric.context}
          </p>
        </div>
        <metric.icon className="size-5 text-primary" aria-hidden="true" />
      </div>
      {metric.delta ? (
        <span className="relative mt-4 inline-flex rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
          {metric.delta}
        </span>
      ) : null}
    </article>
  );
}

function InsightCard({ signal }: { signal: (typeof keySignals)[number] }) {
  return (
    <article className="rounded-xl border border-primary/18 bg-primary/10 p-5 shadow-[var(--shadow-sm)] backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/35">
      <signal.icon className="size-5 text-primary" aria-hidden="true" />
      <p className="mt-4 text-base font-semibold leading-6 text-foreground">
        {signal.title}
      </p>
      <p className="mt-3 text-sm leading-5 text-muted-foreground">
        {signal.stat}
      </p>
    </article>
  );
}

function TechLogo({ type }: { type: string }) {
  if (type === "react") {
    return <Atom className="size-5 text-primary" aria-hidden="true" />;
  }

  if (type === "aws") {
    return <Cloud className="size-5 text-primary" aria-hidden="true" />;
  }

  if (type === "python") {
    return <Code2 className="size-5 text-primary" aria-hidden="true" />;
  }

  return <span className="text-sm font-bold text-primary">TS</span>;
}

function TechnologyRow({ item }: { item: (typeof technologyDemand)[number] }) {
  return (
    <Link
      href={item.href}
      className="group grid grid-cols-[minmax(10rem,14rem)_minmax(8rem,1fr)_5.5rem] items-center gap-4 rounded-xl border border-transparent px-3 py-3 outline-none transition-all hover:border-primary/20 hover:bg-card/55 focus-visible:ring-3 focus-visible:ring-ring/35 max-sm:grid-cols-1 max-sm:gap-2"
    >
      <span className="flex items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-card shadow-[var(--shadow-xs)]">
          <TechLogo type={item.logo} />
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground sm:text-base">
            {item.label}
          </span>
          <span className="mt-1 block text-xs leading-4 text-muted-foreground">
            {item.count} detected postings
          </span>
        </span>
      </span>
      <span className="h-3 overflow-hidden rounded-full bg-muted">
        <span
          className="block h-full rounded-full bg-primary transition-[width] duration-500 group-hover:bg-sky-200"
          style={{ width: `${item.percentage}%` }}
        />
      </span>
      <span className="text-right text-sm font-semibold text-muted-foreground max-sm:text-left">
        {item.value}
      </span>
    </Link>
  );
}

function ContextNote({ children }: { children: string }) {
  return (
    <p className="mt-5 max-w-xl rounded-xl border border-border bg-background/35 p-4 text-sm leading-6 text-foreground/72 shadow-[var(--shadow-xs)]">
      {children}
    </p>
  );
}

function RoleLandscape() {
  const total = roleSegments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-[var(--shadow-sm)] sm:p-7">
      <div className="flex h-12 overflow-hidden rounded-xl bg-muted">
        {roleSegments.map((segment) => (
          <span
            key={segment.label}
            className={segment.color}
            style={{ width: `${(segment.value / total) * 100}%` }}
            title={`${segment.label}: ${segment.value}%`}
          />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {roleSegments.map((segment) => (
          <span
            key={segment.label}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
          >
            <span
              className={`size-2 rounded-full ${segment.color}`}
              aria-hidden="true"
            />
            {segment.label} {segment.value}%
          </span>
        ))}
      </div>
    </div>
  );
}

function SalarySignal({ item }: { item: (typeof salarySignals)[number] }) {
  const markerPosition = 50 + item.delta * 3.1;
  const barLeft = item.delta < 0 ? markerPosition : 50;
  const barWidth = Math.abs(item.delta) * 12;

  return (
    <Link
      href={item.href}
      className="group grid grid-cols-[7rem_minmax(8rem,1fr)_7rem] items-center gap-4 rounded-xl px-3 py-3 outline-none transition-all hover:bg-card/55 focus-visible:ring-3 focus-visible:ring-ring/35 max-sm:grid-cols-1 max-sm:gap-2"
    >
      <span>
        <span className="block text-sm font-semibold text-foreground sm:text-base">
          {item.label}
        </span>
        <span className="mt-1 block text-xs leading-4 text-muted-foreground">
          {item.observations}
        </span>
      </span>
      <span className="relative h-10">
        <span
          className="absolute left-1/2 top-0 h-full w-px bg-muted-foreground/45"
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-emerald-300"
          style={{ left: `${barLeft}%`, width: `${barWidth}px` }}
        />
        <span
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-emerald-200 shadow-[0_0_20px_rgba(110,231,183,0.45)]"
          style={{ left: `${markerPosition}%` }}
          aria-hidden="true"
        />
      </span>
      <span className="text-right text-sm font-semibold text-muted-foreground max-sm:text-left">
        {item.salary}
      </span>
    </Link>
  );
}

function GeographicRow({ item }: { item: (typeof geographicSignals)[number] }) {
  return (
    <div className="rounded-xl px-2 py-3 transition-colors hover:bg-background/30">
      <div className="mb-2 flex min-w-0 items-start justify-between gap-4">
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground sm:text-base">
            {item.label}
          </span>
          <span className="mt-1 block text-xs leading-4 text-muted-foreground">
            Share of collected postings
          </span>
        </span>
        <span className="shrink-0 text-sm font-semibold text-muted-foreground">
          {item.value}
        </span>
      </div>
      <span className="block h-3 overflow-hidden rounded-full bg-muted">
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${item.percentage}%` }}
        />
      </span>
    </div>
  );
}

function HeroSignalVisual() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-border bg-card/55 p-5 shadow-[var(--shadow-md)] backdrop-blur xl:min-h-[500px]">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px]"
        aria-hidden="true"
      />
      <div
        className="parallax-slow absolute left-10 top-12 h-48 w-48 rounded-full bg-primary/16 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="signal-drift absolute bottom-8 right-10 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid h-full min-h-[390px] place-items-center xl:min-h-[450px]">
        <svg
          className="absolute inset-0 h-full w-full text-primary/45"
          viewBox="0 0 520 440"
          aria-hidden="true"
        >
          <path
            d="M70 270 C150 150 260 320 450 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 12"
          />
          <path
            d="M90 120 C180 250 300 90 430 250"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="2 14"
          />
          <path
            d="M120 340 C230 210 330 360 455 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 14"
          />
        </svg>

        <div className="relative flex size-48 items-center justify-center rounded-full border border-primary/25 bg-background/70 shadow-[0_0_80px_rgba(77,166,255,0.16)] xl:size-56">
          <div className="signal-pulse absolute size-64 rounded-full border border-primary/15 xl:size-72" />
          <div className="signal-pulse absolute size-80 rounded-full border border-primary/10 [animation-delay:900ms] xl:size-96" />
          <div className="grid text-center">
            <span className="text-4xl font-semibold text-foreground xl:text-5xl">
              1,284
            </span>
            <span className="mt-2 text-sm text-muted-foreground">
              postings analyzed
            </span>
          </div>
        </div>

        <div className="absolute left-8 top-12 rounded-xl border border-border bg-background/75 px-4 py-3 shadow-[var(--shadow-sm)] backdrop-blur">
          <span className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
            <Atom className="size-4 text-primary" />
            React
          </span>
          <p className="mt-1 text-xs text-muted-foreground">427 postings</p>
        </div>

        <div className="absolute right-10 top-28 rounded-xl border border-border bg-background/75 px-4 py-3 shadow-[var(--shadow-sm)] backdrop-blur">
          <span className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
            <Cloud className="size-4 text-primary" />
            AWS
          </span>
          <p className="mt-1 text-xs text-muted-foreground">386 postings</p>
        </div>

        <div className="absolute bottom-14 left-16 rounded-xl border border-border bg-background/75 px-4 py-3 shadow-[var(--shadow-sm)] backdrop-blur">
          <span className="font-heading text-sm font-semibold text-foreground">
            TypeScript
          </span>
          <p className="mt-1 text-xs text-muted-foreground">68% with React</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <section className="overview-section">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[0.9fr_1.1fr] items-center gap-8 px-5 py-8 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
          <div className="reveal-panel min-w-0 max-w-3xl">
            <p className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
              Developer market signals
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              What is the market actually asking for?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-sm:leading-8">
              JobPulse turns collected job postings into clear, cautious signals
              about skills, roles, salary, and location so you can decide what
              to learn next.
            </p>
            <div className="mt-8">
              <GlobalEntitySearch />
            </div>
          </div>
          <div className="reveal-panel min-w-0 max-lg:hidden">
            <HeroSignalVisual />
          </div>
        </div>
      </section>

      <section className="overview-section">
        <div className="reveal-panel mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <SectionHeading
            id="market-snapshot"
            title="Market Snapshot"
            description="Dataset-scale context appears first, followed by short signals before the raw section views."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {snapshotMetrics.map((metric) => (
              <SnapshotCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {keySignals.map((signal) => (
              <InsightCard key={signal.title} signal={signal} />
            ))}
          </div>
        </div>
      </section>

      <section className="overview-section">
        <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
          <SectionIntro
            id="technology-demand"
            title="Technology Demand"
            description="Most frequently detected skills in analyzed postings, now with recognizable technology marks."
            note="Bars show detected presence within the current sample, not total market share."
          />
          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card/70 p-4 shadow-[var(--shadow-sm)] backdrop-blur sm:p-5">
            {technologyDemand.map((item) => (
              <TechnologyRow key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="overview-section">
        <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
          <SectionIntro
            id="role-landscape"
            title="Role Landscape"
            description="Share of classified postings by role in one segmented view, so proportion reads at a glance."
            note="Segments represent classified posting share by title pattern."
          />
          <RoleLandscape />
        </div>
      </section>

      <section className="overview-section">
        <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
          <SectionIntro
            id="salary-signals"
            title="Salary Signals"
            description="Estimated average salary compared with the $138K dataset baseline."
            note="Dots use the $138K dataset average as the center line."
          />
          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card/70 p-4 shadow-[var(--shadow-sm)] backdrop-blur sm:p-5">
            {salarySignals.map((item) => (
              <SalarySignal key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="overview-section">
        <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
          <div className="min-w-0">
            <SectionIntro
              id="geographic-concentration"
              title="Geographic Concentration"
              description="Where collected postings appear most concentrated in the current dataset."
              note="Location share reflects detected posting locations in this sample."
            />
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden="true" />A
              lightweight state view can replace this list once the location
              dataset is stable.
            </p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card/70 p-4 shadow-[var(--shadow-sm)] backdrop-blur sm:p-5">
            {geographicSignals.map((item) => (
              <GeographicRow key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
