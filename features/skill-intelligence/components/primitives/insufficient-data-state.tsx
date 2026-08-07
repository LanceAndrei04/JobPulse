type InsufficientDataStateProps = {
  title?: string;
  description?: string;
};

export function InsufficientDataState({
  title = "Not enough data yet",
  description = "This section needs more matching postings before the signal is reliable enough to show.",
}: InsufficientDataStateProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/72 p-6 shadow-[var(--shadow-sm)]">
      <div className="absolute right-6 top-6 flex gap-2" aria-hidden="true">
        <span className="data-dot h-2.5 w-2.5 rounded-full bg-primary/80" />
        <span className="data-dot h-2.5 w-2.5 rounded-full bg-primary/55 [animation-delay:180ms]" />
        <span className="data-dot h-2.5 w-2.5 rounded-full bg-primary/35 [animation-delay:360ms]" />
      </div>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
        Signal forming
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-6 space-y-3" aria-hidden="true">
        <div className="h-2 w-3/4 overflow-hidden rounded-full bg-muted">
          <div className="data-scan h-full w-1/3 rounded-full bg-primary/55" />
        </div>
        <div className="h-2 w-1/2 overflow-hidden rounded-full bg-muted">
          <div className="data-scan h-full w-1/2 rounded-full bg-primary/35 [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
}
