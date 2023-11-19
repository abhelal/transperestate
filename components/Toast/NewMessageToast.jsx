"use client";
import React from "react";
import { RiMessage3Line } from "react-icons/ri";
import Toast from "./Toast";

export default function SuccessToast({ message }) {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <RiMessage3Line className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
    </Toast>
  );
}
