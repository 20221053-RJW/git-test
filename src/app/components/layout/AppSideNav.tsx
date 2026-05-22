import type { ReactNode } from "react";

type AppSideNavProps = {
  label: string;
  labelId: string;
  children: ReactNode;
  footer?: ReactNode;
};

/** 수업·마이페이지 등 좌측 메뉴 공통 셸 (한 가지 카드·타이포·간격) */
export default function AppSideNav({ label, labelId, children, footer }: AppSideNavProps) {
  return (
    <aside className="w-full lg:w-[220px] lg:shrink-0" data-testid="app-side-nav">
      <div className="m3-surface-card cc-side-nav-shell p-3 lg:sticky lg:top-[var(--cc-sticky-offset)] lg:p-4">
        <p className="cc-side-nav__heading" id={labelId}>
          {label}
        </p>
        <nav className="cc-side-nav__list" aria-labelledby={labelId}>
          {children}
        </nav>
        {footer ? <div className="cc-side-nav__footer">{footer}</div> : null}
      </div>
    </aside>
  );
}
