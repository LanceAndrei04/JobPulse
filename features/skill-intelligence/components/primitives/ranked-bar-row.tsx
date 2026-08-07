import Link from "next/link";
import { PercentageBar } from "./percentage-bar";

type RankedBarRowProps = {
  rank: number;
  label: string;
  value: string;
  metadata: string;
  percentage: number;
  href?: string;
};

export function RankedBarRow({
  rank,
  label,
  value,
  metadata,
  percentage,
  href,
}: RankedBarRowProps) {
  const content = (
    <>
      <div className="grid gap-3 sm:grid-cols-[2.5rem_1fr_auto] sm:items-baseline">
        <span className="font-mono text-xs text-muted-foreground">
          {rank.toString().padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-foreground">{label}</p>
          <p className="mt-1 text-sm text-muted-foreground">{metadata}</p>
        </div>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
      <PercentageBar value={percentage} className="mt-3" />
    </>
  );

  const className =
    "block border-b border-border/70 py-4 outline-none transition-colors hover:border-primary/45 focus-visible:ring-3 focus-visible:ring-ring/35";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
