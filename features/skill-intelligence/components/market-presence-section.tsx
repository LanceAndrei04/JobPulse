import { MetricValue } from "./primitives/metric-value";
import { PercentageBar } from "./primitives/percentage-bar";
import { SectionHeader } from "./primitives/section-header";
import { formatCount, formatPercent } from "../utils/format";

type MarketPresenceSectionProps = {
  skillName: string;
  matchingJobs: number;
  datasetShare: number;
  totalJobs?: number;
};

export function MarketPresenceSection({
  skillName,
  matchingJobs,
  datasetShare,
  totalJobs,
}: MarketPresenceSectionProps) {
  return (
    <section id="presence" className="scroll-mt-28 border-b border-border py-14">
      <SectionHeader
        eyebrow="01"
        title="Market Presence"
        question={`How prevalent does ${skillName} appear in the current dataset?`}
      />

      <div className="grid gap-8 sm:grid-cols-[16rem_1fr] sm:items-end">
        <MetricValue
          label="Detected postings"
          value={formatCount(matchingJobs)}
          detail={totalJobs ? `out of ${formatCount(totalJobs)} collected postings` : undefined}
        />
        <div>
          <div className="mb-3 flex items-end justify-between gap-4">
            <p className="text-5xl font-semibold leading-none text-foreground">
              {formatPercent(datasetShare)}
            </p>
            <p className="max-w-40 text-right text-sm leading-5 text-muted-foreground">
              of collected postings
            </p>
          </div>
          <PercentageBar value={datasetShare} className="h-4" />
        </div>
      </div>
    </section>
  );
}
