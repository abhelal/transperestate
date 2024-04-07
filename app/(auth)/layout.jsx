import React from "react";
import serverApi from "@/libs/serverApi";
import { redirect } from "next/navigation";

export default async function Authlayout({ children }) {
  const res = await serverApi.get("/auth/me").catch(() => ({}));
  const user = res?.data?.user || null;
  if (user) return redirect("/dashboard");

  return (
    <div className="flex flex-col h-screen w-full items-center bg-gray-50">
      <div className="flex flex-col h-0 grow w-full max-w-screen-2xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
