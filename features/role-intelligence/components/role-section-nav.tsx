"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type RoleSectionNavItem = {
  id: string;
  label: string;
};

type RoleSectionNavProps = {
  items: RoleSectionNavItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function RoleSectionNav({ items, activeId, onChange }: RoleSectionNavProps) {
  return (
    <nav
      aria-label="Role analysis tabs"
      className="lg:sticky lg:top-5 lg:h-[calc(100svh-6rem)]"
    >
      <Link
        href="/"
        className="mb-4 hidden min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-card/35 hover:text-foreground focus-visible:ring-3 focus-visible:ring-emerald-300/30 lg:flex"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Overview
      </Link>
      <div
        role="tablist"
        aria-label="Role analysis sections"
        className="scrollbar-none flex gap-2 overflow-x-auto border-b border-border pb-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:pb-0"
      >
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`role-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls={`role-panel-${item.id}`}
            onClick={() => onChange(item.id)}
            className={`group flex min-h-11 shrink-0 items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-emerald-300/30 ${
              isActive
                ? "border-emerald-300/30 bg-emerald-300/10 text-foreground"
                : "border-transparent text-muted-foreground hover:bg-card/45 hover:text-foreground"
            }`}
          >
            <span>{item.label}</span>
            <span
              className={`hidden h-px w-5 bg-emerald-300 transition-opacity lg:block ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          </button>
          );
        })}
      </div>
    </nav>
  );
}
