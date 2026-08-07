import Link from "next/link";
import { Activity } from "lucide-react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-5 pt-3 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-md font-heading text-sm font-semibold tracking-normal text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/45"
        >
          <Activity className="size-3.5 text-primary" aria-hidden="true" />
          <span>JobPulse</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-md px-2.5 py-1.5 font-heading text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/45 sm:block"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
