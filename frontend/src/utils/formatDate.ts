const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' });

/** "2026-03-14T..." -> "March 2026". Returns undefined for missing/invalid dates. */
export function formatMonthYear(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : formatter.format(date);
}
