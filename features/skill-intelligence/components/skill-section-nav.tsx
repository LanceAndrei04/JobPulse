"use client";

import { useEffect, useState } from "react";

type SectionNavItem = {
  id: string;
  label: string;
};

type SkillSectionNavProps = {
  items: SectionNavItem[];
};

export function SkillSectionNav({ items }: SkillSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Skill intelligence sections"
      className="sticky top-0 z-20 border-y border-border/70 bg-background/88 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-5xl gap-6 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="relative shrink-0 rounded-sm py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/35"
            aria-current={activeId === item.id ? "true" : undefined}
          >
            <span className={activeId === item.id ? "text-foreground" : undefined}>
              {item.label}
            </span>
            <span
              className={`absolute inset-x-0 -bottom-3 h-px bg-primary transition-opacity ${
                activeId === item.id ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
