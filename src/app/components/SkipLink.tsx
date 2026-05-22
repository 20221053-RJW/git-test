export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--m3-shape-medium)] focus:bg-[var(--cc-primary)] focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-[var(--cc-on-primary)] focus:shadow-[var(--m3-elevation-2)]"
    >
      본문으로 건너뛰기
    </a>
  );
}
