import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InsufficientDataState } from "./primitives/insufficient-data-state";

type SkillUnavailablePageProps = {
  slug: string;
};

export function SkillUnavailablePage({ slug }: SkillUnavailablePageProps) {
  const name = titleize(slug);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-card/35 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/35"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Overview
        </Link>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
          Skill Intelligence
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
          {name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          JobPulse knows this skill, but the current dataset does not have enough structured
          signal to build a reliable intelligence page yet.
        </p>
        <div className="mt-8">
          <InsufficientDataState
            title="Not enough signal yet"
            description="Try a broader skill such as React, AWS, Python, or TypeScript while more postings are collected and classified."
          />
        </div>
      </div>
    </main>
  );
}

function titleize(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
