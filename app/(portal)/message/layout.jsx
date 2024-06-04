import React from "react";

import ConversationList from "./ConversationList";

export default async function MessageLayout({ children }) {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-12 h-full w-full bg-white boxshadow rounded-xl overflow-hidden">
        <div className="col-span-3 border-r flex flex-col h-full">
          <ConversationList />
        </div>
        <div className="col-span-9 flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}
