import { Atom, Cloud } from "lucide-react";
import { GlobalEntitySearch } from "@/components/global-entity-search";

type HeroSignal = {
  label: string;
  detail: string;
  icon?: "react" | "aws";
};

type OverviewHeroSectionProps = {
  totalJobs?: string;
  signals?: HeroSignal[];
};

const fallbackSignals: HeroSignal[] = [
  { label: "React", detail: "427 postings", icon: "react" },
  { label: "AWS", detail: "386 postings", icon: "aws" },
  { label: "TypeScript", detail: "68% with React" },
];

export function OverviewHeroSection({
  totalJobs = "1,284",
  signals = fallbackSignals,
}: OverviewHeroSectionProps) {
  return (
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
            JobPulse turns collected job postings into clear, cautious signals about skills,
            roles, salary, and location so you can decide what to learn next.
          </p>
          <div className="mt-8 lg:hidden">
            <GlobalEntitySearch />
          </div>
        </div>
        <div className="reveal-panel relative z-20 min-w-0 space-y-4 max-lg:hidden">
          <div className="relative z-30 mx-auto w-full max-w-2xl">
            <GlobalEntitySearch />
          </div>
          <HeroSignalVisual totalJobs={totalJobs} signals={signals} />
        </div>
      </div>
    </section>
  );
}

function HeroSignalVisual({
  totalJobs,
  signals,
}: {
  totalJobs: string;
  signals: HeroSignal[];
}) {
  const [first, second, third] = normalizeSignals(signals);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/42 p-5 shadow-[var(--shadow-md)] backdrop-blur-xl xl:min-h-[500px]">
      <div
        className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(125,211,252,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.028)_1px,transparent_1px)] [background-size:48px_48px]"
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
            strokeDasharray="6 12"
            strokeWidth="2"
          />
          <path
            d="M90 120 C180 250 300 90 430 250"
            fill="none"
            stroke="currentColor"
            strokeDasharray="2 14"
            strokeWidth="2"
          />
          <path
            d="M120 340 C230 210 330 360 455 300"
            fill="none"
            stroke="currentColor"
            strokeDasharray="8 14"
            strokeWidth="2"
          />
        </svg>

        <div className="relative flex size-48 items-center justify-center rounded-full border border-primary/25 bg-background/70 shadow-[0_0_80px_rgba(77,166,255,0.16)] xl:size-56">
          <div className="signal-pulse absolute size-64 rounded-full border border-primary/15 xl:size-72" />
          <div className="signal-pulse absolute size-80 rounded-full border border-primary/10 [animation-delay:900ms] xl:size-96" />
          <div className="grid text-center">
            <span className="text-4xl font-semibold text-foreground xl:text-5xl">{totalJobs}</span>
            <span className="mt-2 text-sm text-muted-foreground">postings analyzed</span>
          </div>
        </div>

        <FloatingSignal className="left-8 top-12" {...first} />
        <FloatingSignal className="right-10 top-28" {...second} />
        <FloatingSignal className="bottom-14 left-16" {...third} />
      </div>
    </div>
  );
}

function normalizeSignals(signals: HeroSignal[]) {
  const normalized = [...signals, ...fallbackSignals].slice(0, 3);
  return normalized as [HeroSignal, HeroSignal, HeroSignal];
}

function FloatingSignal({
  className,
  label,
  detail,
  icon,
}: {
  className: string;
  label: string;
  detail: string;
  icon?: "react" | "aws";
}) {
  const Icon = icon === "react" ? Atom : icon === "aws" ? Cloud : null;

  return (
    <div
      className={`absolute rounded-xl border border-border/75 bg-background/72 px-4 py-3 shadow-[var(--shadow-sm)] backdrop-blur ${className}`}
    >
      <span className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
        {Icon ? <Icon className="size-4 text-primary" aria-hidden="true" /> : null}
        {label}
      </span>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
