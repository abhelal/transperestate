"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { Button, Checkbox } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { permissions } from "@/constants/permissions";

export default function UpdateUserPermissions({ user }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [updatedPermissions, setUpdatedPermissions] = useState(user.permissions);

  const handlePermissionChange = (permission) => {
    if (updatedPermissions.includes(permission)) {
      setUpdatedPermissions(updatedPermissions.filter((p) => p !== permission));
    } else {
      setUpdatedPermissions([...updatedPermissions, permission]);
    }
  };

  const handleUpdatePermissions = async () => {
    try {
      const res = await clientApi.put(`/user/update/permissions/${user.userId}`, {
        permissions: updatedPermissions,
      });
      showToast(res.data.message, "success");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
      <p className="text-lg font-semibold">Permissions</p>
      <div className="mt-4 w-full grid grid-cols-2 gap-2">
        {permissions.map((permission, index) => (
          <div key={index} className="flex items-center gap-3">
            <Checkbox
              name={permission.value}
              checked={updatedPermissions.includes(permission.value)}
              onChange={() => handlePermissionChange(permission.value)}
            />
            <span>{permission.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button size={"sm"} onClick={handleUpdatePermissions}>
          Save
        </Button>
      </div>
    </div>
  );
}
