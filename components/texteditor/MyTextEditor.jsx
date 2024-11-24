"use client";
import React from "react";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/texteditor/TextEditor"), { ssr: false });

export default function MyTextEditor({ defaultValue, name }) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-light dark:bg-dark rounded-lg p-8">
      <div className="w-full h-full max-w-5xl pb-4">
        <TextEditor defaultValue={defaultValue} name={name} />
      </div>
    </div>
  );
}
