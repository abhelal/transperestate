"use client";

import React from "react";
import clientApi from "@/libs/clientApi";
import { ToggleSwitch } from "flowbite-react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function UpdateUserStatus({ user }) {
  const router = useRouter();
  const { showToast } = useToast();

  const updateStatus = async () => {
    try {
      const res = await clientApi.put(`/user/update/status/${user.userId}`);
      showToast(res.data.message, "success");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="flex flex-col bg-light dark:bg-dark p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Active</p>
        <ToggleSwitch checked={user.status === "ACTIVE"} onChange={updateStatus} />
      </div>
    </div>
  );
}
