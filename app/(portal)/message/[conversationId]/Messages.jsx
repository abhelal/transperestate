"use client";
import React, { useEffect, useState } from "react";
import socket from "@/libs/socket";
import { useParams } from "next/navigation";
import moment from "moment";

export default function Messages({ conversation }) {
  const params = useParams();
  const conversationId = params?.conversationId;
  const [latestMessages, setLatestMessages] = useState(conversation?.messages || []);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (message.conversationId === conversationId) {
        setLatestMessages((prev) => [message, ...prev]);
      }
    });
  }, []);

  function MyMessage({ message }) {
    return (
      <div className="flex my-3 justify-end">
        <div>
          <div className="text-xs text-secondary-400 text-end">
            {moment(message.updatedAt).calendar(null, {
              sameDay: "[Today] LT",
              lastDay: "[Yesterday] LT",
              lastWeek: "DD MMM YYYY LT",
              sameElse: "DD MMM YYYY LT",
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-semibold">
              {conversation?.myself?.name.charAt(0)}
            </div>
            <div className="w-auto h-auto min-h-[40px] max-w-md min-w-[140px] flex items-center flex-wrap px-4 rounded-full bg-gray-100 text-sm">
              {message.text}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function OtherMessage({ message }) {
    return (
      <div className="flex my-3 justify-start">
        <div>
          <div className="ml-14 text-xs text-secondary-400 text-start">
            {moment(message.updatedAt).calendar(null, {
              sameDay: "[Today] LT",
              lastDay: "[Yesterday] LT",
              lastWeek: "DD MMM YYYY LT",
              sameElse: "DD MMM YYYY LT",
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 font-semibold text-green-500">
              {conversation.other?.name?.charAt(0)}
            </div>
            <div className="w-auto h-auto min-h-[40px] max-w-md min-w-[140px] flex items-center flex-wrap px-4 rounded-full bg-green-100 text-sm">
              {message.text}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col-reverse h-0 grow overflow-y-auto hidescrollbar`}>
      {latestMessages.map((message, i) => {
        if (message.senderId === conversation.myself.userId) {
          return <MyMessage key={i} message={message} />;
        } else {
          return <OtherMessage key={i} message={message} />;
        }
      })}
    </div>
  );
}
