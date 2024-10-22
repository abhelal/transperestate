"use client";

import React, { useState } from "react";
import { HiOutlineArchive } from "react-icons/hi";
import { LuArchiveRestore } from "react-icons/lu";
import clientApi from "@/libs/clientApi";
import ArchiveModal from "@/components/ArchiveModal";

export default function MessageHeader({ conversation }) {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const archiveConversation = async () => {
    setInProgress(true);
    await clientApi
      .put(`/messages/${conversation.conversationId}/archive`)
      .then(() => {
        window.location.href = "/message";
      })
      .catch((err) => {});
    setInProgress(false);
  };

  const unarchiveConversation = async () => {
    setInProgress(true);
    await clientApi
      .put(`/messages/${conversation.conversationId}/unarchive`)
      .then(() => {
        window.location.href = "/message";
      })
      .catch((err) => {});
    setInProgress(false);
  };

  return (
    <div className="flex w-full gap-3 items-center justify-between h-14">
      <ArchiveModal
        openModal={showArchiveModal}
        setOpenModal={setShowArchiveModal}
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
        {conversation.archived ? (
          <button onClick={unarchiveConversation} className="text-primary-500">
            <LuArchiveRestore className="inline-block w-6 h-6" />
          </button>
        ) : (
          <button onClick={archiveConversation} className="text-primary-500">
            <HiOutlineArchive className="inline-block w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
