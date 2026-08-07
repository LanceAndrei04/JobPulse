import Link from "next/link";
import { Activity } from "lucide-react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex h-10 w-full max-w-[760px] items-center justify-between px-4 pt-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-md text-xs font-semibold tracking-normal text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/45"
        >
          <Activity className="size-3.5 text-primary" aria-hidden="true" />
          <span>Developer market signals</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-md px-2 py-1 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/45 sm:block"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
