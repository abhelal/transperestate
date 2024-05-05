import React from "react";
import RequestMaintenanceModal from "./RequestMaintenanceModal";
import serverApi from "@/libs/serverApi";
import RequestList from "./RequestList";

export default async function Properties() {
  const res = await serverApi.get("/maintenance/list");
  const maintenances = res.data?.maintenances || [];

  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <div className="flex justify-between">
        <p className="text-xl font-semibold flex items-center gap-2">Maintenance Requests</p>
        <RequestMaintenanceModal />
      </div>
      <RequestList maintenances={maintenances} />
    </div>
  );
}
