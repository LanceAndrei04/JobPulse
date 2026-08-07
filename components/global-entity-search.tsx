"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchEntities } from "@/lib/market-analysis-data";

export function GlobalEntitySearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchEntities.slice(0, 6);
    }

    return searchEntities
      .filter((entity) => entity.name.toLowerCase().includes(normalized))
      .slice(0, 6);
  }, [query]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!isOpen || results.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    }

    if (event.key === "Enter") {
      window.location.href = results[activeIndex].href;
    }
  }

  return (
    <div
      role="combobox"
      className="relative w-full max-w-2xl"
      aria-controls="entity-search-results"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <div className="group flex h-14 items-center gap-3 rounded-xl border border-border bg-card px-4 shadow-[var(--shadow-sm)] transition-all focus-within:border-primary/70 focus-within:ring-3 focus-within:ring-ring/20 hover:border-primary/45">
        <Search className="size-5 text-muted-foreground transition-colors group-focus-within:text-primary" aria-hidden="true" />
        <input
          aria-label="Search a skill or developer role"
          aria-autocomplete="list"
          className="h-12 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground md:text-[15px]"
          placeholder="Search a skill or developer role..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        id="entity-search-results"
        role="listbox"
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+0.55rem)] z-30 overflow-hidden rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-md)] transition-all",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
        )}
      >
        {results.length > 0 ? (
          results.map((result, index) => (
            <Link
              key={`${result.type}-${result.name}`}
              href={result.href}
              role="option"
              aria-selected={activeIndex === index}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-3 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/35",
                activeIndex === index ? "bg-accent text-accent-foreground" : "hover:bg-muted"
              )}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span>
                <span className="block text-sm font-semibold text-foreground">{result.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {result.type} - {result.supportingText}
                </span>
              </span>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
            </Link>
          ))
        ) : (
          <div className="px-3 py-4 text-sm text-muted-foreground">
            No matching skill or role in the current MVP set.
          </div>
        )}
      </div>
    </div>
  );
}
