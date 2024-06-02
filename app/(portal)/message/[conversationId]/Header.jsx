"use client";

import React from "react";
import { useAppSelector } from "@/libs/hooks";

export default function MessageHeader({ messages }) {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="flex w-full gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0"></div>
      <div>
        <p className="font-semibold text-sm truncate">{user.role === "TENANT" ? messages?.property?.name : messages?.tenant?.name}</p>
        <p className="text-xs text-primary-500 max-w-[140px] truncate">Typing....</p>
      </div>
    </div>
  );
}
