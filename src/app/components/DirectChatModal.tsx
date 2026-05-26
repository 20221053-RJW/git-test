import React, { useEffect, useRef, useState } from "react";
import { api } from "../api/supabase-api";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase";
import type { ChatMessage } from "../types";
import AppModal from "./layout/AppModal";

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

type DirectChatModalProps = {
  open: boolean;
  courseId: string;
  peerUserId: string;
  peerName: string;
  onClose: () => void;
};

export default function DirectChatModal({
  open,
  courseId,
  peerUserId,
  peerName,
  onClose,
}: DirectChatModalProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reload = async () => {
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
  };

  useEffect(() => {
    if (!open) return;
    void reload();
  }, [open, courseId, peerUserId]);

  useEffect(() => {
    if (!open || !courseId || !peerUserId || !user?.id) return;

    const currentUserId = user.id;
    const currentUserName = user.name ?? "나";

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
      .subscribe((status, err) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.warn("1:1 채팅 Realtime:", status, err);
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [open, courseId, peerUserId, peerName, user?.id, user?.name]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
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

  return (
    <AppModal
      open={open}
      onClose={onClose}
      testId="direct-chat-modal-overlay"
      ariaLabel={`${peerName}님과 1:1 채팅`}
      panelClassName="!p-0 flex max-w-[520px] w-full flex-col overflow-hidden rounded-[14px] shadow-2xl !max-h-[min(640px,88vh)]"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">1:1 채팅</h2>
          <p className="text-xs text-gray-500">{peerName}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          aria-label="채팅 닫기"
        >
          닫기
        </button>
      </div>

      <div
        ref={scrollRef}
        className="min-h-[240px] flex-1 overflow-y-auto bg-gray-50 px-4 py-3"
        data-testid="direct-chat-messages"
      >
        {loading && <p className="text-center text-sm text-gray-500">불러오는 중…</p>}
        {!loading && messages.length === 0 && (
          <p className="text-center text-sm text-gray-500">대화를 시작해 보세요.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                msg.isMine ? "bg-[#155dfc] text-white" : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`mt-1 text-[10px] ${msg.isMine ? "text-blue-100" : "text-gray-400"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">{error}</p>
      )}

      <div className="flex gap-2 border-t border-gray-200 bg-white px-4 py-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void handleSend();
            }
          }}
          placeholder="메시지 입력"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          data-testid="direct-chat-input"
        />
        <button
          type="button"
          disabled={sending || !draft.trim()}
          onClick={() => void handleSend()}
          className="rounded-lg bg-[#155dfc] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          data-testid="direct-chat-send"
        >
          {sending ? "전송…" : "전송"}
        </button>
      </div>
    </AppModal>
  );
}
