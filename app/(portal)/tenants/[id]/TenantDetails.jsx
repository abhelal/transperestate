"use client";
import React, { useState } from "react";
import UpdateInformation from "@/components/UpdateInfo";
import TenantInfo from "./TenantInfo";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import clientApi from "@/libs/clientApi";
import { countryList } from "@/data/countryList";
import { useToast } from "@/context/ToastContext";
import { validateInfo } from "@/validator/tenant";

export default function TenantDetails({ user }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const [info, setInfo] = useState({
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
  });

  const tenant = user?.tenant;

  const [data, setData] = useState({
    birthDate: tenant?.birthDate,
    job: tenant?.job,
    familyMember: tenant?.familyMember,
    permAddress: tenant?.permAddress,
    permCountry: tenant?.permCountry || countryList[82].value,
    permCity: tenant?.permCity,
    permZipCode: tenant?.permZipCode,
  });

  const saveChanges = async () => {
    if (validateInfo({ ...info, ...data }, setErrors)) {
      try {
        setIsProcessing(true);

        await clientApi.put(`/user/update/info/${user.userId}`, info);
        await clientApi.put(`/tenants/info/update/${user.userId}`, data);
        showToast("Tenant updated successfully", "success");
      } catch (error) {
        showToast(error.response.data.message, "error");
      } finally {
        setIsProcessing(false);
        router.refresh();
      }
    }
  };

  return (
    <div className="flex w-full gap-4 pt-4">
      <div className="w-1/2">
        <UpdateInformation errors={errors} data={info} setData={setInfo} />
      </div>
      <div className="w-1/2">
        <TenantInfo user={user} errors={errors} data={data} setData={setData} />
        <div className="flex justify-end py-4">
          <Button onClick={saveChanges} isProcessing={isProcessing}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
