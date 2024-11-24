"use client";

import React, { useState } from "react";
import { Drawer } from "flowbite-react";
import ConversationList from "./ConversationList";
import { BiMessageSquareDots } from "react-icons/bi";

export default function MessageDrawer({ conversations }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(true)}
        className="absolute inset-y-1/2 w-12 h-12 rounded-2xl bg-primary-500 opacity-60 flex items-center justify-center text-white"
      >
        <BiMessageSquareDots className="w-6 h-6" />
      </button>
      <Drawer open={isOpen} onClose={handleClose}>
        <div className="h-full flex flex-col">
          <ConversationList conversations={conversations} />
        </div>
      </Drawer>
    </div>
  );
}
