"use client";
import React from "react";
import clientApi from "@/libs/clientApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function MaintenanceStatusList({ maintenanceStatus }) {
  const router = useRouter();
  const { showToast } = useToast();
  // Delete maintenance status
  const deleteMaintenanceStatus = async (status) => {
    try {
      const res = await clientApi.delete(`/app-settings/maintenance-status/${status}`);
      if (res.status === 200) {
        router.refresh();
        showToast(res.data.message, "success");
      }
    } catch (error) {
      console.error("Error deleting maintenance status:", error);
      return null;
    }
  };
  return (
    <div className="w-full max-w-md p-4 card">
      <div className="mt-2">
        {!maintenanceStatus.length && (
          <p className="text-gray-500 dark:text-gray-400 text-center">No maintenance status available. Please add a new status.</p>
        )}
        {maintenanceStatus.map((status, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2">
            <span className="text-gray-800 dark:text-gray-200">{status}</span>
            <button onClick={() => deleteMaintenanceStatus(status)} className="text-red-500 hover:text-red-700">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
