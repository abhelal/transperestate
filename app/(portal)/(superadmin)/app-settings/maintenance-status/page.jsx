import React from "react";
import serverApi from "@/libs/serverApi";
import MaintenanceStatusList from "./MaintenanceStatusList";
import AddNewStatus from "./AddNewStatus";

export default async function MaintenanceStatus() {
  // Fetch maintenance status from the server
  const fetchMaintenanceStatus = async () => {
    try {
      const res = await serverApi.get("/app-settings/maintenance-status");
      return res.data || [];
    } catch (error) {
      console.error("Error fetching maintenance status:", error);
      return [];
    }
  };
  const maintenanceStatus = await fetchMaintenanceStatus();
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <AddNewStatus />
      <MaintenanceStatusList maintenanceStatus={maintenanceStatus} />
    </div>
  );
}
