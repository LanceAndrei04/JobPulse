type SectionHeadingProps = {
  id: string;
  title: string;
  description: string;
};

type SectionIntroProps = SectionHeadingProps & {
  note?: string;
};

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
        Overview
      </p>
      <h2
        id={id}
        className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

export function SectionIntro({ id, title, description, note }: SectionIntroProps) {
  return (
    <div>
      <SectionHeading id={id} title={title} description={description} />
      {note ? <ContextNote>{note}</ContextNote> : null}
    </div>
  );
}

export function ContextNote({ children }: { children: string }) {
  return (
    <p className="mt-5 max-w-xl rounded-xl border border-border/70 bg-background/30 p-4 text-sm leading-6 text-foreground/72 shadow-[var(--shadow-xs)] backdrop-blur">
      {children}
    </p>
  );
}
