import { useCallback, useEffect, useState } from "react";
import { api } from "../api/supabase-api";
import {
  isAnnouncementUnread,
  isDirectMessageThreadUnread,
  NAV_INBOX_REFRESH_EVENT,
  shouldShowAnnouncementInNavInbox,
  shouldShowDirectMessageInNavInbox,
} from "../utils/navInboxSeen";
import type { Announcement } from "../types";

const NAV_INBOX_RECENT_LIMIT = 10;

export type NavInboxItem =
  | {
      kind: "announcement";
      courseId: string;
      courseName: string;
      title: string;
      href: string;
      sortOrder: number;
      isUnread: boolean;
    }
  | {
      kind: "message";
      courseId: string;
      courseName: string;
      peerName: string;
      preview: string;
      href: string;
      lastAt: string;
      isUnread: boolean;
    };

/** 큰 값일수록 최근 — 목록 상단에 최신 항목 */
function navInboxRecency(item: NavInboxItem): number {
  if (item.kind === "message") {
    const parsed = Date.parse(item.lastAt);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return item.sortOrder;
}

export function useNavInbox(userId: string | undefined, enabled: boolean) {
  const [items, setItems] = useState<NavInboxItem[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!userId || !enabled) {
      setItems([]);
      setHasUnread(false);
      return;
    }

    setLoading(true);
    try {
      const courses = await api.courses.getAll({ status: "active" });
      const recent: NavInboxItem[] = [];

      await Promise.all(
        courses.map(async (course) => {
          const [announcements, threads] = await Promise.all([
            api.announcements.getAll(course.id).catch(() => [] as Announcement[]),
            api.directMessages.listThreads(course.id).catch(() => []),
          ]);

          for (const ann of announcements) {
            const sortOrder = ann.sortOrder ?? 0;
            if (!ann.id) continue;
            if (!shouldShowAnnouncementInNavInbox(ann.authorUserId, userId)) continue;
            const isUnread = isAnnouncementUnread(
              userId,
              course.id,
              sortOrder,
              ann.authorUserId
            );
            recent.push({
              kind: "announcement",
              courseId: course.id,
              courseName: course.name,
              title: ann.title,
              href: `/app/courses/${course.id}/announcements/${ann.id}`,
              sortOrder,
              isUnread,
            });
          }

          for (const thread of threads) {
            if (!shouldShowDirectMessageInNavInbox(thread.lastSenderUserId, userId)) continue;
            const isUnread = isDirectMessageThreadUnread(
              userId,
              course.id,
              thread.peerUserId,
              thread.lastAt,
              thread.lastSenderUserId,
              userId
            );
            recent.push({
              kind: "message",
              courseId: course.id,
              courseName: course.name,
              peerName: thread.peerName,
              preview: thread.lastMessage,
              href: `/app/courses/${course.id}/messages?peer=${encodeURIComponent(thread.peerUserId)}`,
              lastAt: thread.lastAt,
              isUnread,
            });
          }
        })
      );

      const unreadOnly = recent.filter((item) => item.isUnread);
      unreadOnly.sort((a, b) => navInboxRecency(b) - navInboxRecency(a));

      const limited = unreadOnly.slice(0, NAV_INBOX_RECENT_LIMIT);
      setItems(limited);
      setHasUnread(limited.length > 0);
    } catch {
      setItems([]);
      setHasUnread(false);
    } finally {
      setLoading(false);
    }
  }, [userId, enabled]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!enabled) return;
    const onRefresh = () => void reload();
    window.addEventListener(NAV_INBOX_REFRESH_EVENT, onRefresh);
    window.addEventListener("focus", onRefresh);
    const id = window.setInterval(onRefresh, 60_000);
    return () => {
      window.removeEventListener(NAV_INBOX_REFRESH_EVENT, onRefresh);
      window.removeEventListener("focus", onRefresh);
      window.clearInterval(id);
    };
  }, [enabled, reload]);

  return { items, hasUnread, loading, reload };
}
