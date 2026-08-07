"use client";

type SkillErrorProps = {
  reset: () => void;
};

export default function SkillError({ reset }: SkillErrorProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 lg:px-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
          Skill analysis unavailable
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          We could not load this skill analysis right now.
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The page structure is ready for API-backed data, but this request did
          not complete successfully.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:border-primary/50 focus-visible:ring-3 focus-visible:ring-ring/35"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
