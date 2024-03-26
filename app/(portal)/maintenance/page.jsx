"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/libs/hooks";
import StatusCards from "./StatusCards";
import RequestMaintenanceModal from "./RequestMaintenanceModal";
import clientApi from "@/libs/clientApi";
import moment from "moment";

export default function Properties() {
  const { user } = useAppSelector((state) => state.user);
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    async function getMaitenances() {
      try {
        const res = await clientApi.get("/maintenance/list");
        setMaintenances(res.data.maintenances);
      } catch (error) {
        console.log(error);
      }
    }
    getMaitenances();
  }, [user]);

  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <p className="text-xl font-semibold flex items-center gap-2">Maintenance Requests</p>
      {user.role != "TENANT" ? <StatusCards /> : <RequestMaintenanceModal />}
      <div className="flex flex-col w-full h-full bg-white rounded-xl overflow-y-auto">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">Complaint</p>
          <p className="col-span-2">Property</p>
          <p className="col-span-1 text-center">Appartment</p>
          <p className="col-span-1 text-center">Date</p>
          <p className="col-span-4 px-6">Details</p>
          <p className="col-span-1">Status</p>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto">
          {maintenances.map((maintenance, i) => (
            <div key={i} className="grid grid-cols-12 p-2 px-4 items-center border-b text-sm">
              <div className="col-span-2">
                <p>{maintenance.maintenanceType}</p>
                <p className="text-xs text-secondary-400 whitespace-nowrap">
                  ID : {maintenance.maintenanceId}
                </p>
              </div>
              <div className="col-span-2">
                <p>{maintenance.property.name}</p>
                <p className="text-xs text-secondary-400">
                  {maintenance.property.buildingNo}, {maintenance.property.street},{" "}
                  {maintenance.property.city},{maintenance.property.zipCode},{" "}
                  {maintenance.property.country}
                </p>
              </div>
              <p className="col-span-1 text-center uppercase">
                {maintenance.apartment.floor}-{maintenance.apartment.door}
              </p>
              <p className="col-span-1 text-center">{moment(maintenance.createdAt).format("ll")}</p>
              <p className="col-span-4 pl-8">{maintenance.maintenanceDetails}</p>
              <p className="col-span-1">
                <span className="px-2 py-1 text-xs rounded-md bg-secondary-100 text-secondary-400">
                  {maintenance.maintenanceStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
