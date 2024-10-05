"use client";

import React from "react";
import { Label, TextInput } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";

export default function UpdateInformation({ errors, data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    </div>
  );
}
