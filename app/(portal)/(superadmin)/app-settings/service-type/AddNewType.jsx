"use client";
import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function AddNewType() {
  const [serviceType, setServiceType] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const validateServiceType = (type) => {
    const errors = {};
    if (!type) {
      errors.serviceType = "Service type is required";
    } else if (type.length < 3) {
      errors.serviceType = "Service type must be at least 3 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddServiceType = async () => {
    setIsProcessing(true);
    try {
      if (validateServiceType(serviceType)) {
        const res = await clientApi.post("app-settings/service-type", { serviceType });
        showToast(res.data.message, "success");
        setServiceType("");
        router.refresh();
        setErrors({});
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };
  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <Label htmlFor="serviceType" value="Add Service Type" />
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <TextInput
              id="serviceType"
              type="text"
              placeholder="Enter service type"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleAddServiceType} isProcessing={isProcessing}>
              Add
            </Button>
          </div>
          <ErrorMessage message={errors.serviceType} />
        </div>
      </div>
    </div>
  );
}
