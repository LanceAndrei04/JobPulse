"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchEntityDto } from "@/types/intelligence";

export function GlobalEntitySearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<SearchEntityDto[]>([]);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query,
          limit: "6",
        });
        const response = await fetch(`/api/search?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          setResults([]);
          return;
        }

        const payload = (await response.json()) as { data: SearchEntityDto[] };
        setResults(payload.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Search failed:", error);
          setResults([]);
        }
      }
    }, 140);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
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
      onBlur={() => {
        blurTimer.current = setTimeout(() => setIsOpen(false), 120);
      }}
      onFocus={() => {
        if (blurTimer.current) {
          clearTimeout(blurTimer.current);
        }
      }}
    >
      <div className="group flex h-14 items-center gap-3 rounded-xl bg-card px-4 shadow-[var(--shadow-sm)] transition-all focus-within:ring-3 focus-within:ring-ring/20 hover:bg-card/90">
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
          "absolute left-0 right-0 top-[calc(100%+0.55rem)] z-50 overflow-hidden rounded-xl border border-border/80 bg-popover/98 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all",
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
                activeIndex === index
                  ? "bg-muted text-foreground"
                  : "hover:bg-muted/70"
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-semibold text-foreground">{result.name}</span>
                <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {result.type}
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
