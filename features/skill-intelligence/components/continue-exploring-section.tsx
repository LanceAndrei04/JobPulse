import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./primitives/section-header";
import { getRoleHref, getSkillHref } from "../utils/entity-routes";
import type { ExploreEntity } from "../types/skill-intelligence.types";

type ContinueExploringSectionProps = {
  items: ExploreEntity[];
};

export function ContinueExploringSection({ items }: ContinueExploringSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id="explore">
      <SectionHeader
        eyebrow="07"
        title="Continue Exploring"
        question="Follow the strongest related skills and roles from this analysis."
      />

      <div className="divide-y divide-border border-y border-border">
        {items.map((item) => {
          const href =
            item.type === "skill"
              ? getSkillHref(item.slug)
              : getRoleHref(item.slug);

          return (
            <ExploreRow
              key={`${item.type}-${item.slug}`}
              item={item}
              href={href}
            />
          );
        })}
      </div>
    </section>
  );
}

function ExploreRow({
  item,
  href,
}: {
  item: ExploreEntity;
  href?: string;
}) {
  const content = (
    <>
      <div>
        <p className="text-base font-semibold text-foreground">{item.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      </div>
      {item.metric ? (
        <p className="font-mono text-sm text-primary">{item.metric}</p>
      ) : null}
      {href ? (
        <ArrowRight
          className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const className =
    "group grid gap-3 py-4 outline-none transition-colors hover:bg-card/25 focus-visible:ring-3 focus-visible:ring-ring/35 sm:grid-cols-[1fr_auto_auto] sm:items-center";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
