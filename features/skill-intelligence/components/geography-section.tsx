import { MapPin } from "lucide-react";
import { PercentageBar } from "./primitives/percentage-bar";
import { SectionHeader } from "./primitives/section-header";
import { formatCount, formatPercent } from "../utils/format";
import type { SkillLocationDistribution } from "../types/skill-intelligence.types";

type GeographySectionProps = {
  locations: SkillLocationDistribution[];
};

export function GeographySection({ locations }: GeographySectionProps) {
  if (locations.length === 0) {
    return null;
  }

  return (
    <section id="geography">
      <SectionHeader
        eyebrow="05"
        title="Geographic Context"
        question="Where is this skill most often observed in the current sample?"
      />

      <div className="space-y-4">
        {locations.slice(0, 5).map((location) => (
          <div key={location.name}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="flex min-w-0 items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate font-semibold text-foreground">
                  {location.name}
                </span>
              </span>
              <span className="shrink-0 text-sm text-muted-foreground">
                {formatPercent(location.share)} - {formatCount(location.matchingJobs)} postings
              </span>
            </div>
            <PercentageBar value={location.share} />
          </div>
        ))}
      </div>
    </section>
  );
}
