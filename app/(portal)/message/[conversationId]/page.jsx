import React from "react";
import WriteMessage from "./WriteMessage";
import Messages from "./Messages";
import serverApi from "@/libs/serverApi";
import MessageHeader from "./Header";

export default async function Conversation({ params }) {
  const conversationId = params?.conversationId;
  const res = await serverApi.get(`/messages/${conversationId}`);
  const conversation = res?.data;

  return (
    <div className="flex flex-col h-0 grow">
      <div className="flex items-center w-full border-b px-5 h-14">
        <MessageHeader conversation={conversation} />
      </div>
      <div className="flex flex-col h-full p-5">
        <Messages conversation={conversation} />
        <WriteMessage />
      </div>
    </div>
  );
}
