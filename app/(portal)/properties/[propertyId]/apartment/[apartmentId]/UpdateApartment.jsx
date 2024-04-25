"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import { validateUpdateApartment } from "@/validator/apartment";
import { useRouter } from "next/navigation";
import clientApi from "@/libs/clientApi";

export default function UpdateApartment({ apartmentId, propertyId, apartment }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const [data, setData] = useState({
    size: apartment.size,
    rooms: apartment.rooms,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateApartment = async () => {
    setIsProcessing(true);
    if (validateUpdateApartment(data, setErrors)) {
      try {
        const res = await clientApi.put(
          `/properties/${propertyId}/apartments/${apartmentId}`,
          data
        );
        if (res.status === 200) {
          showToast(res.data.message, "success");
          setOpenModal(false);
          router.refresh();
        }
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <Button size="xs" onClick={() => setOpenModal(true)}>
        Update
      </Button>
      <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <p className="text-xl font-semibold">
            Update Apartment{" "}
            <span className="uppercase">
              [{apartment.floor}
              {"-"}
              {apartment.door}]
            </span>
          </p>
          <div className="mt-4">
            <div className="flex gap-4">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="size" value="Floor Size" />
                </div>
                <TextInput
                  id="size"
                  type="number"
                  name="size"
                  placeholder="1200"
                  value={data.size}
                  onChange={handleChange}
                />
                <ErrorMessage message={errors.size} />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="rooms" value="Rooms" />
                </div>
                <TextInput
                  id="rooms"
                  type="number"
                  name="rooms"
                  placeholder="4"
                  value={data.rooms}
                  onChange={handleChange}
                />
                <ErrorMessage message={errors.rooms} />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <Button outline onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateApartment} isProcessing={isProcessing}>
              Update
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
