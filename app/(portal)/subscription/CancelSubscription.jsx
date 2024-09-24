"use client";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";

export default function CancelSubscription() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const cancelSubscription = async () => {
    try {
      setIsProcessing(true);
      await clientApi.post("/subscription/my-subscription/cancel", {});
      showToast("Subscription cancelled successfully", "success");
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setIsProcessing(false);
      window.location.href = "/subscription";
    }
  };
  return (
    <div className="flex justify-end">
      <Button size="xs" outline isProcessing={isProcessing} onClick={() => cancelSubscription()}>
        Cancel Subscription
      </Button>
    </div>
  );
}
