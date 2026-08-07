import { MapPin } from "lucide-react";
import { SectionIntro } from "./section-heading";
import { geographicSignals } from "../data/overview.data";

export function GeographicConcentrationSection() {
  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
        <div className="min-w-0">
          <SectionIntro
            id="geographic-concentration"
            title="Geographic Concentration"
            description="Where collected postings appear most concentrated in the current dataset."
            note="Location share reflects detected posting locations in this sample."
          />
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" aria-hidden="true" />A lightweight state
            view can replace this list once the location dataset is stable.
          </p>
        </div>
        <div className="min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-card/58 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-5">
          {geographicSignals.map((item) => (
            <GeographicRow key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GeographicRow({ item }: { item: (typeof geographicSignals)[number] }) {
  return (
    <div className="rounded-xl px-2 py-3 transition-colors hover:bg-background/30">
      <div className="mb-2 flex min-w-0 items-start justify-between gap-4">
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground sm:text-base">
            {item.label}
          </span>
          <span className="mt-1 block text-xs leading-4 text-muted-foreground">
            Share of collected postings
          </span>
        </span>
        <span className="shrink-0 text-sm font-semibold text-muted-foreground">
          {item.value}
        </span>
      </div>
      <span className="block h-3 overflow-hidden rounded-full bg-muted">
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${item.percentage}%` }}
        />
      </span>
    </div>
  );
}
