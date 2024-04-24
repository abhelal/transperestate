"use client";

import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function DeleteApartment({ apartmentId, propertyId }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      const res = await clientApi.delete(`/properties/${propertyId}/apartments/${apartmentId}`);
      if (res.status === 200) {
        showToast(res.data.message, "success");
        setOpenModal(false);
        router.push(`/properties/${propertyId}`);
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>
        <TrashIcon className="h-5 w-5 text-red-500" />
      </button>
      <Modal show={openModal} size="2xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <p>Are you sure you want to delete this apartment?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button color="failure" isProcessing={isProcessing} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
