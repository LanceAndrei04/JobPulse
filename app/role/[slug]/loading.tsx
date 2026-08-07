export default function RoleLoading() {
  return (
    <main className="flex-1 overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-8">
        <div className="hidden h-[calc(100svh-6.5rem)] rounded-xl bg-card/45 lg:block" />
        <section className="h-[calc(100svh-6.5rem)] min-h-[28rem] rounded-2xl border border-border/70 bg-card/35 p-6">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="mt-4 h-12 w-full max-w-lg rounded bg-muted" />
          <div className="mt-4 h-4 w-full max-w-xl rounded bg-muted" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="h-36 rounded-2xl bg-muted/70" />
            <div className="h-36 rounded-2xl bg-muted/70" />
          </div>
        </section>
      </div>
    </main>
  );
}
