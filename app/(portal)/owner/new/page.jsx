"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";

export default function AddNewOwnerForm() {
  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to handle form submission (e.g., send data to the server)
    console.log("New Owner Data:", ownerData);
    // Reset form fields after submission
    setOwnerData({
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      address: "",
      country: "",
    });
  };

  return (
    <form className="flex flex-col gap-4 bg-white p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            name="name"
            value={ownerData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="contactNumber" value="Contact Number" />
          </div>
          <TextInput
            id="contactNumber"
            type="tel"
            name="contactNumber"
            value={ownerData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={ownerData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            value={ownerData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="address" value="Address" />
          </div>
          <TextInput
            id="address"
            type="text"
            name="address"
            value={ownerData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="country" value="Country" />
          </div>
          <Select
            id="country"
            name="country"
            value={ownerData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {/* Add your country options here */}
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button type="submit" onClick={handleSubmit}>
          Add New Owner
        </Button>
      </div>
    </form>
  );
}
