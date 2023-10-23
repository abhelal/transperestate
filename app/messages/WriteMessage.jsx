import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function WriteMessage() {
  return (
    <>
      <div className="grow"></div>
      <div className="flex justify-between gap-4">
        <button className="flex w-12 h-12 items-center justify-center rounded-full bg-gray-100 shrink-0">
          <PaperClipIcon className="w-5 h-5" />
        </button>
        <div className="w-full rounded-full bg-gray-100 p-2">
          <input className="w-full h-full px-4 bg-gray-100 whitespace-pre-wrap focus:outline-none  caret-primary-500" />
        </div>
        <button className="flex w-12 h-12 items-center justify-center text-white rounded-full bg-primary-500 shrink-0">
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
