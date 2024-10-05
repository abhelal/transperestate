"use client";

import React, { useState } from "react";
import UpdateProperties from "@/components/UpdateProperties";
import UpdateInformation from "@/components/UpdateInfo";
import UpdatePassword from "@/components/UpdatePassword";
import UpdateUserStatus from "@/components/UpdateStatus";
import UpdateUserPermissions from "@/components/UpdatePermissions";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { validateInfo } from "@/validator/maintainer";

export default function UpdateMaintainer({ user }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const [info, setInfo] = useState({
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
  });

  const [data, setData] = useState({
    properties: user?.properties || [],
  });

  const [updatedPermissions, setUpdatedPermissions] = useState(user.permissions);

  const saveChanges = async () => {
    if (validateInfo(info, setErrors)) {
      try {
        setIsProcessing(true);
        await clientApi.put(`/user/update/permissions/${user.userId}`, {
          permissions: updatedPermissions,
        });

        await clientApi.put(`/user/update/info/${user.userId}`, info);

        const properties = data.properties.map((property) => property._id);
        await clientApi.put(`/user/update/properties/${user.userId}`, {
          properties,
        });

        showToast("Maintainer updated successfully", "success");
      } catch (error) {
        showToast(error.response.data.message, "error");
      } finally {
        setIsProcessing(false);
        router.refresh();
      }
    }
  };
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <UpdateUserStatus user={user} />
        <UpdatePassword user={user} />
        <UpdateProperties data={data} setData={setData} />
      </div>
      <div className="w-1/2 mt-4">
        <UpdateInformation errors={errors} data={info} setData={setInfo} />
        <UpdateUserPermissions updatedPermissions={updatedPermissions} setUpdatedPermissions={setUpdatedPermissions} />
        <div className="flex justify-end py-4">
          <Button onClick={saveChanges} isProcessing={isProcessing}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
