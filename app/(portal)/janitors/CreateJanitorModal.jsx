"use client";
import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Modal } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useAppDispatch } from "@/libs/hooks";
import SelectProperty from "./SelectProperty";
import { validateJanitorCreate } from "@/validator/janitor";
import { fetchJanitors } from "@/libs/features/janitor/janitorAction";

export default function CreateJanitor({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    properties: [],
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
      if (validateJanitorCreate(data, setErrors)) {
        const res = await clientApi.post("/janitors/create", data);
        dispatch(fetchJanitors({ query, page }));
        showToast(res.data.message, "success");
        setOpenModal(false);
        setData({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          properties: [],
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
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      properties: [],
    });
  }, [openModal]);

  return (
    <>
      <Button size="sm" onClick={() => setOpenModal(true)}>
        Create New
      </Button>
      <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Create New Janitor</p>
            </div>
            <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
              <div className="items-center gap-4">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.name} />
                </div>

                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="contactNumber" value="Contact Number" />
                  </div>
                  <TextInput
                    id="contactNumber"
                    type="tel"
                    name="contactNumber"
                    value={data.contactNumber}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.contactNumber} />
                </div>
              </div>
              <div className="items-center gap-4">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.email} />
                </div>

                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.password} />
                </div>
              </div>
              <SelectProperty data={data} setData={setData} />
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button outline onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
                <Button isProcessing={isProcessing} onClick={() => handleSubmit()}>
                  Create
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
