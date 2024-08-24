"use client";
import React from "react";
import { ToggleSwitch } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function UpdateStatus({ status, clientId }) {
  const router = useRouter();
  const { showToast } = useToast();
  const handleStatusChange = async () => {
    await clientApi
      .put(`/user/clients/status/${clientId}`)
      .then((res) => {
        showToast(res.data.message, "success");
        router.refresh();
      })
      .catch((e) => {
        showToast(e.response.data.message, "error");
      });
  };
  return (
    <div className="flex justify-between bg-white boxshadow-sm rounded-lg p-6">
      <p className="text-lg px-2">Client Status </p>
      <div className="h-8">
        <ToggleSwitch checked={status === "NEW" || status === "ACTIVE"} onChange={handleStatusChange} />
      </div>
    </div>
  );
}
