import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RankedMetricRowProps = {
  rank: number;
  label: string;
  value: string;
  detail: string;
  context?: string;
  percentage: number;
  href?: string;
};

export function RankedMetricRow({
  rank,
  label,
  value,
  detail,
  context,
  percentage,
  href,
}: RankedMetricRowProps) {
  const boundedPercentage = Math.min(Math.max(percentage, 0), 100);
  const rankLabel = rank.toString().padStart(2, "0");
  const Comp = href ? Link : "div";

  return (
    <Comp
      href={href ?? ""}
      className={cn(
        "group block rounded-lg border border-border bg-card px-4 py-4 shadow-[var(--shadow-xs)] outline-none transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-sm)] focus-visible:ring-3 focus-visible:ring-ring/35",
        href && "cursor-pointer"
      )}
    >
      <div className="grid gap-3 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {rankLabel}
        </span>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-[15px] font-semibold text-foreground">{label}</h3>
            <p className="text-sm font-semibold text-foreground">{value}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
          {context ? (
            <p className="mt-2 max-h-0 overflow-hidden text-sm text-primary opacity-0 transition-all duration-200 group-hover:max-h-8 group-hover:opacity-100 group-focus-visible:max-h-8 group-focus-visible:opacity-100">
              {context}
            </p>
          ) : null}
        </div>

        {href ? (
          <span className="hidden items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex">
            Explore
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${boundedPercentage}%` }}
          aria-hidden="true"
        />
      </div>
    </Comp>
  );
}
