"use client";

import React, { useState } from "react";
import clientApi from "@/libs/clientApi";
import { Button, Label, TextInput } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import { validateInfo } from "@/validator/maintainer";
import { useRouter } from "next/navigation";

export default function UpdateInformation({ user }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateInfo = async () => {
    setIsProcessing(true);
    if (validateInfo(data, setErrors)) {
      try {
        const res = await clientApi.put(`/user/update/info/${user.userId}`, data);
        showToast(res.data.message, "success");
        router.refresh();
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg">
      <div className="items-center gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput id="name" type="text" name="name" value={data.name} onChange={handleChange} />
          <ErrorMessage message={errors.name} />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="contactNumber" value="Contact Number" />
          </div>
          <TextInput id="contactNumber" type="tel" name="contactNumber" value={data.contactNumber} onChange={handleChange} />
          <ErrorMessage message={errors.contactNumber} />
        </div>
      </div>
      <div className="items-center gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput id="email" type="email" name="email" value={data.email} onChange={handleChange} />
          <ErrorMessage message={errors.email} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <Button isProcessing={isProcessing} onClick={updateInfo}>
          Save
        </Button>
      </div>
    </div>
  );
}
