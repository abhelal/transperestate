"use client";

import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { countryList } from "@/data/countryList";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import ErrorMessage from "@/components/ErrorMesssage";
import { validateAddress } from "@/validator/auth";

export default function UpdateAddress({ address }) {
  const [data, setData] = useState({
    street: address.street,
    buildingNo: address.buildingNo,
    zipCode: address.zipCode,
    city: address.city,
    contactNumber: address.contactNumber,
    country: address.country,
  });
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateAddress = async () => {
    if (validateAddress(data, setErrors)) {
      setIsProcessing(true);
      try {
        const res = await clientApi.post("/auth/update-address", data);
        if (res.status === 200) {
          showToast("Address updated successfully", "success", "TC");
        }
      } catch (error) {
        showToast(error.response.data.message, "error", "TC");
      }
      setIsProcessing(false);
    }
  };

  return (
    <form className="flex flex-col w-full bg-light dark:bg-dark rounded-lg p-4">
      <p className="text-lg font-semibold">Contact Details</p>
      <div className="w-full my-3">
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="street" value="Street" />
            </div>
            <TextInput id="street" type="text" name="street" value={data.street} onChange={handleChange} />
            <ErrorMessage message={errors.street} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="buildingNo" value="Building Number" />
            </div>
            <TextInput id="buildingNo" type="text" name="buildingNo" value={data.buildingNo} onChange={handleChange} />
            <ErrorMessage message={errors.buildingNo} />
          </div>
        </div>
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="zipCode" value="Zip Code" />
            </div>
            <TextInput id="zipCode" type="text" name="zipCode" value={data.zipCode} onChange={handleChange} />
            <ErrorMessage message={errors.zipCode} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput id="city" type="text" name="city" value={data.city} onChange={handleChange} />
            <ErrorMessage message={errors.city} />
          </div>
        </div>

        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="contactNumber" value="Contact Number (Optional)" />
            </div>
            <TextInput id="contactNumber" type="text" name="contactNumber" value={data.contactNumber} onChange={handleChange} />
            <ErrorMessage message={errors.contactNumber} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="country" value="Country" />
            </div>
            <div>
              <Select id="country" name="country" value={data.country} onChange={handleChange} required>
                {countryList.map((country, i) => (
                  <option key={i} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Select>
              <ErrorMessage message={errors.country} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="button" onClick={() => handleUpdateAddress()} isProcessing={isProcessing}>
          Update Contact Details
        </Button>
      </div>
    </form>
  );
}
