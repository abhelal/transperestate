import React from "react";
import WriteMessage from "./WriteMessage";
import Messages from "./Messages";

export default function MyMessages() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-12 h-full w-full bg-white boxshadow rounded-xl overflow-hidden">
        <div className="col-span-3 border-r flex flex-col h-full">
          <div className="flex items-center justify-between border-b h-14 px-5">
            <div className="flex items-center gap-4">
              <button className="text-primary-500">All</button>
              <button>Unread</button>
            </div>
            <button> Archived</button>
          </div>
          <div className="h-0 grow overflow-y-auto">
            <div className="pl-4">
              <div className="flex items-center justify-between py-4 border-b pr-4">
                <div className="flex w-full gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0"></div>
                  <div>
                    <p className="font-semibold text-sm max-w-[120px]">Talan Dorwart</p>
                    <p className="text-xs text-secondary-400 max-w-[130px] truncate">
                      This is the message you are viewing right now
                    </p>
                  </div>
                </div>
                <div className="text-xs text-secondary-400">6.00pm</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9 flex flex-col h-full">
          <div className="flex items-center w-full border-b px-5 h-14">
            <div className="flex w-full gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0"></div>
              <div>
                <p className="font-semibold text-sm max-w-[130px]">Talan Dorwart</p>
                <p className="text-xs text-primary-500 max-w-[140px] truncate">Typing....</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-0 grow p-5">
            <Messages />
            <WriteMessage />
          </div>
        </div>
      </div>
    </div>
  );
}
