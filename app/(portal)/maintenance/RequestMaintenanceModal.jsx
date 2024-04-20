"use client";
import React, { useEffect, useState } from "react";
import { Button, Label, Modal, Textarea, Select } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { validateCreate } from "@/validator/maintenance";

export default function RequestMaintenanceModal() {
  const [openModal, setOpenModal] = useState(false);
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const options = [
    { label: "Plumbing", value: "Plumbing" },
    { label: "Electrical", value: "Electrical" },
    { label: "Carpentry", value: "Carpentry" },
    { label: "Painting", value: "Painting" },
    { label: "Others", value: "Others" },
  ];

  const [data, setData] = useState({
    maintenanceType: options[0].value,
    maintenanceDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      if (validateCreate(data, setErrors)) {
        const response = await clientApi.post("/maintenance/create", data);
        showToast(response.data.message, "success");
        setOpenModal(false);
        setData({
          maintenanceType: options[0].value,
          maintenanceDetails: "",
        });
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    setErrors({});
    setData({
      maintenanceType: options[0].value,
      maintenanceDetails: "",
    });
  }, [openModal]);

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setOpenModal(true)}>New Request</Button>
      </div>
      <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Request new maintenance</p>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-lg">
              <div className="grid grid-cols-12">
                <div className="col-span-6">
                  <Label>Maintenance Type</Label>
                  <Select
                    name="maintenanceType"
                    value={data.maintenanceType}
                    onChange={handleChange}
                    placeholder="Select Maintenance Type"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ErrorMessage message={errors.maintenanceType} />
                </div>
                <div className="col-span-12">
                  <Label>Maintenance Details</Label>
                  <Textarea
                    name="maintenanceDetails"
                    value={data.maintenanceDetails}
                    onChange={handleChange}
                    placeholder="Details of maintenance"
                  />
                  <ErrorMessage message={errors.maintenanceDetails} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={handleSubmit} isProcessing={isProcessing}>
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}