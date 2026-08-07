import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { formatCount, formatPercent } from "@/features/skill-intelligence/utils/format";
import type { RoleLocationDistribution } from "../types/role-intelligence.types";

type RoleGeographySectionProps = {
  locations: RoleLocationDistribution[];
};

export function RoleGeographySection({ locations }: RoleGeographySectionProps) {
  if (locations.length === 0) {
    return (
      <section>
        <SectionHeader
          eyebrow="Geographic Context"
          title="Location signal is still forming"
          question="This view appears when role postings include enough location data."
        />
        <div className="rounded-2xl border border-border/75 bg-card/55 p-6 text-sm text-muted-foreground">
          Not enough location data to compare this role yet.
        </div>
      </section>
    );
  }

  const maxShare = Math.max(...locations.map((location) => location.share), 1);

  return (
    <section>
      <SectionHeader
        eyebrow="Geographic Context"
        title="Where postings concentrate"
        question="A compact location signal for understanding whether this role is broad or market-clustered."
      />
      <div className="rounded-2xl border border-border/75 bg-card/55 p-5">
        {locations.map((location) => (
          <div key={location.name} className="border-b border-border/70 py-4 last:border-0">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{location.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCount(location.matchingJobs)} matching postings
                </p>
              </div>
              <p className="text-sm font-semibold text-emerald-100">
                {formatPercent(location.share)}
              </p>
            </div>
            <span className="mt-3 block h-2 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-emerald-300 motion-safe:animate-[skill-bar-grow_700ms_ease-out_both]"
                style={{ width: `${Math.min((location.share / maxShare) * 100, 100)}%` }}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
