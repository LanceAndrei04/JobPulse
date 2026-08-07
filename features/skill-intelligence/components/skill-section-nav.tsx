"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type SectionNavItem = {
  id: string;
  label: string;
};

type SkillSectionNavProps = {
  items: SectionNavItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function SkillSectionNav({
  items,
  activeId,
  onChange,
}: SkillSectionNavProps) {
  return (
    <nav
      aria-label="Skill analysis tabs"
      className="lg:sticky lg:top-5 lg:h-[calc(100svh-6rem)]"
    >
      <Link
        href="/"
        className="mb-4 hidden min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-card/35 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/35 lg:flex"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Overview
      </Link>
      <div
        role="tablist"
        aria-label="Skill analysis sections"
        className="scrollbar-none flex gap-2 overflow-x-auto border-b border-border pb-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:pb-0"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`skill-tab-${item.id}`}
            aria-controls={`skill-panel-${item.id}`}
            aria-selected={activeId === item.id}
            onClick={() => onChange(item.id)}
            className={`group flex min-h-11 shrink-0 items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/35 ${
              activeId === item.id
                ? "border-primary/30 bg-primary/10 text-foreground"
                : "border-transparent text-muted-foreground hover:bg-card/45 hover:text-foreground"
            }`}
          >
            <span>{item.label}</span>
            <span
              className={`hidden h-px w-5 bg-primary transition-opacity lg:block ${
                activeId === item.id ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </nav>
  );
}
