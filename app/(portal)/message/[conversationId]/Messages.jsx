"use client";
import { useAppSelector } from "@/libs/hooks";
import React, { useEffect, useState } from "react";
import socket from "@/libs/socket";
import { useParams } from "next/navigation";

export default function Messages({ messages }) {
  const params = useParams();
  const conversationId = params?.conversationId;
  const [latestMessages, setLatestMessages] = useState(messages?.messages || []);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (message.conversationId === conversationId) {
        setLatestMessages((prev) => [message, ...prev]);
      }
    });
  }, []);

  return (
    <div className={`flex flex-col-reverse h-0 grow overflow-y-auto hidescrollbar`}>
      {latestMessages.map((message, i) => (
        <div key={i} className={`flex my-2 ${user.userId === message.senderId ? "justify-end" : "justify-start"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
            <div className="w-auto h-auto min-h-[40px] max-w-md min-w-[120px] flex items-center flex-wrap px-4 rounded-full bg-gray-100 text-sm">
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
