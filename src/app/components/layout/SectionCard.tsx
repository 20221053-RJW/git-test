import type { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  testId?: string;
  elevated?: boolean;
};

export default function SectionCard({
  title,
  description,
  children,
  className = "",
  testId,
  elevated = false,
}: SectionCardProps) {
  const surfaceClass = elevated ? "m3-surface-card--elevated" : "m3-surface-card";

  return (
    <section
      className={`${surfaceClass} p-5 sm:p-6 ${className}`}
      data-testid={testId}
    >
      {title ? (
        <div className="mb-4 border-b border-[var(--cc-outline-variant)] pb-3">
          <h2 className="m3-title-large text-[var(--cc-on-surface)]">{title}</h2>
          {description ? (
            <p className="m3-body-medium mt-1 text-[var(--cc-on-surface-variant)]">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
