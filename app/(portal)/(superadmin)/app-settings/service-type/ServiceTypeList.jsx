"use client";
import React from "react";
import clientApi from "@/libs/clientApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function ServiceTypeList({ serviceTypes }) {
  const router = useRouter();
  const { showToast } = useToast();
  // Delete service type
  const deleteServiceType = async (type) => {
    try {
      const res = await clientApi.delete(`/app-settings/service-type/${type}`);
      if (res.status === 200) {
        router.refresh();
        showToast(res.data.message, "success");
      }
    } catch (error) {
      console.error("Error deleting service type:", error);
      return null;
    }
  };
  return (
    <div className="w-full max-w-md p-4 card">
      <div className="mt-2">
        {!serviceTypes.length && (
          <p className="text-gray-500 dark:text-gray-400 text-center">No service types available. Please add a new type.</p>
        )}
        {serviceTypes.map((type, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2">
            <span className="text-gray-800 dark:text-gray-200">{type}</span>
            <button onClick={() => deleteServiceType(type)} className="text-red-500 hover:text-red-700">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
