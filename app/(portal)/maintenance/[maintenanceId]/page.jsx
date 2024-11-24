import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";

export default async function MaintenanceDetails({ params }) {
  const { maintenanceId } = params;
  const res = await serverApi.get(`/maintenance/${maintenanceId}`);
  const maintenance = res.data.maintenance;
  return (
    <div>
      <p className="font-semibold flex items-center gap-2">Maintenance : {maintenanceId}</p>
      <div className="mt-4 bg-light dark:bg-dark rounded-md p-4">
        <div className="grid grid-cols-8">
          <p>Maintenance Type</p>
          <p className="col-span-4">: {maintenance.maintenanceType}</p>
        </div>

        <div className="grid grid-cols-8">
          <p>Apartment</p>
          <p className="col-span-4">
            : {maintenance.apartment.floor}-{maintenance.apartment.door}, {maintenance.property.name}
          </p>
        </div>

        <div className="grid grid-cols-8">
          <p>Address</p>
          <p className="col-span-4">
            : {maintenance.property.buildingNo}, {maintenance.property.street}, {maintenance.property.city},{maintenance.property.zipCode},{" "}
            {maintenance.property.country}
          </p>
        </div>

        <div className="grid grid-cols-8">
          <p>Request Date</p>
          <p className="col-span-4">: {moment(maintenance.createdAt).format("ll")}</p>
        </div>

        <div className="grid grid-cols-8">
          <p>Status</p>
          <p className="col-span-4 flex">
            :
            <span
              className={`ml-1 px-3 rounded-full text-xs p-1 bg-gray-300 ${
                maintenance.maintenanceStatus === "COMPLETED"
                  ? "text-green-400"
                  : maintenance.maintenanceStatus === "INPROGRESS"
                  ? "text-yellow-400"
                  : maintenance.maintenanceStatus === "CANCELLED"
                  ? "text-red-400"
                  : "text-secondary-400"
              } `}
            >
              {maintenance.maintenanceStatus}
            </span>
          </p>
        </div>
        <div>
          <p className="mt-4 font-semibold">Details</p>
          <p className="mt-2">{maintenance.maintenanceDetails}</p>
        </div>
      </div>
    </div>
  );
}
