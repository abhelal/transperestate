"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useRouter } from "next/navigation";

export default function SendMessage({ id }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const sendMessage = async () => {
    try {
      setIsProcessing(true);
      const res = await clientApi.post(`/messages/new/${id}`);
      router.push(`/message/${res.data.conversationId}`);
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };
  return (
    <div>
      <Button onClick={sendMessage} isProcessing={isProcessing} size="xs" outline>
        Send Message
      </Button>
    </div>
  );
}
