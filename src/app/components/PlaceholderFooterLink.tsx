import type { ReactNode } from "react";

/** Lighthouse: 비활성 `href="#"` 링크 대신 스크린리더 친화 플레이스홀더 */
export default function PlaceholderFooterLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`cursor-default opacity-80 ${className}`}
      title="준비 중"
      aria-disabled="true"
    >
      {children}
      <span className="sr-only"> (준비 중)</span>
    </span>
  );
}
