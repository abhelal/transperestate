"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { countryList } from "@/data/countryList";
import ErrorMessage from "@/components/ErrorMesssage";
import api from "@/libs/axios";
import { useToast } from "@/context/ToastContext";
import { validateUpdate } from "@/validator/company";
import { useRouter } from "next/navigation";

export default function UpdateForm({ setOpenModal, company }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [errors, setErrors] = useState({});

  const [companyData, setCompanyData] = useState({
    name: company.name,
    email: company.owner.email,
    password: "",
    contactNumber: company.contactNumber,
    address: company.address,
    country: company.country,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      if (validateUpdate(companyData, setErrors)) {
        const res = await api.put(`/company/${company.companyId}/update`, companyData);
        showToast(res.data.message, "success", "RB");
        router.refresh();
      }
    } catch (error) {
      showToast(error.response.data.message, "error", "RB");
    }
    setIsProcessing(false);
    setOpenModal(false);
  };

  const archiveCompany = async () => {
    setArchiving(true);
    try {
      const res = await api.put(`/company/${company.companyId}/archive`);
      showToast(res.data.message, "success", "RB");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error", "RB");
    }
    setArchiving(false);
    setOpenModal(false);
  };

  return (
    <div>
      <div>
        <p className="text-xl font-semibold">Update Company</p>
      </div>
      <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              name="name"
              value={companyData.name}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.name} />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <TextInput
              id="address"
              type="text"
              name="address"
              value={companyData.address}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.address} />
          </div>
        </div>
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="contactNumber" value="Contact Number" />
            </div>
            <TextInput
              id="contactNumber"
              type="tel"
              name="contactNumber"
              value={companyData.contactNumber}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.contactNumber} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="country" value="Country" />
            </div>
            <Select id="country" name="country" value={companyData.country} onChange={handleChange}>
              {countryList.map((country, index) => (
                <option key={index} value={country.value}>
                  {country.label}
                </option>
              ))}
            </Select>
            <ErrorMessage message={errors.country} />
          </div>
        </div>
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              value={companyData.email}
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
              placeholder="********"
              value={companyData.password}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.password} />
          </div>
        </div>
        <div className="flex justify-between">
          <Button outline onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <div className="flex items-center justify-end gap-4">
            <Button outline isProcessing={archiving} onClick={archiveCompany}>
              {company.archived ? "Unarchive" : "Archive"}
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
