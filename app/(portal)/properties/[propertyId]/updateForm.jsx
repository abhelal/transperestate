"use client";

import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { countryList } from "@/data/countryList";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { validateUpdate } from "@/validator/property";
import { propertyTypes } from "@/constants/propertyTypes";
import { useAppDispatch } from "@/libs/hooks";
import { fetchProperty } from "@/libs/features/property/propertyActions";

export default function UpdateForm({ setOpenModal, property }) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [errors, setErrors] = useState({});

  const [propertyData, setPropertyData] = useState({
    name: property.name,
    propertyType: property.propertyType,
    street: property.street,
    buildingNo: property.buildingNo,
    zipCode: property.zipCode,
    city: property.city,
    country: property.country,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      if (validateUpdate(propertyData, setErrors)) {
        const res = await clientApi.put(`/properties/${property.propertyId}/update`, propertyData);
        showToast(res.data.message, "success");
        dispatch(fetchProperty(property.propertyId));
        setOpenModal(false);
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  const archiveProperty = async () => {
    setArchiving(true);
    try {
      const res = await clientApi.put(`/properties/${property.propertyId}/archive`);
      showToast(res.data.message, "success");
      dispatch(fetchProperty(property.propertyId));
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setArchiving(false);
    setOpenModal(false);
  };

  return (
    <div>
      <div>
        <p className="text-xl font-semibold">Update Company</p>
      </div>
      <div className="mt-4 flex flex-col bg-light dark:bg-dark p-4 rounded-lg">
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput id="name" type="text" name="name" value={propertyData.name} onChange={handleChange} />
            <ErrorMessage message={errors.name} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="propertyType" value="Property Type" />
            </div>
            <Select id="propertyType" name="propertyType" value={propertyData.propertyType} onChange={handleChange} required>
              {propertyTypes.map((type, i) => (
                <option key={i} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
            <ErrorMessage message={errors.propertyType} />
          </div>
        </div>
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="street" value="Street" />
            </div>
            <TextInput id="street" type="text" name="street" value={propertyData.street} onChange={handleChange} />
            <ErrorMessage message={errors.street} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="buildingNo" value="Building No" />
            </div>
            <TextInput id="buildingNo" type="text" name="buildingNo" value={propertyData.buildingNo} onChange={handleChange} />
            <ErrorMessage message={errors.buildingNo} />
          </div>
        </div>
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="zipCode" value="Zip Code" />
            </div>
            <TextInput id="zipCode" type="text" name="zipCode" value={propertyData.zipCode} onChange={handleChange} />
            <ErrorMessage message={errors.zipCode} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput id="city" type="text" name="city" value={propertyData.city} onChange={handleChange} />
            <ErrorMessage message={errors.city} />
          </div>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="country" value="Country" />
        </div>
        <div>
          <Select id="country" name="country" value={propertyData.country} onChange={handleChange} required>
            {countryList.map((country, i) => (
              <option key={i} value={country.value}>
                {country.label}
              </option>
            ))}
          </Select>
          <ErrorMessage message={errors.country} />
        </div>
        <div className="flex justify-between">
          <Button outline onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <div className="flex items-center justify-end gap-4">
            <Button outline isProcessing={archiving} onClick={archiveProperty}>
              {property.archived ? "Unarchive" : "Archive"}
            </Button>
            <Button isProcessing={isProcessing} onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
