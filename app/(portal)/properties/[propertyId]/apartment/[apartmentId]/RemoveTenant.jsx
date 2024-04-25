"use client";

import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function RemoveTenant({ apartment }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemove = async () => {
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
      <Button size="xs" outline onClick={() => setOpenModal(true)}>
        Remove
      </Button>
      <Modal show={openModal} size="2xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <p>Are you sure you want to remove this tenant?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button color="failure" isProcessing={isProcessing} onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
