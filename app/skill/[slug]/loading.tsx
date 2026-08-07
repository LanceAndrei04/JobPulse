export default function SkillLoading() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="h-5 w-28 rounded bg-muted" />
        <div className="mt-12 h-16 w-64 rounded bg-muted" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="h-24 rounded-xl bg-card/60" />
          <div className="h-24 rounded-xl bg-card/60" />
        </div>
        <div className="mt-12 space-y-4">
          <div className="h-5 w-44 rounded bg-muted" />
          <div className="h-3 rounded bg-muted" />
          <div className="h-3 w-10/12 rounded bg-muted" />
          <div className="h-3 w-8/12 rounded bg-muted" />
        </div>
      </div>
    </main>
  );
}
