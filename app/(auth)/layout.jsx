import React from "react";

export default async function Authlayout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full items-center bg-gray-50">
      <div className="flex flex-col h-0 grow w-full max-w-screen-2xl overflow-y-auto">{children}</div>
    </div>
  );
}
