import React from "react";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function RecentMessage({ messages }) {
  const router = useRouter();
  return (
    <div className="boxshadow-sm rounded-lg p-4 bg-white text-sm space-y-2">
      <p className="font-semibold text-lg">Recent Messages</p>
      <div className="pt-2 space-y-4">
        {messages.map((conversation, i) => (
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
    </div>
  );
}
