import React from "react";
import { Link, type LinkProps } from "react-router";
import type { LucideIcon } from "lucide-react";

type SideNavItemBaseProps = {
  icon?: LucideIcon;
  children: React.ReactNode;
  active?: boolean;
  attention?: boolean;
  disabled?: boolean;
  sub?: boolean;
  className?: string;
};

type SideNavItemLinkProps = SideNavItemBaseProps &
  LinkProps & {
    as?: "link";
  };

type SideNavItemButtonProps = SideNavItemBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as: "button";
  };

export type SideNavItemProps = SideNavItemLinkProps | SideNavItemButtonProps;

function navClassName({
  active,
  attention,
  disabled,
  sub,
  className = "",
}: Pick<SideNavItemBaseProps, "active" | "attention" | "disabled" | "sub" | "className">) {
  return [
    "m3-nav-item",
    sub ? "m3-nav-item--sub" : "",
    active ? "m3-nav-item--active" : "",
    attention ? "m3-nav-item--attention" : "",
    disabled ? "cursor-not-allowed opacity-40" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function NavContent({
  icon: Icon,
  children,
  sub,
}: Pick<SideNavItemBaseProps, "icon" | "children" | "sub">) {
  return (
    <>
      {Icon ? (
        <span className="m3-nav-item__icon" aria-hidden>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      ) : sub ? (
        <span className="m3-nav-item__bullet" aria-hidden />
      ) : null}
      <span className="m3-nav-item__label">{children}</span>
    </>
  );
}

export default function SideNavItem(props: SideNavItemProps) {
  const { icon, children, active, attention, disabled, sub, className, ...rest } = props;
  const classes = navClassName({ active, attention, disabled, sub, className });

  if (props.as === "button") {
    const { as: _as, ...buttonRest } = rest as SideNavItemButtonProps;
    return (
      <button
        type="button"
        disabled={disabled}
        className={classes}
        {...buttonRest}
      >
        <NavContent icon={icon} sub={sub}>
          {children}
        </NavContent>
      </button>
    );
  }

  const { as: _as, ...linkRest } = rest as SideNavItemLinkProps;
  return (
    <Link
      className={classes}
      aria-disabled={disabled || undefined}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        linkRest.onClick?.(e);
      }}
      {...linkRest}
    >
      <NavContent icon={icon} sub={sub}>
        {children}
      </NavContent>
    </Link>
  );
}
