"use client";

import React, { useState } from "react";
import clientApi from "@/libs/clientApi";
import { Button, Label, TextInput } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import { validatePassword } from "@/validator/maintainer";
import DeleteModal from "@/components/DeleteModal";
import { useRouter, usePathname } from "next/navigation";

export default function UpdatePassword({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();
  const [data, setData] = useState({ password: "" });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updatePassword = async () => {
    setIsProcessing(true);
    if (validatePassword(data, setErrors)) {
      try {
        const res = await clientApi.put(`/user/update/password/${user.userId}`, data);
        showToast(res.data.message, "success");
        setData((prevData) => ({
          ...prevData,
          password: "",
        }));
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    try {
      const res = await clientApi.delete(`/user/delete/${user.userId}`);
      showToast(res.data.message, "success");
      setOpenModal(false);
      router.push(`/${pathname.split("/")[1]}`);
      router.refresh(`/${pathname.split("/")[1]}`);
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="mt-4 flex flex-col bg-light dark:bg-dark p-4 rounded-lg">
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          type="password"
          name="password"
          placeholder="Enter new password"
          value={data.password}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.password} />
      </div>

      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={handleDelete} />
      <div className="flex items-center justify-end gap-3">
        <button className="text-red-500 text-sm font-semibold" onClick={() => setOpenModal(true)}>
          Delete Account
        </button>
        <Button size="xs" outline isProcessing={isProcessing} onClick={updatePassword}>
          Update Password
        </Button>
      </div>
    </div>
  );
}
