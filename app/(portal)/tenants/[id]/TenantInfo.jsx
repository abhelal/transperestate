"use client";

import React from "react";
import { Button, Label, TextInput, Select, Datepicker, Textarea } from "flowbite-react";
import { countryList } from "@/data/countryList";
import ErrorMessage from "@/components/ErrorMesssage";

export default function TenantInfo({ errors, data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="birthDate" value="Birth Date" />
        </div>
        <Datepicker
          id="birthData"
          name="birthDate"
          maxDate={new Date()}
          value={data.birthDate ? new Date(data.birthDate) : new Date()}
          onChange={(date) => setData((prevData) => ({ ...prevData, birthDate: date }))}
        />
        <ErrorMessage message={errors.birthDate} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="job" value="Job Title" />
          </div>
          <TextInput
            id="job"
            name="job"
            type="text"
            placeholder="Enter your job"
            required
            shadow
            value={data.job}
            onChange={handleChange}
          />

          <ErrorMessage message={errors.job} />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="familyMember" value="Family Member" />
          </div>
          <TextInput
            id="familyMember"
            name="familyMember"
            type="number"
            placeholder="Enter number"
            required
            shadow
            value={data.familyMember}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.familyMember} />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="permAddress" value="Permanent Address" />
        </div>
        <Textarea
          id="permAddress"
          name="permAddress"
          type="text"
          placeholder="Enter your address"
          required
          shadow
          value={data.permAddress}
          onChange={handleChange}
        />

        <ErrorMessage message={errors.permAddress} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-1/3">
          <TextInput
            id="permCity"
            name="permCity"
            type="text"
            placeholder="Enter your city"
            required
            shadow
            value={data.permCity}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.permCity} />
        </div>
        <div className="w-full md:w-1/3">
          <TextInput
            id="permZipCode"
            name="permZipCode"
            type="text"
            placeholder="Enter your zip code"
            required
            shadow
            value={data.permZipCode}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.permZipCode} />
        </div>
        <div className="w-full md:w-1/3">
          <Select id="permCountry" name="permCountry" value={data.permCountry} required onChange={handleChange}>
            {countryList.map((country, i) => (
              <option key={i} value={country.value}>
                {country.label}
              </option>
            ))}
          </Select>
          <ErrorMessage message={errors.permCountry} />
        </div>
      </div>
    </div>
  );
}
