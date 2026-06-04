import { Link } from "react-router";

import type { ReactNode } from "react";



type PageHeaderProps = {

  backTo?: string;

  backLabel?: string;

  title: string;

  subtitle?: string;

  subtitleTestId?: string;

  badge?: string;

  meta?: ReactNode;

  actions?: ReactNode;

  titleTestId?: string;

};



export default function PageHeader({

  backTo,

  backLabel = "← 뒤로가기",

  title,

  subtitle,

  subtitleTestId,

  badge,

  meta,

  actions,

  titleTestId,

}: PageHeaderProps) {

  return (
    <div className="mb-8" data-testid="page-header" role="region" aria-label={title}>

      {backTo ? (

        <Link

          to={backTo}

          className="m3-label-large mb-4 inline-flex min-h-[2.5rem] items-center text-[var(--cc-primary)] transition-colors hover:text-[var(--cc-primary-hover)]"

        >

          {backLabel}

        </Link>

      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="min-w-0">

          <h1

            className="m3-headline-medium break-words text-[var(--cc-on-surface)] antialiased"

            data-testid={titleTestId}

          >

            {title}

          </h1>

          {subtitle ? (

            <p

              className="m3-body-large mt-2 text-[var(--cc-on-surface-variant)]"

              data-testid={subtitleTestId}

            >

              {subtitle}

            </p>

          ) : null}

          {badge ? (

            <p className="m3-body-medium mt-1 text-[var(--cc-text-muted)]">{badge}</p>

          ) : null}

          {meta ? <div className="mt-3">{meta}</div> : null}

        </div>

        {actions ? (

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap">{actions}</div>

        ) : null}

      </div>

    </div>
  );

}

