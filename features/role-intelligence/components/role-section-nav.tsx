"use client";

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
      aria-label="Role analysis sections"
      className="scrollbar-none flex gap-2 overflow-x-auto pb-2 lg:h-[calc(100svh-6.5rem)] lg:min-h-[28rem] lg:flex-col lg:overflow-visible lg:pb-0"
    >
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <button
            key={item.id}
            id={`role-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`role-panel-${item.id}`}
            onClick={() => onChange(item.id)}
            className={`min-w-max rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-300/30 lg:min-w-0 ${
              isActive
                ? "border-emerald-300/45 bg-emerald-300/12 text-emerald-100 shadow-[0_0_26px_rgba(52,211,153,0.12)]"
                : "border-border/70 bg-card/35 text-muted-foreground hover:border-emerald-300/30 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
