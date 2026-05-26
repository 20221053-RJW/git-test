import React from "react";
import { useAuth } from "../contexts/AuthContext";
import DirectChatPanel from "./DirectChatPanel";
import AppModal from "./layout/AppModal";

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
      <DirectChatPanel
        courseId={courseId}
        peerUserId={peerUserId}
        peerName={peerName}
        currentUserId={user?.id}
        currentUserName={user?.name ?? "나"}
        enabled={open}
        className="min-h-[320px]"
      />
    </AppModal>
  );
}
