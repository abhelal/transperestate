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
      <div className="mt-4 w-full gap-2">
        <div className="grid grid-cols-2">
          <span>Maintenance Request</span>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <p>View</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.READ_MAINTENANCE)}
                onChange={() => handlePermissionChange(permissions.READ_MAINTENANCE)}
              />
            </div>
            <div className="flex items-center gap-1">
              <p>Update</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.UPDATE_MAINTENANCE)}
                onChange={() => handlePermissionChange(permissions.UPDATE_MAINTENANCE)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <span>Notifications</span>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <p>View</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.READ_MAINTENANCE)}
                onChange={() => handlePermissionChange(permissions.READ_MAINTENANCE)}
              />
            </div>
            <div className="flex items-center gap-1">
              <p>Update</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.UPDATE_MAINTENANCE)}
                onChange={() => handlePermissionChange(permissions.UPDATE_MAINTENANCE)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <span>Tenant</span>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <p>View</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.READ_TENANT)}
                onChange={() => handlePermissionChange(permissions.READ_TENANT)}
              />
            </div>
            <div className="flex items-center gap-1">
              <p>Update</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.UPDATE_TENANT)}
                onChange={() => handlePermissionChange(permissions.UPDATE_TENANT)}
              />
            </div>
            <div className="flex items-center gap-1">
              <p>Create</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.CREATE_TENANT)}
                onChange={() => handlePermissionChange(permissions.CREATE_TENANT)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <span>Finanace Report</span>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <p>View</p>
              <Checkbox
                checked={updatedPermissions.includes(permissions.READ_FINANCE)}
                onChange={() => handlePermissionChange(permissions.READ_FINANCE)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button size={"sm"} onClick={handleUpdatePermissions}>
          Save
        </Button>
      </div>
    </div>
  );
}

// {
//   permissions.map((permission, index) => (
//     <div key={index} className="flex items-center gap-3">
//       <Checkbox
//         name={permission.value}
//         checked={updatedPermissions.includes(permission.value)}
//         onChange={() => handlePermissionChange(permission.value)}
//       />
//       <span>{permission.name}</span>
//     </div>
//   ));
// }
