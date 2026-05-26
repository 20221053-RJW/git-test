import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api/supabase-api";
import { supabase } from "../supabase";
import type { ChatMessage } from "../types";

function mapDirectMessageRow(
  row: { id: string; sender_user_id: string; text: string; created_at: string },
  currentUserId: string,
  currentUserName: string,
  peerName: string
): ChatMessage {
  const created = new Date(row.created_at);
  const displayTime = `${created.getHours().toString().padStart(2, "0")}:${created
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const isMine = row.sender_user_id === currentUserId;
  return {
    id: row.id,
    sender: isMine ? currentUserName : peerName,
    text: row.text,
    time: displayTime,
    isMine,
    isAnon: false,
  };
}

export function useDirectChat(
  courseId: string,
  peerUserId: string,
  peerName: string,
  currentUserId: string | undefined,
  currentUserName: string,
  enabled: boolean
) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!courseId || !peerUserId) return;
    setLoading(true);
    setError(null);
    try {
      const rows = await api.directMessages.getThread(courseId, peerUserId);
      setMessages(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "메시지를 불러오지 못했습니다.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, peerUserId]);

  useEffect(() => {
    if (!enabled || !courseId || !peerUserId) return;
    void reload();
    void api.directMessages.warmSendContext(courseId, peerUserId).catch((err) => {
      console.warn("[direct-chat] warmSendContext:", err);
    });
  }, [enabled, courseId, peerUserId, reload]);

  useEffect(() => {
    if (!enabled || !courseId || !peerUserId || !currentUserId) return;

    const channel = supabase
      .channel(`direct-chat-${courseId}-${currentUserId}-${peerUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_direct_messages",
          filter: `course_id=eq.${courseId}`,
        },
        (payload) => {
          const row = payload.new as {
            id: string;
            sender_user_id: string;
            recipient_user_id: string;
            text: string;
            created_at: string;
          };
          const inThread =
            (row.sender_user_id === currentUserId && row.recipient_user_id === peerUserId) ||
            (row.sender_user_id === peerUserId && row.recipient_user_id === currentUserId);
          if (!inThread) return;

          const mapped = mapDirectMessageRow(row, currentUserId, currentUserName, peerName);
          setMessages((prev) => {
            if (prev.some((msg) => msg.id === mapped.id)) return prev;
            return [...prev, mapped];
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled, courseId, peerUserId, peerName, currentUserId, currentUserName]);

  const send = async () => {
    if (!draft.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const sent = await api.directMessages.send(courseId, peerUserId, draft);
      setMessages((prev) => [...prev, sent]);
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "전송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  };

  return {
    messages,
    draft,
    setDraft,
    loading,
    sending,
    error,
    reload,
    send,
  };
}

export { mapDirectMessageRow };
