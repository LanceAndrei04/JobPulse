type MetricValueProps = {
  label: string;
  value: string;
  detail?: string;
};

export function MetricValue({ label, value, detail }: MetricValueProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold leading-none text-foreground sm:text-4xl">
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
      ) : null}
    </div>
  );
}
