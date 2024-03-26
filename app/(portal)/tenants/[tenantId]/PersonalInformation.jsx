"use client";

import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Select, Datepicker, Textarea } from "flowbite-react";
import { countryList } from "@/data/countryList";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import { validateInfo } from "@/validator/tenant";
import clientApi from "@/libs/clientApi";
import { fetchTenants } from "@/libs/features/tenant/tenantActions";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import moment from "moment";

export default function PersonalInformation() {
  const dispatch = useAppDispatch();
  const { tenant, loadingTenant } = useAppSelector((state) => state.tenant);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const [data, setData] = useState({
    name: "",
    birthDate: "",
    email: "",
    contactNumber: "",
    job: "",
    familyMember: "",
    permAddress: "",
    permCountry: countryList[82].value,
    permCity: "",
    permZipCode: "",
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
      if (validateInfo(data, setErrors)) {
        const res = await clientApi.put(`/tenants/${tenant.userId}/update/info`, data);
        dispatch(fetchTenants());
        showToast(res.data.message, "success");
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    if (tenant) {
      setData({
        name: tenant?.name,
        email: tenant.email,
        contactNumber: tenant?.contactNumber,
        birthDate: tenant.tenant?.birthDate,
        job: tenant.tenant?.job,
        familyMember: tenant.tenant?.familyMember,
        permAddress: tenant.tenant?.permAddress,
        permCountry: tenant.tenant?.permCountry
          ? tenant.tenant?.permCountry
          : countryList[82].value,
        permState: tenant.tenant?.permState,
        permCity: tenant.tenant?.permCity,
        permZipCode: tenant.tenant?.permZipCode,
      });
    }
  }, [tenant]);

  if (loadingTenant) return <BodySkeleton />;
  else
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full flex-col bg-white rounded-lg">
          <p className="text-lg font-semibold">Personal Information</p>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="Name" value="Name" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                shadow
                value={data.name}
                onChange={handleChange}
              />
              <ErrorMessage message={errors.name} />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="birthDate" value="Birth Date" />
              </div>
              <Datepicker
                id="birthData"
                name="birthDate"
                maxDate={new Date()}
                value={data.birthDate ? moment(data.birthDate).format("ll") : moment().format("ll")}
                onSelectedDateChanged={(date) =>
                  setData((prevData) => ({ ...prevData, birthDate: date }))
                }
              />
              <ErrorMessage message={errors.birthDate} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                shadow
                value={data.email}
                onChange={handleChange}
              />
              <ErrorMessage message={errors.email} />
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="contactNumber" value="Contact Number" />
              </div>
              <TextInput
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="Enter your contact number"
                required
                shadow
                value={data.contactNumber}
                onChange={handleChange}
              />
              <ErrorMessage message={errors.contactNumber} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="job" value="Job" />
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
                placeholder="Enter number of family members"
                required
                shadow
                value={data.familyMember}
                onChange={handleChange}
              />
              <ErrorMessage message={errors.familyMember} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col bg-white rounded-lg">
          <p className="text-lg font-semibold">Permanent Address</p>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="permAddress" value="Address" />
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
              <div className="mb-2 block">
                <Label htmlFor="permCountry" value="Country" />
              </div>
              <Select
                id="permCountry"
                name="permCountry"
                value={data.permCountry}
                required
                onChange={handleChange}
              >
                {countryList.map((country, i) => (
                  <option key={i} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Select>
              <ErrorMessage message={errors.permCountry} />
            </div>

            <div className="w-full md:w-1/3">
              <div className="mb-2 block">
                <Label htmlFor="permCity" value="City" />
              </div>
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
              <div className="mb-2 block">
                <Label htmlFor="permZipCode" value="Zip Code" />
              </div>
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
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit" isProcessing={isProcessing} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    );
}
