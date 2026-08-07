import Link from "next/link";
import { Activity } from "lucide-react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/90 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md text-sm font-semibold tracking-normal text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/45"
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-border bg-card shadow-[var(--shadow-xs)] transition-transform group-hover:scale-[1.01]">
            <Activity className="size-4 text-primary" aria-hidden="true" />
          </span>
          <span className="text-[15px]">JobPulse</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/45"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
