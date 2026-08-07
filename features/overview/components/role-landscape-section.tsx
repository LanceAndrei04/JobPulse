import { SectionIntro } from "./section-heading";
import { roleSegments } from "../data/overview.data";

type RoleLandscapeSectionProps = {
  segments?: typeof roleSegments;
};

export function RoleLandscapeSection({
  segments = roleSegments,
}: RoleLandscapeSectionProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <section className="overview-section">
      <div className="reveal-panel mx-auto grid w-full max-w-7xl grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] items-center gap-8 px-5 py-12 sm:px-8 lg:gap-12 lg:px-10 max-lg:grid-cols-1">
        <div className="rounded-2xl border border-border/85 bg-card p-5 shadow-[var(--shadow-md)] sm:p-7">
          <div className="flex h-12 overflow-hidden rounded-xl bg-muted">
            {segments.map((segment) => (
              <span
                key={segment.label}
                className={segment.color}
                style={{ width: `${(segment.value / total) * 100}%` }}
                title={`${segment.label}: ${segment.value}%`}
              />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {segments.map((segment) => (
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
        <SectionIntro
          id="role-landscape"
          title="Role Landscape"
          description="A proportional view of which developer roles appear most often in the dataset."
          note="Segments show role share based on grouped job titles."
        />
      </div>
    </section>
  );
}
