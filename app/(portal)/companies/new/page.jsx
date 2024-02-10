"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { countryList } from "@/data/countryList";
import ErrorMessage from "@/components/ErrorMesssage";
import validateCompany from "@/validator/company";

export default function CreateNewCompany() {
  const [errors, setErrors] = useState({});
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    country: countryList[82].value,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validateCompany(companyData, setErrors)) {
      return;
    }
    // setCompanyData({
    //   name: "",
    //   email: "",
    //   password: "",
    //   contactNumber: "",
    //   address: "",
    //   country: countryList[82].value,
    // });
  };

  return (
    <div>
      <div>
        <p className="text-xl font-semibold">Create New Company</p>
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
            <Select
              className=" max-h-96 overflow-y-auto"
              id="country"
              name="country"
              value={companyData.country}
              onChange={handleChange}
            >
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
              value={companyData.password}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.password} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button onClick={() => handleSubmit()}>Create</Button>
        </div>
      </div>
    </div>
  );
}
