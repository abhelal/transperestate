import React from "react";
import ConversationList from "./ConversationList";
import ServerError from "@/components/ServerError";
import serverApi from "@/libs/serverApi";
import MessageDrawer from "./MessageDrawer";

export default async function MessageLayout({ children }) {
  let errorMessages = null;
  let conversations = [];

  const res = await serverApi.get("/messages").catch((error) => {
    errorMessages = error?.response?.data?.message;
  });

  if (res) conversations = res.data.conversations || [];
  if (errorMessages) return <ServerError message={errorMessages} />;

  return (
    <div className="w-full h-full">
      <div className="block xl:hidden">
        <MessageDrawer conversations={conversations} />
      </div>
      <div className="xl:grid grid-cols-12 h-full w-full bg-light dark:bg-dark boxshadow rounded-xl overflow-hidden">
        <div className="hidden col-span-3 border-r xl:flex flex-col h-full">
          <ConversationList conversations={conversations} />
        </div>
        <div className="col-span-9 flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}
