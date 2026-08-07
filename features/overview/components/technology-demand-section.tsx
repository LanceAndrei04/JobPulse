import Link from "next/link";
import { SectionIntro } from "./section-heading";
import { technologyDemand } from "../data/overview.data";

type TechnologyDemandSectionProps = {
  items?: typeof technologyDemand;
};

export function TechnologyDemandSection({
  items = technologyDemand,
}: TechnologyDemandSectionProps) {
  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
        <SectionIntro
          id="technology-demand"
          title="Technology Demand"
          description="The technologies appearing most often across developer job postings."
          note="Percentages show share within this dataset, so they are best read as relative demand."
        />
        <div className="min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-4 shadow-[var(--shadow-md)] sm:p-5">
          {items.map((item) => (
            <TechnologyRow key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyRow({ item }: { item: (typeof technologyDemand)[number] }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group grid grid-cols-[minmax(10rem,14rem)_minmax(8rem,1fr)_5.5rem] items-center gap-4 rounded-xl border border-transparent px-3 py-3 outline-none transition-all hover:border-primary/20 hover:bg-card/55 focus-visible:ring-3 focus-visible:ring-ring/35 max-sm:grid-cols-1 max-sm:gap-2"
    >
      <span className="flex items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-card shadow-[var(--shadow-xs)]">
          {Icon ? (
            <Icon className="size-5 text-primary" aria-hidden="true" />
          ) : (
            <span className="text-sm font-bold text-primary">TS</span>
          )}
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground sm:text-base">
            {item.label}
          </span>
          <span className="mt-1 block text-xs leading-4 text-muted-foreground">
            {item.count} postings
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
