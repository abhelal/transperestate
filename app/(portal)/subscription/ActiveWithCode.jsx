"use client";

import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import { useAppDispatch } from "@/libs/hooks";
import { login } from "@/libs/features/user/userSlice";

export default function ActivePlanWithCode() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState("");
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const handleActive = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.post("/subscription/active-by-code", { code });
      showToast(res.data.message, "success", "TC");
      dispatch(login(res.data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      showToast(error.response.data.message, "error", "TC");
    }
    setIsProcessing(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <p className="">Do you have promo code ?</p>
      <p className=" italic text-xs">You can active Transparestate with your promo code</p>
      <div className="mt-4 flex justify-between items-center w-full gap-3">
        <TextInput className="w-full" placeholder="Enter your promo code" onChange={(e) => setCode(e.target.value)} />
        <Button className="whitespace-nowrap" isProcessing={isProcessing} onClick={() => handleActive()}>
          Active Now
        </Button>
      </div>
    </div>
  );
}
