import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { formatCategory, formatPercent } from "@/features/skill-intelligence/utils/format";
import type { RoleSkillCategoryDistribution } from "../types/role-intelligence.types";

type RoleTechnologyPatternSectionProps = {
  roleName: string;
  groups: RoleSkillCategoryDistribution[];
};

export function RoleTechnologyPatternSection({
  roleName,
  groups,
}: RoleTechnologyPatternSectionProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Technology Pattern"
        title={`${roleName} has a layered skill mix`}
        question="Grouped by skill type so users can see whether the role leans language, cloud, platform, database, or framework."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.category}
            className="rounded-2xl border border-border/75 bg-card/55 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold text-emerald-200">
                  {formatCategory(group.category)}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {group.uniqueSkills} detected skills
                </h3>
              </div>
              {typeof group.share === "number" ? (
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-100">
                  {formatPercent(group.share)}
                </span>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.topSkills.map((skill) => (
                <span
                  key={skill.slug}
                  className="rounded-full border border-border/80 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
