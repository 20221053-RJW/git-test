import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import UserAvatar from "./UserAvatar";
import { useNavInbox, type NavInboxItem } from "../hooks/useNavInbox";

interface NavProfileInboxProps {
  userName: string;
  userImageUrl?: string;
  userId: string | undefined;
  isAuthenticated: boolean;
  onNavigate?: () => void;
  /** 모바일 드롭다운 메뉴가 열려 있을 때 인박스 목록도 표시 */
  mobileMenuOpen?: boolean;
}

function inboxItemLabel(item: NavInboxItem): string {
  if (item.kind === "announcement") {
    return `공지 · ${item.courseName}`;
  }
  return `메시지 · ${item.peerName}`;
}

function inboxItemBody(item: NavInboxItem): string {
  if (item.kind === "announcement") return item.title;
  const preview =
    item.preview.length > 48 ? `${item.preview.slice(0, 48)}…` : item.preview;
  return preview;
}

export default function NavProfileInbox({
  userName,
  userImageUrl,
  userId,
  isAuthenticated,
  onNavigate,
  mobileMenuOpen = false,
}: NavProfileInboxProps) {
  const location = useLocation();
  const { items, hasUnread, loading } = useNavInbox(userId, isAuthenticated);
  const [hoverOpen, setHoverOpen] = useState(false);
  const showList = isAuthenticated && (hoverOpen || mobileMenuOpen);

  const isMyPage = location.pathname === "/app/mypage";
  const nameClass = isMyPage
    ? "m3-top-app-bar__user-name m3-top-app-bar__user-name--active"
    : "m3-top-app-bar__user-name m3-top-app-bar__user-name--idle";

  return (
    <div
      className="cc-nav-profile-inbox-anchor"
      onMouseEnter={() => setHoverOpen(true)}
      onMouseLeave={() => setHoverOpen(false)}
      data-testid="nav-profile-inbox"
    >
      <Link
        to="/app/mypage"
        onClick={onNavigate}
        className="m3-top-app-bar__nav-link relative flex items-center justify-center gap-2 md:inline-flex"
        aria-describedby={hasUnread ? "nav-profile-unread-hint" : undefined}
      >
        <span className="relative inline-flex shrink-0">
          <UserAvatar name={userName} imageUrl={userImageUrl} size="xs" />
          {hasUnread && (
            <span
              className="cc-unread-dot cc-nav-inbox-dot absolute -right-0.5 -top-0.5 h-2.5 w-2.5 ring-2 ring-[var(--cc-footer)]"
              data-testid="nav-profile-unread-dot"
              aria-hidden
            />
          )}
        </span>
        <span className={nameClass}>{userName}</span>
      </Link>
      {hasUnread && (
        <span id="nav-profile-unread-hint" className="sr-only">
          확인하지 않은 공지 또는 메시지가 있습니다
        </span>
      )}

      {showList && (
        <div className="cc-nav-profile-inbox-popover" role="presentation">
          <div
            className="cc-nav-profile-inbox-popover__panel"
            role="menu"
            data-testid="nav-profile-inbox-dropdown"
          >
            <p className="border-b border-[var(--cc-footer-border)] px-3 py-2 text-xs font-semibold text-[var(--cc-on-footer-muted)]">
              미확인 공지·메시지
            </p>
            {loading ? (
              <p className="px-3 py-4 text-center text-sm text-[var(--cc-on-footer-muted)]">
                불러오는 중…
              </p>
            ) : items.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-[var(--cc-on-footer-muted)]">
                확인하지 않은 공지·메시지가 없습니다.
              </p>
            ) : (
              <ul className="cc-nav-profile-inbox-popover__list py-1">
                {items.map((item) => (
                  <li
                    key={`${item.kind}-${item.courseId}-${item.kind === "announcement" ? item.href : item.peerName}`}
                  >
                    <Link
                      to={item.href}
                      role="menuitem"
                      onClick={onNavigate}
                      className={`block px-3 py-2.5 text-left transition-colors hover:bg-white/10 ${
                        item.isUnread ? "bg-white/5" : ""
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--cc-on-footer-muted)]">
                        {item.isUnread && (
                          <span
                            className="cc-unread-dot h-1.5 w-1.5 shrink-0"
                            aria-hidden
                          />
                        )}
                        {inboxItemLabel(item)}
                        {item.isUnread && <span className="sr-only">(미확인)</span>}
                      </span>
                      <span
                        className={`mt-0.5 block truncate text-sm ${
                          item.isUnread ? "font-medium text-white" : "text-white/90"
                        }`}
                      >
                        {inboxItemBody(item)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/app/mypage"
              onClick={onNavigate}
              className="block border-t border-[var(--cc-footer-border)] px-3 py-2 text-center text-xs text-[var(--cc-on-footer-muted)] hover:bg-white/5"
            >
              마이페이지로 이동
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
