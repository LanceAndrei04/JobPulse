import Link from "next/link";
import { SectionIntro } from "./section-heading";
import { salarySignals } from "../data/overview.data";

type SalarySignalsSectionProps = {
  items?: typeof salarySignals;
};

export function SalarySignalsSection({
  items = salarySignals,
}: SalarySignalsSectionProps) {
  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
        <SectionIntro
          id="salary-signals"
          title="Salary Signals"
          description="Estimated average salary compared with the $138K dataset baseline."
          note="Dots use the $138K dataset average as the center line."
        />
        <div className="min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-card/92 p-4 shadow-[var(--shadow-md)] sm:p-5">
          {items.map((item) => (
            <SalarySignal key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
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
