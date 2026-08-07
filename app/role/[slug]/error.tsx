"use client";

type RoleErrorProps = {
  reset: () => void;
};

export default function RoleError({ reset }: RoleErrorProps) {
  return (
    <main className="flex-1 px-4 py-10">
      <section className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 text-center">
        <p className="font-mono text-xs font-semibold uppercase text-emerald-200">
          Role Intelligence
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">
          This role view could not load.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Try refreshing the role analysis screen.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-950"
        >
          Retry
        </button>
      </section>
    </main>
  );
}
