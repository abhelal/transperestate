"use client";
import React from "react";
import dynamic from "next/dynamic";
const QuillViewer = dynamic(() => import("@/components/QuillViewer"), { ssr: false });

export default function TextViewer({ delta }) {
  return <QuillViewer delta={delta} />;
}
