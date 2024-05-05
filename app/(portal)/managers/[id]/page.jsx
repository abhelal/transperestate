import React from "react";
import serverApi from "@/libs/serverApi";
import ServiceProvider from "@/components/ServiceProvider";

export default async function Maintainer({ params }) {
  const id = params?.id;
  const res = await serverApi.get(`/user/managers/${id}`).catch((e) => {});
  const user = res?.data?.user || {};

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Manager</p>
      </div>
      <ServiceProvider user={user} />
    </div>
  );
}
