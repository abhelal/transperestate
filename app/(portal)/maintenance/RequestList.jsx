"use client";

import React from "react";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "flowbite-react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";
import { BiMessageSquareDetail } from "react-icons/bi";
import Pagination from "@/components/ui/pagination";

export default function RequestList({ maintenances, totalPages }) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { showToast } = useToast();

  const updateStatus = async (status, maintenanceId) => {
    try {
      const res = await clientApi.put(`/maintenance/${maintenanceId}/update`, { status });
      showToast(res.data.message, "success");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  const startConversation = async (maintenanceId) => {
    try {
      const res = await clientApi.post(`/messages/${maintenanceId}/start`);
      router.push(`/message/${res.data.conversationId}`);
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl overflow-y-auto">
      <div className="grid grid-cols-10 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
        <p className="col-span-1">Complaint</p>
        <p className="col-span-2">Appartment</p>
        <p className="col-span-1">Date</p>
        <p className="col-span-4">Details</p>
        <p className="col-span-1 text-end pr-2">Status</p>
        <p className="col-span-1"></p>
      </div>
      <div className="flex flex-col h-0 grow overflow-y-auto">
        {maintenances.map((maintenance, i) => (
          <div key={i} className="grid grid-cols-10 p-3 px-4 items-center border-b text-sm">
            <div className="col-span-1">
              <p>{maintenance.maintenanceType}</p>
              <p className="text-xs text-secondary-400 whitespace-nowrap">ID:{maintenance.maintenanceId}</p>
            </div>
            <div className="col-span-2">
              <p>
                {maintenance.apartment.floor}-{maintenance.apartment.door} {", "}
                {maintenance.property.name}
              </p>
              <p className="text-xs text-secondary-400">
                {maintenance.property.buildingNo}, {maintenance.property.street}, {maintenance.property.city},{maintenance.property.zipCode}
                , {maintenance.property.country}
              </p>
            </div>

            <p className="col-span-1">{moment(maintenance.createdAt).format("ll")}</p>
            <p className="col-span-4">{maintenance.maintenanceDetails}</p>
            <p className="col-span-1 flex justify-end">
              <span
                className={`px-3 text-[10px] rounded-md bg-secondary-100 ${
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
            <div className="relative col-span-1 flex justify-end items-center gap-2 whitespace-nowrap">
              {/* <button>
                <BiMessageSquareDetail className="w-5 h-5" onClick={() => startConversation(maintenance.maintenanceId)} />
              </button> */}
              <Dropdown label="" renderTrigger={() => <BsThreeDotsVertical className="w-5 h-5" />} placement="bottom-start">
                {(user.role === "CLIENT" || user.role === "MANAGER" || user.role === "MAINTAINER" || user.role === "JANITOR") && (
                  <Dropdown.Item onClick={() => updateStatus("INPROGRESS", maintenance.maintenanceId)}>In Progress</Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => updateStatus("COMPLETED", maintenance.maintenanceId)}>Complete</Dropdown.Item>
                <Dropdown.Item onClick={() => updateStatus("CANCELLED", maintenance.maintenanceId)}>Cancel</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center p-2 border-t">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
