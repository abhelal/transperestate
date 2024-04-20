"use client";

import React from "react";
import { Button } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function GenerateNewCode() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { showToast } = useToast();

  const generateCoupon = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.post("/coupons", {
        couponType: "TEST",
        discount: 90,
        expirationDate: moment().add(3, "month"),
        maxUses: 1,
        description: "3 month activation for Test User",
      });
      if (res.status === 200) {
        router.refresh();
        showToast(res.data.message, "success");
      }
    } catch (error) {
      console.log(error);
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };
  return (
    <div>
      <Button isProcessing={isProcessing} onClick={generateCoupon} className="whitespace-nowrap">
        Generate New
      </Button>
    </div>
  );
}
