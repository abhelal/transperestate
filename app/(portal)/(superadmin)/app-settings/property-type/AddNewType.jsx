"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function AddNewType() {
  const [propertyType, setPropertyType] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const validatePropertyType = (type) => {
    const errors = {};
    if (!type) {
      errors.propertyType = "Property type is required";
    } else if (type.length < 3) {
      errors.propertyType = "Property type must be at least 3 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddPropertyType = async () => {
    setIsProcessing(true);
    try {
      if (validatePropertyType(propertyType)) {
        const res = await clientApi.post("app-settings/property-type", { propertyType });
        showToast(res.data.message, "success");
        setPropertyType("");
        router.refresh();
        setErrors({});
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-4">
        <Label htmlFor="propertyType" value="Add Property Type" />
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <TextInput
              id="propertyType"
              type="text"
              placeholder="Enter property type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleAddPropertyType} isProcessing={isProcessing}>
              Add
            </Button>
          </div>
          <ErrorMessage message={errors.propertyType} />
        </div>
      </div>
      <div className="w-full max-w-md p-4 card">list </div>
    </div>
  );
}
