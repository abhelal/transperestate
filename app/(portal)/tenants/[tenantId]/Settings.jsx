import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useToast } from "@/context/ToastContext";
import { useAppDispatch } from "@/libs/hooks";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ErrorMessage from "@/components/ErrorMesssage";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updatePassword = async () => {};
  const handleDelete = async () => {};

  return (
    <div className="flex gap-4">
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={handleDelete} />
      <div className="w-full md:w-1/2">
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
        <div className="mt-4 flex items-center justify-between">
          <Button color="failure" onClick={() => setOpenModal(true)}>
            Delete Maintainer
          </Button>
          <Button isProcessing={isProcessing === "password"} onClick={updatePassword}>
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
}
