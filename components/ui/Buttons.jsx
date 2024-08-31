"use client";

import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { usePathname, useRouter } from "next/navigation";

export function MenuButton({ menu }) {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const path = usePathname();

  return (
    <button
      onClick={() => router.push(menu.route)}
      disabled={!user.isSubscribed}
      className={`flex items-center gap-2 p-2 disabled:text-gray-400 disabled:cursor-not-allowed rounded-md ${
        path.startsWith(menu.route) ? "bg-primary-500 text-white" : ""
      }`}
    >
      <div>{menu.icon}</div>
      <p>{menu.name}</p>
    </button>
  );
}
