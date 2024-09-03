"use client";

import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import { useAppDispatch } from "@/libs/hooks";
import { login } from "@/libs/features/user/userSlice";

export default function SubscriptionPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState("");
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const handleActive = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.post("/subscription/active", { code });
      showToast(res.data.message, "success", "TC");
      dispatch(login(res.data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      showToast(error.response.data.message, "error", "TC");
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col grow items-center p-4">
      <div className="mt-20 w-full max-w-3xl">
        <div className="text-lg font-semibold py-4">Subscription</div>
        <div className="rounded-lg border border-slate-50 p-8 shadow">
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
            <TextInput className="w-full" placeholder="Enter your promo code" onChange={(e) => setCode(e.target.value)} />
            <Button className="whitespace-nowrap" isProcessing={isProcessing} onClick={() => handleActive()}>
              Active Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}