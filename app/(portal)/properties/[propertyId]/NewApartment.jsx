import React, { useEffect, useState } from "react";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import { validateCreate } from "@/validator/apartment";
import clientApi from "@/libs/clientApi";
import { fetchProperty } from "@/libs/features/property/propertyActions";

export default function NewApartment({ openModal, setOpenModal }) {
  const dispatch = useAppDispatch();
  const { property } = useAppSelector((state) => state.property);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const [data, setData] = useState({
    floor: "",
    door: "",
    size: "",
    rooms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateApartment = async () => {
    setIsProcessing(true);
    if (validateCreate(data, setErrors)) {
      try {
        const res = await clientApi.post(`/properties/${property.propertyId}/apartments/create`, data);
        dispatch(fetchProperty(property.propertyId));
        setOpenModal(false);
        showToast(res.data.message, "success");

        setData({
          floor: "",
          door: "",
          size: "",
          rooms: "",
        });
      } catch (error) {
        console.log(error.response.data);
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    setData({
      floor: "",
      door: "",
      size: "",
      rooms: "",
    });
  }, [openModal]);

  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <p className="text-xl font-semibold">New Apartment</p>
        <div className="mt-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Property Name" />
            </div>
            <TextInput id="name" type="text" name="name" value={property.name} disabled />
            <ErrorMessage message={errors.name} />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="floor" value="Floor" />
              </div>
              <TextInput id="floor" type="text" name="floor" value={data.floor} placeholder="3" maxLength={4} onChange={handleChange} />
              <ErrorMessage message={errors.floor} />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="door" value="Door" />
              </div>
              <TextInput id="door" type="text" name="door" placeholder="A" maxLength={4} value={data.door} onChange={handleChange} />
              <ErrorMessage message={errors.door} />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="size" value="Floor Size" />
              </div>
              <TextInput id="size" type="number" name="size" placeholder="1200" value={data.size} onChange={handleChange} />
              <ErrorMessage message={errors.size} />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="rooms" value="Rooms" />
              </div>
              <TextInput id="rooms" type="number" name="rooms" placeholder="4" value={data.rooms} onChange={handleChange} />
              <ErrorMessage message={errors.rooms} />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleCreateApartment} isProcessing={isProcessing}>
            Create
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
