import Link from "next/link";
import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { getSkillHref } from "@/features/skill-intelligence/utils/entity-routes";
import { formatCategory, formatCount, formatPercent } from "@/features/skill-intelligence/utils/format";
import type { RoleSkillDistribution } from "../types/role-intelligence.types";

type RoleSkillProfileSectionProps = {
  roleName: string;
  skills: RoleSkillDistribution[];
};

export function RoleSkillProfileSection({ roleName, skills }: RoleSkillProfileSectionProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Skill Profile"
        title={`What defines ${roleName}?`}
        question="The strongest skill signals detected inside this role's matching postings."
      />
      <div className="rounded-2xl border border-border/75 bg-card/55 p-5">
        {skills.slice(0, 7).map((skill, index) => {
          const href = getSkillHref(skill.slug);
          const content = (
            <>
              <div className="grid gap-3 sm:grid-cols-[2.5rem_1fr_auto] sm:items-baseline">
                <span className="font-mono text-xs text-muted-foreground">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-foreground">{skill.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatCategory(skill.category)} · {formatCount(skill.matchingJobs)} matching postings
                  </p>
                </div>
                <p className="text-sm font-semibold text-emerald-100">
                  {formatPercent(skill.share)}
                </p>
              </div>
              <span className="mt-3 block h-2 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-emerald-300 motion-safe:animate-[skill-bar-grow_700ms_ease-out_both]"
                  style={{ width: `${Math.min(skill.share * 100, 100)}%` }}
                />
              </span>
            </>
          );

          if (!href) {
            return (
              <div key={skill.slug} className="block border-b border-border/70 py-4 last:border-0">
                {content}
              </div>
            );
          }

          return (
            <Link
              key={skill.slug}
              href={href}
              className="block border-b border-border/70 py-4 transition-colors last:border-0 hover:border-emerald-300/35"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
