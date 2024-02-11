"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import api from "@/libs/axios";
import { useToast } from "@/context/ToastContext";
import { validateUpdate } from "@/validator/company";
import { useRouter } from "next/navigation";
import { LinkButtonOutlined } from "@/components/ui/Link";

export default function UpdateCompany({ user, companies }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    contactNumber: user.contactNumber,
    address: user.address,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      if (validateUpdate(userData, setErrors)) {
        const res = await api.put(`/company/${company.companyId}/update`, userData);
        showToast(res.data.message, "success", "RB");
        router.refresh();
      }
    } catch (error) {
      showToast(error.response.data.message, "error", "RB");
    }
    setIsProcessing(false);
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
              value={userData.name}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.name} />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="status" value="Status" />
            </div>
            <Select id="status" name="status" value={userData.status} onChange={handleChange}>
              <option value={"ACTIVE"}>{"Active"}</option>
              <option value={"INACTIVE"}>{"Inactive"}</option>
              <option value={"DELETED"}>{"Deleted"}</option>
            </Select>
            <ErrorMessage message={errors.status} />
          </div>
        </div>
        <div className="md:flex items-center gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="company" value="Company" />
            </div>
            <Select id="company" name="company" value={userData.company} onChange={handleChange}>
              {companies.map((company) => (
                <option key={company.companyId} value={company.name}>
                  {company.name}
                </option>
              ))}
            </Select>
            <ErrorMessage message={errors.company} />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            <Select id="role" name="role" value={userData.role} onChange={handleChange}>
              <option value={"ADMIN"}>{"Admin"}</option>
              <option value={"MAINTAINER"}>{"Maintainer"}</option>
              <option value={"TENANTS"}>{"Tenants"}</option>
            </Select>
            <ErrorMessage message={errors.role} />
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
              value={userData.email}
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
              value={userData.password}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.password} />
          </div>
        </div>
        <div className="flex justify-between">
          <LinkButtonOutlined href={"/users"}>Back</LinkButtonOutlined>
          <div className="flex items-center justify-end gap-4">
            <Button isProcessing={isProcessing} onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
