"use client";
import React, { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { validateTicket } from "@/validator/support";

export default function CreateTicket() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

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
      if (validateTicket(data, setErrors)) {
        const response = await clientApi.post("/support/ticket", data);
        showToast(response.data.message, "success");
        router.refresh();
        setOpenModal(false);
        setData({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    if (openModal) {
      setErrors({});
      setData({
        title: "",
        description: "",
      });
    }
  }, [openModal]);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create Ticket</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-lg font-semibold">Create Ticket</p>
        </Modal.Header>
        <Modal.Body>
          <Label>Title</Label>
          <TextInput name="title" type="text" value={data.title} onChange={handleChange} />
          <ErrorMessage message={errors.title} />
          <Label>Description</Label>
          <Textarea name="description" rows={4} value={data.description} onChange={handleChange} />
          <ErrorMessage message={errors.description} />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button outline onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isProcessing}>
            Submit Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
