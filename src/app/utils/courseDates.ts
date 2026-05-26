/** YYYY-MM-DD → 표시용 */
export function formatCourseDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${y}.${m}.${d}` : iso;
}

export function formatCoursePeriod(start?: string, end?: string): string | null {
  if (!start && !end) return null;
  if (start && end) return `${formatCourseDateLabel(start)} ~ ${formatCourseDateLabel(end)}`;
  if (start) return formatCourseDateLabel(start);
  if (end) return formatCourseDateLabel(end);
  return null;
}

export function defaultNewCourseDates(): { startDate: string; endDate: string } {
  const start = new Date();
  const end = new Date(start);
  end.setMonth(end.getMonth() + 4);
  const toIso = (d: Date) => d.toISOString().slice(0, 10);
  return { startDate: toIso(start), endDate: toIso(end) };
}
