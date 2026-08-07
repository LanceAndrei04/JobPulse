import Link from "next/link";
import {
  Building2,
  CircleDollarSign,
  Database,
  Layers3,
  Link2,
  MapPin,
  Network,
  TrendingUp,
} from "lucide-react";
import { GlobalEntitySearch } from "@/components/global-entity-search";

const snapshotMetrics = [
  {
    label: "Postings analyzed",
    value: "1,284",
    detail: "Collected developer postings",
    icon: Database,
    fill: 82,
  },
  {
    label: "Companies represented",
    value: "826",
    detail: "Distinct detected employers",
    icon: Building2,
    fill: 64,
  },
  {
    label: "Est. avg salary",
    value: "$138K",
    detail: "Based on salary data",
    icon: CircleDollarSign,
    fill: 72,
    delta: "+4% vs sample median",
  },
  {
    label: "Skills tracked",
    value: "242",
    detail: "Normalized tech signals",
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
    title: "Software engineering and backend roles dominate classified postings.",
    stat: "33% combined",
  },
  {
    icon: Link2,
    title: "TypeScript appears alongside React in most matching postings.",
    stat: "68% co-detected",
  },
];

const technologyDemand = [
  { label: "React", count: "427", value: "~18%", percentage: 100, href: "/skill/react" },
  { label: "AWS", count: "386", value: "~16%", percentage: 90, href: "/skill/aws" },
  { label: "Python", count: "342", value: "~14%", percentage: 80, href: "/skill/python" },
  { label: "TypeScript", count: "311", value: "~13%", percentage: 73, href: "/skill/typescript" },
];

const roleSegments = [
  { label: "Software engineer", value: 18, color: "bg-primary" },
  { label: "Backend", value: 15, color: "bg-violet-500" },
  { label: "Frontend", value: 12, color: "bg-emerald-500" },
  { label: "Full stack", value: 10, color: "bg-orange-500" },
  { label: "DevOps", value: 8, color: "bg-zinc-600" },
];

const salarySignals = [
  { label: "Go", salary: "$149K", observations: "37 obs.", delta: 8, href: "/skill/go" },
  { label: "AWS", salary: "$145K", observations: "214 obs.", delta: 5, href: "/skill/aws" },
  { label: "React", salary: "$137K", observations: "312 obs.", delta: -1, href: "/skill/react" },
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
    <div className="mb-3">
      <h2 id={id} className="text-base font-bold leading-none text-foreground">{title}</h2>
      <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">{description}</p>
    </div>
  );
}

function SnapshotCard({ metric }: { metric: (typeof snapshotMetrics)[number] }) {
  return (
    <article className="relative min-h-20 overflow-hidden rounded-md border border-border bg-card p-4 shadow-[var(--shadow-xs)]">
      <div
        className="absolute -right-8 -top-8 size-24 rounded-full border border-primary/20"
        style={{
          background: `radial-gradient(circle, color-mix(in oklch, var(--primary) ${metric.fill}%, transparent) 0 2px, transparent 2px 100%)`,
          backgroundSize: "10px 10px",
          opacity: 0.2,
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">{metric.label}</p>
          <p className="mt-1 text-xl font-black leading-none text-foreground">{metric.value}</p>
          <p className="mt-2 text-[10px] leading-3 text-muted-foreground">{metric.detail}</p>
        </div>
        <metric.icon className="size-3.5 text-primary" aria-hidden="true" />
      </div>
      {metric.delta ? (
        <span className="relative mt-3 inline-flex rounded-sm bg-emerald-500/12 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
          {metric.delta}
        </span>
      ) : null}
    </article>
  );
}

function InsightCard({ signal }: { signal: (typeof keySignals)[number] }) {
  return (
    <article className="rounded-md border border-primary/20 bg-primary/20 p-4 shadow-[var(--shadow-xs)]">
      <signal.icon className="size-4 text-primary" aria-hidden="true" />
      <p className="mt-3 text-xs font-bold leading-4 text-foreground">{signal.title}</p>
      <p className="mt-1 text-[11px] leading-4 text-primary-foreground/75">{signal.stat}</p>
    </article>
  );
}

function TechnologyRow({ item }: { item: (typeof technologyDemand)[number] }) {
  return (
    <Link
      href={item.href}
      className="grid grid-cols-[5.5rem_1fr_4.4rem] items-center gap-3 rounded-sm py-1 outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/35"
    >
      <span className="text-xs font-bold text-foreground">{item.label}</span>
      <span className="h-2 overflow-hidden rounded-full bg-muted">
        <span
          className="block h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${item.percentage}%` }}
        />
      </span>
      <span className="text-right text-[11px] font-semibold text-muted-foreground">
        {item.count} - {item.value}
      </span>
    </Link>
  );
}

function RoleLandscape() {
  const total = roleSegments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div>
      <div className="flex h-7 overflow-hidden rounded-sm bg-muted">
        {roleSegments.map((segment) => (
          <span
            key={segment.label}
            className={segment.color}
            style={{ width: `${(segment.value / total) * 100}%` }}
            title={`${segment.label}: ${segment.value}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {roleSegments.map((segment) => (
          <span key={segment.label} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={`size-1.5 rounded-full ${segment.color}`} aria-hidden="true" />
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
  const barWidth = Math.abs(item.delta) * 9;

  return (
    <Link
      href={item.href}
      className="grid grid-cols-[4.5rem_1fr_6rem] items-center gap-3 rounded-sm py-1.5 outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/35"
    >
      <span className="text-xs font-bold text-foreground">{item.label}</span>
      <span className="relative h-7">
        <span className="absolute left-1/2 top-0 h-full w-px bg-muted-foreground/40" aria-hidden="true" />
        <span
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-emerald-500"
          style={{ left: `${barLeft}%`, width: `${barWidth}px` }}
        />
        <span
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-background bg-emerald-400"
          style={{ left: `${markerPosition}%` }}
          aria-hidden="true"
        />
      </span>
      <span className="text-right text-[11px] font-semibold text-muted-foreground">
        {item.salary} - {item.observations}
      </span>
    </Link>
  );
}

function GeographicRow({ item }: { item: (typeof geographicSignals)[number] }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr_2.2rem] items-center gap-3 py-1">
      <span className="text-xs font-bold text-foreground">{item.label}</span>
      <span className="h-2 overflow-hidden rounded-full bg-muted">
        <span className="block h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
      </span>
      <span className="text-right text-[11px] font-semibold text-muted-foreground">{item.value}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex w-full max-w-[760px] flex-col gap-8 px-4 pb-14 pt-4 sm:px-6">
        <section className="max-w-[560px]">
          <h1 className="max-w-[520px] text-[2rem] font-black leading-[1.02] tracking-normal text-foreground sm:text-[2.55rem]">
            Understand what developer job postings are asking for.
          </h1>
          <p className="mt-3 max-w-[470px] text-xs font-semibold leading-5 text-muted-foreground">
            JobPulse turns collected posting data into cautious, explorable signals about skills, roles, salary and location.
          </p>
          <div className="mt-5">
            <GlobalEntitySearch />
          </div>
        </section>

        <section aria-label="Market snapshot" className="grid gap-3 sm:grid-cols-4">
          {snapshotMetrics.map((metric) => (
            <SnapshotCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section aria-labelledby="key-market-signals">
          <SectionHeading
            id="key-market-signals"
            title="Key Market Signals"
            description="Short observations surfaced before the raw section views."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {keySignals.map((signal) => (
              <InsightCard key={signal.title} signal={signal} />
            ))}
          </div>
        </section>

        <section aria-labelledby="technology-demand">
          <SectionHeading
            id="technology-demand"
            title="Technology Demand"
            description="Most frequently detected skills in analyzed postings."
          />
          <div className="grid gap-0.5">
            {technologyDemand.map((item) => (
              <TechnologyRow key={item.label} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="role-landscape">
          <SectionHeading
            id="role-landscape"
            title="Role Landscape"
            description="Share of classified postings by role - one bar, five roles."
          />
          <RoleLandscape />
        </section>

        <section aria-labelledby="salary-signals">
          <SectionHeading
            id="salary-signals"
            title="Salary Signals"
            description="Estimated average salary compared with the $138K dataset baseline."
          />
          <div className="grid gap-0.5">
            {salarySignals.map((item) => (
              <SalarySignal key={item.label} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="geographic-concentration">
          <SectionHeading
            id="geographic-concentration"
            title="Geographic Concentration"
            description="Where collected postings appear most concentrated."
          />
          <div className="grid gap-0.5">
            {geographicSignals.map((item) => (
              <GeographicRow key={item.label} item={item} />
            ))}
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <MapPin className="size-3 text-primary" aria-hidden="true" />
            A lightweight state view can replace this list once the location dataset is stable.
          </p>
        </section>
      </section>
    </main>
  );
}
