type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  question: string;
};

export function SectionHeader({ eyebrow, title, question }: SectionHeaderProps) {
  return (
    <header className="mb-7">
      <p className="font-mono text-xs font-medium text-primary/80">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        {question}
      </p>
    </header>
  );
}
