"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import { useToast } from "@/context/ToastContext";

export default function Toast({ children }) {
  const { closeToast } = useToast();
  return (
    <div className="flex shadow-md w-96 justify-between items-start p-6 rounded-lg bg-white">
      <div className="flex items-center">{children}</div>
      <button onClick={closeToast}>
        <HiXMark />
      </button>
    </div>
  );
}
