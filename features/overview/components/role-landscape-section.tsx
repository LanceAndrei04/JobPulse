import { SectionIntro } from "./section-heading";
import { roleSegments } from "../data/overview.data";

export function RoleLandscapeSection() {
  const total = roleSegments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
        <SectionIntro
          id="role-landscape"
          title="Role Landscape"
          description="Share of classified postings by role in one segmented view, so proportion reads at a glance."
          note="Segments represent classified posting share by title pattern."
        />
        <div className="rounded-2xl border border-border/70 bg-card/58 p-5 shadow-[var(--shadow-sm)] backdrop-blur-xl sm:p-7">
          <div className="flex h-12 overflow-hidden rounded-xl bg-muted">
            {roleSegments.map((segment) => (
              <span
                key={segment.label}
                className={segment.color}
                style={{ width: `${(segment.value / total) * 100}%` }}
                title={`${segment.label}: ${segment.value}%`}
              />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {roleSegments.map((segment) => (
              <span
                key={segment.label}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
              >
                <span className={`size-2 rounded-full ${segment.color}`} aria-hidden="true" />
                {segment.label} {segment.value}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
