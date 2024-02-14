import React from "react";
import { redirect } from "next/navigation";
import { serverApi } from "@/libs/api";

export default async function Authlayout({ children }) {
  const res = await serverApi.get("/auth/me");
  const { user } = res.data;
  if (user) redirect("/dashboard");
  return (
    <div className="flex flex-col h-screen w-full items-center bg-gray-50">
      <div className="flex flex-col h-0 grow w-full max-w-screen-2xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
