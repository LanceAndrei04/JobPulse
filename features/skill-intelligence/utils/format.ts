export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function formatApproxPercent(value: number) {
  return `~${formatPercent(value)}`;
}

export function formatSalary(value: number) {
  return `$${Math.round(value / 1000)}K`;
}

export function formatCategory(value: string) {
  return value.replace("-", " ").toUpperCase();
}
