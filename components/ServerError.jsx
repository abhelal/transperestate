"use client";

import React from "react";

export default function ServerError({ message }) {
  return (
    <div className="grow w-full h-full flex justify-center items-center">
      <p className="text-lg font-semibold text-gray-400">{message}</p>
    </div>
  );
}
