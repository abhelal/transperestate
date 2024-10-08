import React from "react";
import serverApi from "@/libs/serverApi";
import UpdateProperties from "@/components/UpdateProperties";
import UpdateInformation from "@/components/UpdateInfo";
import UpdatePassword from "@/components/UpdatePassword";
import UpdateUserStatus from "@/components/UpdateStatus";
import UpdateUserPermissions from "@/components/UpdatePermissions";

export default async function Maintainer({ params }) {
  const id = params?.id;
  const res = await serverApi.get(`/user/managers/${id}`).catch((e) => {});
  const user = res?.data?.user || {};

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Manager</p>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 mt-4">
          <UpdateInformation user={user} />
          <UpdatePassword user={user} />
        </div>
        <div className="w-1/2">
          <UpdateUserStatus user={user} />
          <UpdateProperties user={user} />
          <UpdateUserPermissions user={user} />
        </div>
      </div>
    </div>
  );
}
