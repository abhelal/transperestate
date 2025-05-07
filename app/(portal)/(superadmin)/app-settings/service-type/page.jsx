import React from "react";
import serverApi from "@/libs/serverApi";
import AddNewType from "./AddNewType";
import ServiceTypeList from "./ServiceTypeList";

export default async function ServiceType() {
  // Fetch service types from the server
  const fetchServiceTypes = async () => {
    try {
      const res = await serverApi.get("/app-settings/service-type");
      return res.data || [];
    } catch (error) {
      console.error("Error fetching service types:", error);
      return [];
    }
  };
  const serviceTypes = await fetchServiceTypes();
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <AddNewType />
      <ServiceTypeList serviceTypes={serviceTypes} />
    </div>
  );
}
