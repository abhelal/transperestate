"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/libs/hooks";
import { HiOutlineArchive } from "react-icons/hi";
import clientApi from "@/libs/clientApi";
import ArchiveModal from "@/components/ArchiveModal";
import { useRouter } from "next/navigation";

export default function MessageHeader({ conversation }) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const archiveConversation = async () => {
    setInProgress(true);
    await clientApi
      .put(`/messages/${conversationId}/archive`)
      .then(() => {
        router.push("/message");
      })
      .catch((err) => {});
    setInProgress(false);
  };

  return (
    <div className="flex w-full gap-3 items-center justify-between h-14">
      <ArchiveModal
        openModal={showDeleteModal}
        setOpenModal={setShowDeleteModal}
        handleArchive={archiveConversation}
        isArchiving={inProgress}
      />
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-green-200 text-green-500 font-semibold shrink-0">
          {conversation.other.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm truncate">{conversation.other.name}</p>
        </div>
      </div>
      <div>
        <button onClick={() => setShowDeleteModal(true)}>
          <HiOutlineArchive className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
