"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import { validateContact } from "@/validator/contact";
import clientApi from "@/libs/clientApi";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      if (!validateContact(formData, setErrors)) {
        setIsProcessing(false);
        return;
      }
      await clientApi.post("/contact", formData);
      showToast("Message sent", "success", "TC");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      showToast(error.response.data.message, "error", "TC");
    }
    setIsProcessing(false);
  };

  return (
    <div className="p-4">
      <div>
        <div>
          <Label htmlFor="name" value="Name" />
          <TextInput type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          <ErrorMessage message={errors.name} />
        </div>
        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          <ErrorMessage message={errors.email} />
        </div>
        <div>
          <Label htmlFor="phone" value="Phone" />
          <TextInput type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          <ErrorMessage message={errors.phone} />
        </div>
        <div>
          <Label htmlFor="message" value="Message" />
          <Textarea rows={10} type="text" id="message" name="message" value={formData.message} onChange={handleChange} />
          <ErrorMessage message={errors.message} />
        </div>
        <Button className="mt-4" onClick={handleSubmit} isProcessing={isProcessing}>
          Submit
        </Button>
      </div>
    </div>
  );
}
