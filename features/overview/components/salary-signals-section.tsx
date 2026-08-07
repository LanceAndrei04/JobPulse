import Link from "next/link";
import { ContextNote, SectionHeading } from "./section-heading";
import { salarySignals } from "../data/overview.data";

type SalarySignalsSectionProps = {
  skills?: typeof salarySignals;
  roles?: typeof salarySignals;
  baseline?: string;
};

export function SalarySignalsSection({
  skills = salarySignals,
  roles = [],
  baseline = "dataset average",
}: SalarySignalsSectionProps) {
  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,0.58fr)_minmax(18rem,0.42fr)]">
          <SectionHeading
            id="salary-signals"
            title="Salary Signals"
            description={`Highest-paying skills and roles compared with the ${baseline} baseline.`}
          />
          <ContextNote className="m-0 lg:justify-self-end">
            The center line represents the current dataset average; markers show below or above that baseline.
          </ContextNote>
        </div>
        <div className="grid min-w-0 gap-4 lg:grid-cols-2">
          <SalarySignalCard
            title="Highest Paying Skills"
            description="Skills with the strongest salary-bearing signal."
            items={skills}
          />
          <SalarySignalCard
            title="Top Paying Roles"
            description="Role groups ranked by average salary."
            items={roles}
            emptyLabel="Not enough role salary data yet."
          />
        </div>
      </div>
    </section>
  );
}

function SalarySignalCard({
  title,
  description,
  items,
  emptyLabel = "Not enough salary data yet.",
}: {
  title: string;
  description: string;
  items: typeof salarySignals;
  emptyLabel?: string;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-border/85 bg-card p-4 shadow-[var(--shadow-md)] sm:p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground sm:text-base">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      {items.length > 0 ? (
        <div className="space-y-1">
          {items.map((item) => (
            <SalarySignal key={item.label} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border/85 bg-background/35 px-4 py-8 text-sm font-medium text-muted-foreground">
          {emptyLabel}
        </div>
      )}
    </div>
  );
}

function SalarySignal({ item }: { item: (typeof salarySignals)[number] }) {
  const markerPosition = Math.min(Math.max(50 + item.delta * 1.8, 8), 92);
  const barLeft = Math.min(markerPosition, 50);
  const barRight = Math.max(markerPosition, 50);

  return (
    <Link
      href={item.href}
      className="group grid grid-cols-[minmax(5.5rem,0.9fr)_minmax(6rem,1fr)_4.5rem] items-center gap-3 rounded-xl px-3 py-3 outline-none transition-all hover:bg-card/55 focus-visible:ring-3 focus-visible:ring-ring/35 max-sm:grid-cols-1 max-sm:gap-2"
    >
      <span>
        <span className="block text-sm font-semibold text-foreground sm:text-base">
          {item.label}
        </span>
        <span className="mt-1 block text-xs leading-4 text-muted-foreground">
          {item.observations}
        </span>
      </span>
      <span className="relative h-10 overflow-hidden rounded-lg">
        <span
          className="absolute left-1/2 top-0 h-full w-px bg-muted-foreground/55"
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-emerald-300/80"
          style={{ left: `${barLeft}%`, width: `${barRight - barLeft}%` }}
        />
        <span
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-emerald-200 shadow-[0_0_20px_rgba(110,231,183,0.45)]"
          style={{ left: `${markerPosition}%` }}
          aria-hidden="true"
        />
        <span className="absolute bottom-0 left-0 text-[10px] font-medium text-muted-foreground">
          below
        </span>
        <span className="absolute bottom-0 right-0 text-[10px] font-medium text-muted-foreground">
          above
        </span>
      </span>
      <span className="text-right text-sm font-semibold text-muted-foreground max-sm:text-left">
        {item.salary}
      </span>
    </Link>
  );
}
