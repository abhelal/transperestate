import React from "react";
import RequestMaintenanceModal from "./RequestMaintenanceModal";
import serverApi from "@/libs/serverApi";
import RequestList from "./RequestList";

export default async function MaintenancePage({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  const res = await serverApi.get("/maintenance/list", { params: { page } }).catch((e) => {});
  const maintenances = res.data?.maintenances || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <div className="flex justify-between">
        <p className="text-xl font-semibold flex items-center gap-2">Maintenance Requests</p>
        <RequestMaintenanceModal />
      </div>
      <RequestList maintenances={maintenances} totalPages={totalPages} />
    </div>
  );
}
