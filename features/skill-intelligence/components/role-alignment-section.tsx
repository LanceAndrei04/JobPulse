import { RankedBarRow } from "./primitives/ranked-bar-row";
import { SectionHeader } from "./primitives/section-header";
import { formatCount, formatPercent } from "../utils/format";
import { getRoleHref } from "../utils/entity-routes";
import type {
  SkillInsight,
  SkillRoleDistribution,
} from "../types/skill-intelligence.types";

type RoleAlignmentSectionProps = {
  skillName: string;
  roles: SkillRoleDistribution[];
  insight: SkillInsight | null;
};

export function RoleAlignmentSection({
  skillName,
  roles,
  insight,
}: RoleAlignmentSectionProps) {
  if (roles.length === 0) {
    return null;
  }

  return (
    <section id="roles">
      <SectionHeader
        eyebrow="02"
        title={`Where ${skillName} Appears`}
        question="Which classified roles contain this skill most frequently?"
      />

      <div>
        {roles.map((role, index) => (
          <RankedBarRow
            key={role.slug}
            rank={index + 1}
            label={role.name}
            value={formatPercent(role.share)}
            metadata={`${formatCount(role.matchingJobs)} matching postings`}
            percentage={role.share}
            href={getRoleHref(role.slug)}
          />
        ))}
      </div>

      {insight?.type === "role_concentration" ? (
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
          {insight.roleNames.join(" and ")} account for approximately{" "}
          {formatPercent(insight.combinedShare)} of matching postings in this
          sample.
        </p>
      ) : null}
    </section>
  );
}
