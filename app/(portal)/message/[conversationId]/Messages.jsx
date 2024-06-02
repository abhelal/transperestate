"use client";
import { useAppSelector } from "@/libs/hooks";
import React, { useState } from "react";

export default function Messages({ messages }) {
  const [latestMessages, setLatestMessages] = useState(messages.messages);
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={`space-y-4`}>
      {latestMessages.map((message, i) => (
        <div key={i} className={`flex ${user.userId === message.senderId ? "justify-end" : "justify-start"}`}>
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
