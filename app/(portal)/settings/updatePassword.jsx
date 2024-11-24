"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import ErrorMessage from "@/components/ErrorMesssage";
import { validateUpdatePassword } from "@/validator/auth";

export default function UpdatePassword() {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = async () => {
    if (validateUpdatePassword(data, setErrors)) {
      setIsProcessing(true);
      await clientApi
        .post("/auth/update-password", data)
        .then((res) => {
          if (res.status === 200) {
            showToast("Password updated successfully", "success", "TC");
            setIsProcessing(false);
            setData({
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            });
          }
        })
        .catch((error) => {
          showToast(error.response.data.message, "error", "TC");
          setIsProcessing(false);
        });
    }
  };

  return (
    <form className="flex flex-col w-full bg-light dark:bg-dark rounded-lg p-4">
      <p className="text-lg font-semibold">Update Password</p>
      <div className="mt-3 w-full">
        <div className="mb-2 block">
          <Label htmlFor="currentPassword" value="Current Password" />
        </div>
        <TextInput id="currentPassword" name="currentPassword" type="password" value={data.currentPassword} onChange={handleChange} />
        <ErrorMessage message={errors.currentPassword} />
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="newPassword" value="New Password" />
        </div>
        <TextInput id="newPassword" name="newPassword" type="password" value={data.newPassword} onChange={handleChange} />

        <ErrorMessage message={errors.newPassword} />
      </div>

      <div className="w-full mb-3">
        <div className="mb-2 block">
          <Label htmlFor="confirmNewPassword" value="Confirm New Password" />
        </div>
        <TextInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          value={data.confirmNewPassword}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.confirmNewPassword} />
      </div>
      <div className="flex justify-end">
        <Button type="button" onClick={() => handleUpdatePassword()} isProcessing={isProcessing}>
          Update Password
        </Button>
      </div>
    </form>
  );
}
