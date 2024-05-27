import React from "react";
import TenantTabs from "./Tabs";
import serverApi from "@/libs/serverApi";

export default async function Tenant({ params }) {
  const id = params?.id;
  const res = await serverApi.get(`/user/tenants/${id}`).catch((e) => {});
  const user = res?.data?.user || {};

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Tenant</p>
      </div>
      <TenantTabs user={user} />
    </div>
  );
}
