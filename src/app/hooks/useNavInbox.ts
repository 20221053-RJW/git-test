import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api/supabase-api";
import { supabase } from "../supabase";
import {
  isAnnouncementUnread,
  isDirectMessageThreadUnread,
  NAV_INBOX_REFRESH_EVENT,
  shouldShowAnnouncementInNavInbox,
  shouldShowDirectMessageInNavInbox,
  sameNavInboxUserId,
} from "../utils/navInboxSeen";

const NAV_INBOX_RECENT_LIMIT = 10;
const NAV_INBOX_RELOAD_DEBOUNCE_MS = 400;

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

function snapshotToNavItems(
  snapshot: Awaited<ReturnType<typeof api.navInbox.getSnapshot>>,
  userId: string
): NavInboxItem[] {
  const recent: NavInboxItem[] = [];

  for (const ann of snapshot.announcements) {
    if (!ann.id) continue;
    if (!shouldShowAnnouncementInNavInbox(ann.authorUserId, userId)) continue;
    const isUnread = isAnnouncementUnread(
      userId,
      ann.courseId,
      ann.sortOrder,
      ann.authorUserId
    );
    recent.push({
      kind: "announcement",
      courseId: ann.courseId,
      courseName: ann.courseName,
      title: ann.title,
      href: `/app/courses/${ann.courseId}/announcements/${ann.id}`,
      sortOrder: ann.sortOrder,
      isUnread,
    });
  }

  for (const thread of snapshot.directMessages) {
    if (!shouldShowDirectMessageInNavInbox(thread.lastSenderUserId, userId)) continue;
    const isUnread = isDirectMessageThreadUnread(
      userId,
      thread.courseId,
      thread.peerUserId,
      thread.lastAt,
      thread.lastSenderUserId,
      userId
    );
    recent.push({
      kind: "message",
      courseId: thread.courseId,
      courseName: thread.courseName,
      peerName: thread.peerName,
      preview: thread.preview,
      href: `/app/courses/${thread.courseId}/messages?peer=${encodeURIComponent(thread.peerUserId)}`,
      lastAt: thread.lastAt,
      isUnread,
    });
  }

  const unreadOnly = recent.filter((item) => item.isUnread);
  unreadOnly.sort((a, b) => navInboxRecency(b) - navInboxRecency(a));
  return unreadOnly.slice(0, NAV_INBOX_RECENT_LIMIT);
}

type DirectMessageInsertRow = {
  course_id: string;
  sender_user_id: string;
  recipient_user_id: string;
  text: string;
  created_at: string;
};

export function useNavInbox(userId: string | undefined, enabled: boolean) {
  const [items, setItems] = useState<NavInboxItem[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [loading, setLoading] = useState(false);
  const reloadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  const reloadInFlightRef = useRef(false);

  const applyItems = useCallback((next: NavInboxItem[], silent = false) => {
    setItems(next);
    if (silent) {
      setHasUnread((prev) => next.length > 0 || prev);
    } else {
      setHasUnread(next.length > 0);
    }
  }, []);

  const reload = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!userId || !enabled) {
        applyItems([], false);
        return;
      }

      if (reloadInFlightRef.current) return;
      reloadInFlightRef.current = true;

      const silent = options?.silent ?? false;
      if (!silent) setLoading(true);
      try {
        const snapshot = await api.navInbox.getSnapshot();
        applyItems(snapshotToNavItems(snapshot, userId), silent);
      } catch {
        if (!silent) applyItems([], false);
      } finally {
        reloadInFlightRef.current = false;
        if (!silent) setLoading(false);
      }
    },
    [userId, enabled, applyItems]
  );

  const scheduleReload = useCallback(
    (silent = true) => {
      if (reloadTimerRef.current) clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = setTimeout(() => {
        void reload({ silent });
      }, NAV_INBOX_RELOAD_DEBOUNCE_MS);
    },
    [reload]
  );

  const onIncomingDirectMessage = useCallback(
    (row: DirectMessageInsertRow) => {
      if (!userId || !enabled) return;
      if (!sameNavInboxUserId(row.recipient_user_id, userId)) return;
      if (sameNavInboxUserId(row.sender_user_id, userId)) return;

      setHasUnread(true);
      scheduleReload(true);
      window.setTimeout(() => scheduleReload(true), 1500);
    },
    [userId, enabled, scheduleReload]
  );

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (!enabled) return;
    const onRefresh = () => scheduleReload(false);
    window.addEventListener(NAV_INBOX_REFRESH_EVENT, onRefresh);
    window.addEventListener("focus", onRefresh);
    const id = window.setInterval(onRefresh, 60_000);
    return () => {
      window.removeEventListener(NAV_INBOX_REFRESH_EVENT, onRefresh);
      window.removeEventListener("focus", onRefresh);
      window.clearInterval(id);
    };
  }, [enabled, scheduleReload]);

  useEffect(() => {
    if (!userId || !enabled) return;

    const channel = supabase
      .channel(`nav-inbox-live-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_direct_messages",
        },
        (payload) => {
          onIncomingDirectMessage(payload.new as DirectMessageInsertRow);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_announcements",
        },
        () => {
          setHasUnread(true);
          scheduleReload(true);
        }
      )
      .subscribe((status, err) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.warn(`Realtime nav-inbox-live-${userId}:`, status, err);
        }
      });

    return () => {
      if (reloadTimerRef.current) clearTimeout(reloadTimerRef.current);
      void supabase.removeChannel(channel);
    };
  }, [userId, enabled, onIncomingDirectMessage, scheduleReload]);

  return { items, hasUnread, loading, reload };
}
