import React from "react";

export default function Authlayout({ children }) {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="h-0 grow w-full max-w-screen-2xl overflow-y-auto bg-gray-50">
        {children}
      </div>
    </div>
  );
}
