import React from "react";

const SIZE_STYLES = {
  xs: { box: "h-8 w-8", text: "text-xs" },
  sm: { box: "h-10 w-10", text: "text-sm" },
  md: { box: "h-16 w-16", text: "text-2xl" },
  lg: { box: "h-20 w-20", text: "text-3xl" },
} as const;

export type UserAvatarSize = keyof typeof SIZE_STYLES;

export type UserAvatarProps = {
  name: string;
  imageUrl?: string | null;
  size?: UserAvatarSize;
  className?: string;
  alt?: string;
};

export default function UserAvatar({
  name,
  imageUrl,
  size = "sm",
  className = "",
  alt,
}: UserAvatarProps) {
  const styles = SIZE_STYLES[size];
  const initial = (name?.trim() || "?").charAt(0);
  const label = alt ?? (name ? `${name} 프로필` : "프로필");

  if (imageUrl) {
    return (
      <div
        className={`${styles.box} shrink-0 overflow-hidden rounded-full ${className}`}
        aria-hidden={!alt}
      >
        <img src={imageUrl} alt={label} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${styles.box} flex shrink-0 items-center justify-center rounded-full bg-[var(--cc-primary)] font-bold text-[var(--cc-on-primary)] ${styles.text} ${className}`}
      aria-hidden={!alt}
    >
      {initial}
    </div>
  );
}
