import type { ReactNode } from "react";

/** Gemini-style flowing rainbow gradient (shared token) */
export const GEMINI_GRADIENT =
  "linear-gradient(90deg, #4285f4 0%, #9b72cb 22%, #d96570 44%, #f4a261 58%, #9b72cb 78%, #4285f4 100%)";

type IndicatorProps = {
  message: string;
  testId?: string;
  className?: string;
  size?: "sm" | "md";
};

/** AI 텍스트 생성 중 — 무지개 빔 + 라벨 애니메이션 */
export function AiGeneratingIndicator({
  message,
  testId,
  className = "",
  size = "md",
}: IndicatorProps) {
  return (
    <div
      className={`cc-gemini-generating cc-gemini-generating--${size} ${className}`.trim()}
      data-testid={testId}
      role="status"
      aria-live="polite"
    >
      <span className="cc-gemini-generating__beam" aria-hidden="true" />
      <span className="cc-gemini-generating__label">{message}</span>
    </div>
  );
}

type ShimmerTextProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
};

/** 생성 중 문단·문장에 무지개 그라데이션 텍스트 적용 */
export function GeminiShimmerText({ active, children, className = "" }: ShimmerTextProps) {
  if (!active) return <>{children}</>;
  return <span className={`cc-gemini-shimmer-text ${className}`.trim()}>{children}</span>;
}

type ShimmerPanelProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
};

/** AI가 채우는 카드·콜아웃 영역 배경 shimmer */
export function GeminiShimmerPanel({ active, children, className = "" }: ShimmerPanelProps) {
  return (
    <div className={[className, active ? "cc-gemini-shimmer-panel" : ""].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

/** 로딩 중 플레이스홀더 줄 (트러블슈팅 AI 추천 등) */
export function GeminiShimmerLines({
  active,
  lines = 3,
  className = "",
}: {
  active?: boolean;
  lines?: number;
  className?: string;
}) {
  if (!active) return null;
  return (
    <div className={`cc-gemini-shimmer-lines ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="cc-gemini-shimmer-lines__bar"
          style={{ width: `${Math.max(55, 92 - index * 14)}%` }}
        />
      ))}
    </div>
  );
}
