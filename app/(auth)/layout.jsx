"use client";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import React from "react";

export default function Authlayout({ children }) {
  const { push } = useRouter();
  const { user } = useAppSelector((state) => state.user);
  if (user) push("/dashboard");
  else
    return (
      <div className="flex flex-col h-screen w-full items-center bg-gray-50">
        <div className="flex flex-col h-0 grow w-full max-w-screen-2xl overflow-y-auto">
          {children}
        </div>
      </div>
    );
}
