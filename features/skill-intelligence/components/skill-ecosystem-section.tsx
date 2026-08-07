import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PercentageBar } from "./primitives/percentage-bar";
import { RankedBarRow } from "./primitives/ranked-bar-row";
import { SectionHeader } from "./primitives/section-header";
import { InsufficientDataState } from "./primitives/insufficient-data-state";
import { formatCount, formatPercent } from "../utils/format";
import { getSkillHref } from "../utils/entity-routes";
import type { RelatedSkill } from "../types/skill-intelligence.types";

type SkillEcosystemSectionProps = {
  skillName: string;
  relatedSkills: RelatedSkill[];
  primaryRelatedSkill: RelatedSkill | null;
};

export function SkillEcosystemSection({
  skillName,
  relatedSkills,
  primaryRelatedSkill,
}: SkillEcosystemSectionProps) {
  if (relatedSkills.length === 0) {
    return (
      <section id="ecosystem">
        <SectionHeader
          eyebrow="03"
          title="Skill Ecosystem"
          question={`What skills are most frequently detected alongside ${skillName}?`}
        />
        <InsufficientDataState description="Co-detected skill patterns are still forming for this skill." />
      </section>
    );
  }

  const compactSkills = primaryRelatedSkill
    ? relatedSkills.filter((skill) => skill.slug !== primaryRelatedSkill.slug)
    : relatedSkills;

  return (
    <section id="ecosystem">
      <SectionHeader
        eyebrow="03"
        title="Skill Ecosystem"
        question={`What skills are most frequently detected alongside ${skillName}?`}
      />

      {primaryRelatedSkill ? (
        <PrimaryAssociation
          skillName={skillName}
          skill={primaryRelatedSkill}
        />
      ) : null}

      <div className={primaryRelatedSkill ? "mt-5" : undefined}>
        {compactSkills.map((skill, index) => (
          <RankedBarRow
            key={skill.slug}
            rank={index + 1}
            label={skill.name}
            value={formatPercent(skill.share)}
            metadata={`${formatCount(skill.matchingJobs)} matching postings`}
            percentage={skill.share}
            href={getSkillHref(skill.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function PrimaryAssociation({
  skillName,
  skill,
}: {
  skillName: string;
  skill: RelatedSkill;
}) {
  const href = getSkillHref(skill.slug);
  const content = (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Strongest meaningful association
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-foreground">
            {skill.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatCount(skill.matchingJobs)} matching postings
          </p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-semibold text-foreground">
            {formatPercent(skill.share)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            of {skillName}-matching postings
          </p>
        </div>
      </div>
      <PercentageBar value={skill.share} className="mt-5 h-3" />
      {href ? (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Explore skill
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <div className="block rounded-xl border border-primary/30 bg-primary/8 p-5">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-primary/30 bg-primary/8 p-5 outline-none transition-colors hover:border-primary/60 focus-visible:ring-3 focus-visible:ring-ring/35"
    >
      {content}
    </Link>
  );
}
