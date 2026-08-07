type PercentageBarProps = {
  value: number;
  className?: string;
};

export function PercentageBar({ value, className = "" }: PercentageBarProps) {
  const width = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <span
      className={`block h-2 overflow-hidden rounded-full bg-muted ${className}`}
      aria-hidden="true"
    >
      <span
        className="block h-full rounded-full bg-primary motion-safe:animate-[skill-bar-grow_700ms_ease-out_both]"
        style={{ width: `${width}%` }}
      />
    </span>
  );
}
