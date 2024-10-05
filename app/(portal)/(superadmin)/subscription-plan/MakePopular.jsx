"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import clientApi from "@/libs/clientApi";

export default function MakePopular({ id }) {
  const { showToast } = useToast();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  const makePopular = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.put(`/subscription/plan/make-popular/${id}`);
      if (res.data.success) {
        showToast(res.data.message, "success");
        router.refresh();
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  return (
    <button onClick={makePopular} className={`text-xs bg-primary-500 text-white rounded-full p-1 px-4 ${isProcessing && "animate-pulse"}`}>
      Make Popular
    </button>
  );
}
