/** 산출물·배너 링크 — 브라우저에서 바로 열 수 있는 http(s) URL */
export function externalDeliverableHref(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function deliverableLinkLabel(item: { fileName: string; publicUrl: string }): string {
  const url = externalDeliverableHref(item.publicUrl);
  if (!url) return item.fileName;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host || item.fileName;
  } catch {
    return item.fileName || url;
  }
}
