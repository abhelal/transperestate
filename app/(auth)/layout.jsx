"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Authlayout({ children }) {
  const { push } = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) push("/dashboard");
  }, [user]);

  return (
    <div className="flex flex-col h-screen w-full items-center bg-gray-50">
      <div className="flex flex-col h-0 grow w-full max-w-screen-2xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
