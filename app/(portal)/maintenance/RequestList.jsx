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

export default function RequestList({ maintenances }) {
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
      <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
        <p className="col-span-2">Complaint</p>
        <p className="col-span-2">Property</p>
        <p className="col-span-1 text-center">Appartment</p>
        <p className="col-span-1 text-center">Date</p>
        <p className="col-span-4 px-6">Details</p>
        <p className="col-span-1">Status</p>
        <p className="col-span-1"></p>
      </div>
      <div className="flex flex-col h-0 grow overflow-y-auto">
        {maintenances.map((maintenance, i) => (
          <div key={i} className="grid grid-cols-12 p-2 px-4 items-center border-b text-sm">
            <div className="col-span-2">
              <p>{maintenance.maintenanceType}</p>
              <p className="text-xs text-secondary-400 whitespace-nowrap">ID : {maintenance.maintenanceId}</p>
            </div>
            <div className="col-span-2">
              <p>{maintenance.property.name}</p>
              <p className="text-xs text-secondary-400">
                {maintenance.property.buildingNo}, {maintenance.property.street}, {maintenance.property.city},{maintenance.property.zipCode}
                , {maintenance.property.country}
              </p>
            </div>
            <p className="col-span-1 text-center uppercase">
              {maintenance.apartment.floor}-{maintenance.apartment.door}
            </p>
            <p className="col-span-1 text-center">{moment(maintenance.createdAt).format("ll")}</p>
            <p className="col-span-4 pl-8">{maintenance.maintenanceDetails}</p>
            <p className="col-span-1">
              <span
                className={`px-2 py-1 text-xs rounded-md bg-secondary-100 ${
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
              <button>
                <BiMessageSquareDetail className="w-5 h-5" onClick={() => startConversation(maintenance.maintenanceId)} />
              </button>
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
    </div>
  );
}
