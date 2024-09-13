"use client";

import React from "react";
import { Checkbox } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

function Action({ message }) {
  const { showToast } = useToast();
  const router = useRouter();
  const onClick = async () => {
    await clientApi
      .put(`/contact/${message.contactId}`)
      .then((res) => {
        showToast(res.data.message, "success");
        router.refresh();
      })
      .catch((e) => {
        showToast(e.response.data.message, "error");
      });
  };
  return <Checkbox label="Action" checked={message.responded} onClick={onClick} />;
}

export default Action;
