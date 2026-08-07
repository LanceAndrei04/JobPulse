import { SectionHeading } from "./section-heading";
import { keySignals, snapshotMetrics } from "../data/overview.data";

type MarketSnapshotSectionProps = {
  metrics?: typeof snapshotMetrics;
  signals?: typeof keySignals;
};

export function MarketSnapshotSection({
  metrics = snapshotMetrics,
  signals = keySignals,
}: MarketSnapshotSectionProps) {
  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <SectionHeading
          id="market-snapshot"
          title="Market Snapshot"
          description="Dataset-scale context appears first, followed by short signals before the raw section views."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <SnapshotCard key={metric.label} metric={metric} />
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {signals.map((signal) => (
            <InsightCard key={signal.title} signal={signal} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SnapshotCard({ metric }: { metric: (typeof snapshotMetrics)[number] }) {
  return (
    <article className="relative min-h-40 overflow-hidden rounded-xl border border-border/70 bg-card/62 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl">
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
          <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold leading-none text-foreground">
            {metric.value}
          </p>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">{metric.detail}</p>
          <p className="mt-2 text-xs leading-5 text-foreground/78">{metric.context}</p>
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
    <article className="rounded-xl border border-primary/18 bg-primary/10 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/35">
      <signal.icon className="size-5 text-primary" aria-hidden="true" />
      <p className="mt-4 text-base font-semibold leading-6 text-foreground">{signal.title}</p>
      <p className="mt-3 text-sm leading-5 text-muted-foreground">{signal.stat}</p>
    </article>
  );
}
