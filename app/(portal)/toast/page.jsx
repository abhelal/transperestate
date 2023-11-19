"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
export default function HomePage() {
  const { showToast } = useToast();

  const handleShowMessage = () => {
    showToast("You have received a new message", "info");
  };

  const handleShowSuccess = () => {
    showToast("This is a success toast", "success");
  };

  const handleShowFailure = () => {
    showToast("This is a failure toast", "failure");
  };
  return (
    <div className="bg-gray-50 h-screen">
      HomePage
      <div>
        <h1>Another Page</h1>
        <button onClick={handleShowMessage}>Message </button>
        <button onClick={handleShowSuccess}>Success </button>
        <button onClick={handleShowFailure}>Failure </button>
      </div>
    </div>
  );
}
