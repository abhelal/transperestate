"use client";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function UpdateStatus({ billId, status }) {
  const router = useRouter();
  const { showToast } = useToast();

  const updateStatus = async (status) => {
    try {
      const res = await clientApi.put(`/bills/${billId}/update`, { status });
      showToast(res.data.message, "success");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };
  return (
    <Dropdown label="" renderTrigger={() => <BsThreeDotsVertical className="w-5 h-5" />} placement="bottom-start">
      <Dropdown.Item
        disabled={status === "paid"}
        onClick={() => updateStatus("paid")}
        className="disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        Paid
      </Dropdown.Item>
      <Dropdown.Item
        disabled={status === "unpaid"}
        onClick={() => updateStatus("unpaid")}
        className="disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        Unpaid
      </Dropdown.Item>
    </Dropdown>
  );
}
