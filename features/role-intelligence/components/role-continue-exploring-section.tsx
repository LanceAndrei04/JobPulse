import Link from "next/link";
import { SectionHeader } from "@/features/skill-intelligence/components/primitives/section-header";
import { getRoleHref, getSkillHref } from "@/features/skill-intelligence/utils/entity-routes";
import type { RoleExploreEntity } from "../types/role-intelligence.types";

type RoleContinueExploringSectionProps = {
  items: RoleExploreEntity[];
};

export function RoleContinueExploringSection({ items }: RoleContinueExploringSectionProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Continue Exploring"
        title="Follow the role signal"
        question="Move from this role into its strongest skills or adjacent role markets."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const href = item.type === "skill" ? getSkillHref(item.slug) : getRoleHref(item.slug);
          const content = (
            <>
              <p className="font-mono text-xs font-semibold uppercase text-emerald-200">
                {item.type}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              {item.metric ? (
                <p className="mt-4 text-sm font-semibold text-emerald-100">{item.metric}</p>
              ) : null}
            </>
          );

          if (!href) {
            return (
              <article key={`${item.type}-${item.slug}`} className="rounded-2xl border border-border/75 bg-card/55 p-5">
                {content}
              </article>
            );
          }

          return (
            <Link
              key={`${item.type}-${item.slug}`}
              href={href}
              className="rounded-2xl border border-border/75 bg-card/55 p-5 transition-colors hover:border-emerald-300/35"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
