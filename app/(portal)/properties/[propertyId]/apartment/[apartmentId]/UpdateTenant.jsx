"use client";

import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function UpdateTenant({ apartment }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = async () => {
    setIsProcessing(true);
    const res = await clientApi
      .put(`/apartments/${apartment._id}`, { tenant: null })
      .catch((err) => {
        setIsProcessing(false);
        showToast("error", "Something went wrong. Please try again later.");
      });

    if (res?.data) {
      setIsProcessing(false);
      showToast("success", "Tenant removed successfully");
      router.reload();
    }
  };

  return (
    <div>
      <Button size="xs" onClick={() => setOpenModal(true)}>
        Update
      </Button>
      <Modal show={openModal} size="2xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <p className="text-xl font-semibold">
            Update Tenant{" "}
            <span className="uppercase">
              [{apartment.floor}
              {"-"}
              {apartment.door}]
            </span>
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button outline onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button isProcessing={isProcessing} onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
