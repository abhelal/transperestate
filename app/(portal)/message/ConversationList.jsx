"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import socket from "@/libs/socket";
import clientApi from "@/libs/clientApi";

export default function ConversationList({ conversations }) {
  const router = useRouter();
  const [showingArchive, setShowingArchive] = useState(false);
  const [latestConversations, setLatestConversations] = useState(conversations);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setLatestConversations((prev) => {
        const index = prev.findIndex((conversation) => conversation.conversationId === message.conversationId);
        if (index === -1) return prev;
        prev[index].messages.unshift(message);
        return [...prev];
      });
    });
  }, []);

  const getConversations = async () => {
    await clientApi
      .get("/messages")
      .then((res) => {
        setShowingArchive(false);
        setLatestConversations(res.data.conversations || []);
        router.push("/message");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getArchiveConversations = async () => {
    await clientApi
      .get("/messages/archived")
      .then((res) => {
        setShowingArchive(true);
        setLatestConversations(res.data.conversations || []);
        router.push("/message");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // short conversation base on last message updated at time
  latestConversations.sort((a, b) => {
    return new Date(b.messages[0]?.updatedAt) - new Date(a.messages[0]?.updatedAt);
  });

  return (
    <>
      <div className="flex items-center justify-between border-b h-14 px-5">
        <div className="flex items-center gap-4">
          <button onClick={getConversations} className={showingArchive ? "" : "text-primary-500 font-semibold"}>
            Inbox
          </button>
        </div>
        <button onClick={getArchiveConversations} className={showingArchive ? "text-primary-500 font-semibold" : ""}>
          Archived
        </button>
      </div>
      <div className="h-0 grow overflow-y-auto">
        {latestConversations.map((conversation, i) => (
          <button
            key={i}
            className="w-full border-b p-4 hover:bg-gray-100 hover:shadow-inner transition duration-400 ease-in-out"
            onClick={() => {
              router.push(`/message/${conversation.conversationId}`);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex w-full gap-3">
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-green-200 text-green-500 font-bold">
                  {conversation?.other?.name?.charAt(0)}
                </div>
                <div className="text-start">
                  <p className="font-semibold text-sm max-w-[165px] truncate">{conversation?.other?.name}</p>
                  <p className={`text-xs text-secondary-400 max-w-[160px] truncate`}>{conversation?.messages[0]?.text || "No message"}</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-secondary-400 text-end">
              {moment(conversation.messages[0]?.updatedAt || conversation?.updatedAt).calendar(null, {
                sameDay: "[Today] LT",
                lastDay: "[Yesterday] LT",
                lastWeek: "DD MMM YYYY LT",
                sameElse: "DD MMM YYYY LT",
              })}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
