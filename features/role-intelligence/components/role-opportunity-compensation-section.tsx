import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { formatCount, formatSalary } from "@/features/skill-intelligence/utils/format";
import type { OpportunityCompensationPoint } from "../types/role-intelligence.types";

type RoleOpportunityCompensationSectionProps = {
  roleSlug: string;
  points: OpportunityCompensationPoint[];
};

export function RoleOpportunityCompensationSection({
  roleSlug,
  points,
}: RoleOpportunityCompensationSectionProps) {
  if (points.length === 0) {
    return (
      <section>
        <SectionHeader
          eyebrow="Opportunity vs Compensation"
          title="Comparable role data is still forming"
          question="This view appears once enough adjacent role postings have both opportunity and salary signals."
        />
        <div className="rounded-2xl border border-border/75 bg-card/55 p-6 text-sm text-muted-foreground">
          Not enough comparable role data to plot this section yet.
        </div>
      </section>
    );
  }

  const maxJobs = Math.max(...points.map((point) => point.jobCount), 1);
  const salaries = points.map((point) => point.estimatedSalary);
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  return (
    <section>
      <SectionHeader
        eyebrow="Opportunity vs Compensation"
        title="Where this role sits against nearby roles"
        question="Opportunity is plotted horizontally; estimated salary is plotted vertically. The selected role is highlighted."
      />
      <div className="rounded-2xl border border-border/75 bg-card/55 p-5">
        <div className="relative h-[24rem] rounded-xl border border-border/70 bg-background/35 p-5">
          <div className="absolute inset-x-5 top-1/2 border-t border-dashed border-border" />
          <div className="absolute inset-y-5 left-1/2 border-l border-dashed border-border" />
          <p className="absolute left-5 top-4 text-xs text-muted-foreground">
            Higher salary
          </p>
          <p className="absolute bottom-4 right-5 text-xs text-muted-foreground">
            More postings
          </p>
          {points.map((point) => {
            const isSelected = point.slug === roleSlug;
            const left = `${Math.max(8, Math.min((point.jobCount / maxJobs) * 88, 92))}%`;
            const bottom = `${Math.max(
              10,
              Math.min(((point.estimatedSalary - minSalary) / (maxSalary - minSalary || 1)) * 76 + 10, 86)
            )}%`;

            return (
              <div
                key={point.slug}
                className="absolute -translate-x-1/2 translate-y-1/2"
                style={{ left, bottom }}
              >
                <div
                  className={`h-4 w-4 rounded-full border ${
                    isSelected
                      ? "border-emerald-100 bg-emerald-300 shadow-[0_0_26px_rgba(52,211,153,0.45)]"
                      : "border-border bg-slate-400"
                  }`}
                />
                <p
                  className={`mt-2 max-w-28 text-xs font-medium ${
                    isSelected ? "text-emerald-100" : "text-muted-foreground"
                  }`}
                >
                  {point.name}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {points
            .filter((point) => point.slug === roleSlug)
            .map((point) => (
              <div key={point.slug} className="rounded-xl border border-emerald-300/20 bg-emerald-300/8 p-4">
                <p className="text-sm text-muted-foreground">Selected role</p>
                <p className="mt-1 font-semibold text-foreground">
                  {formatCount(point.jobCount)} postings - {formatSalary(point.estimatedSalary)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
