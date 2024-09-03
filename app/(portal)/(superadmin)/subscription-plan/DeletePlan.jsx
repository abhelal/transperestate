"use client";

import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "@/components/DeleteModal";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import clientApi from "@/libs/clientApi";

export default function DeletePlan({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const deletePlan = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.delete(`/subscription/plan/${id}`);
      if (res.data.success) {
        showToast(res.data.message, "success");
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="">
        <TrashIcon className="w-5 h-5" />
      </button>
      <DeleteModal openModal={isOpen} setOpenModal={setIsOpen} handleDelete={deletePlan} isDeleting={isProcessing}></DeleteModal>
    </div>
  );
}
