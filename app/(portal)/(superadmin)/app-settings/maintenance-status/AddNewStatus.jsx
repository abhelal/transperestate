"use client";
import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function AddNewStatus() {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const validateStatus = (status) => {
    const errors = {};
    if (!status) {
      errors.status = "Status is required";
    } else if (status.length < 3) {
      errors.status = "Status must be at least 3 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAddStatus = async () => {
    setIsProcessing(true);
    try {
      if (validateStatus(status)) {
        const res = await clientApi.post("app-settings/maintenance-status", { status });
        showToast(res.data.message, "success");
        setStatus("");
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
        <Label htmlFor="status" value="Add Maintenance Status" />
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <TextInput
              id="status"
              type="text"
              placeholder="Enter maintenance status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleAddStatus} isProcessing={isProcessing}>
              Add
            </Button>
          </div>
          <ErrorMessage message={errors.status} />
        </div>
      </div>
    </div>
  );
}
