"use client";

import React, { useRef, useState } from "react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import socket from "@/libs/socket";

export default function WriteMessage() {
  const params = useParams();
  const conversationId = params?.conversationId;
  const doxRef = useRef();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const handleTyping = () => {
    socket.emit("startTyping", conversationId);
  };

  const handleStopTyping = () => {
    socket.emit("stopTyping", conversationId);
  };

  const sendMessage = async () => {
    const message = {
      conversationId,
      text,
      image,
      file,
    };
    socket.emit("sendMessage", message);
    setText("");
    setImage("");
    setFile("");
  };

  return (
    <>
      <div className="pt-8 flex justify-between gap-4">
        {/* <button className="flex w-12 h-12 items-center justify-center rounded-full bg-gray-100 shrink-0">
          <PaperClipIcon className="w-5 h-5" />
        </button> */}
        <div className="w-full rounded-full bg-gray-100 p-2 overflow-hidden">
          <textarea
            style={{ resize: "none" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleTyping}
            onBlur={handleStopTyping}
            placeholder="Type message..."
            rows={1}
            className="hidescrollbar w-full h-full px-4 text-sm bg-gray-100 whitespace-pre-wrap border-none focus:ring-0 focus:outline-none focus:border-none caret-primary-500"
          />
        </div>
        <button
          onClick={sendMessage}
          className="flex w-12 h-12 items-center justify-center text-white rounded-full bg-primary-500 shrink-0"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
