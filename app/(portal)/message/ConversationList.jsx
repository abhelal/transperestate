"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import clientApi from "@/libs/clientApi";
import socket from "@/libs/socket";

export default function ConversationList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [latestConversations, setLatestConversations] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setLatestConversations((prev) => {
        const index = prev.findIndex((conversation) => conversation.conversationId === message.conversationId);
        if (index === -1) return prev;
        prev[index].messages.unshift(message);
        return [...prev];
      });
    });
    const fetchMessages = async () => {
      const res = await clientApi.get("/messages");
      setLatestConversations(res.data.conversations || []);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  // short conversation base on last message updated at time
  latestConversations.sort((a, b) => {
    return new Date(b.messages[0]?.updatedAt) - new Date(a.messages[0]?.updatedAt);
  });

  return (
    <>
      <div className="flex items-center justify-between border-b h-14 px-5">
        <div className="flex items-center gap-4">
          <button className="text-primary-500">All {}</button>
          <button>Unread</button>
        </div>
        <button> Archived</button>
      </div>
      <div className="h-0 grow overflow-y-auto">
        {loading && (
          <div className="w-full animate-pulse border-b p-4 hover:bg-gray-100 hover:shadow-inner transition duration-400 ease-in-out">
            <div className="flex items-center justify-between">
              <div className="flex w-full gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 shrink-0"></div>
                <div className="w-full space-y-2">
                  <p className="font-semibold text-sm max-w-[130px] truncate bg-gray-100 h-5 rounded-md"></p>
                  <p className="text-xs text-secondary-400 max-w-[160px] bg-gray-100 h-3 truncate"></p>
                </div>
              </div>
            </div>
            <div className="mt-1 flex w-full justify-end">
              <div className="bg-gray-100 h-3 w-10"></div>
            </div>
          </div>
        )}
        {!loading &&
          latestConversations.map((conversation, i) => (
            <button
              key={i}
              className="w-full border-b p-4 hover:bg-gray-100 hover:shadow-inner transition duration-400 ease-in-out"
              onClick={() => {
                router.refresh(`/message/${conversation.conversationId}`);
                router.push(`/message/${conversation.conversationId}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex w-full gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 shrink-0"></div>
                  <div className="text-start">
                    <p className="font-semibold text-sm max-w-[165px] truncate">{conversation?.property?.name}</p>
                    <p className="text-xs text-secondary-400 max-w-[160px] truncate">
                      {conversation.messages[0]?.text || conversation.maintenance.maintenanceDetails}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-secondary-400 text-end">
                {moment(conversation.messages[0]?.updatedAt || conversation.updatedAt).calendar(null, {
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
