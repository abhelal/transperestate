"use client";

import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";

export default function SubscriptionPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState("");
  const { showToast } = useToast();

  const handleActive = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.post("/subscription/active", { code });
      showToast(res.data.message, "success", "TC");
      window.location.href = "/dashboard";
    } catch (error) {
      showToast(error.response.data.message, "error", "TC");
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex h-screen flex-col items-center p-4">
      <div className="mt-40 w-full max-w-4xl text-lg font-semibold py-4">Subscription</div>
      <div className="rounded-lg border border-slate-50 w-full max-w-4xl p-8 shadow">
        <p className="font-semibold">Your plan</p>
        <div className="flex justify-between items-center py-4">
          <div>
            <p>You are not subscribed to any plan</p>
            <span>To active Transparestate please </span>
            <span className="text-primary-600 font-semibold cursor-pointer">subscribe</span>
          </div>
        </div>
        <p className="mt-6">Do you have promo code ?</p>
        <p className=" italic text-xs">You can active Transparestate with your promo code</p>
        <div className="mt-4 flex justify-between items-center w-full gap-3">
          <TextInput
            className="w-full"
            placeholder="Enter your promo code"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button className="whitespace-nowrap" isProcessing={isProcessing} onClick={handleActive}>
            Active Now
          </Button>
        </div>
      </div>
    </div>
  );
}
