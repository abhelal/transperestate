"use client";

import React, { useState } from "react";
import { Checkbox, Button } from "flowbite-react";
import { serviceTypes } from "@/constants/serviceTypes";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";

export default function ServiceSettings({ services = [] }) {
  const { showToast } = useToast();
  const [updatedServices, setUpdatedServices] = useState(services);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectDeselectAll = () => {
    if (updatedServices.length === Object.keys(serviceTypes).length) {
      setUpdatedServices([]);
    } else {
      setUpdatedServices(Object.keys(serviceTypes));
    }
  };

  const handleServiceChange = (service) => {
    if (updatedServices.includes(service)) {
      setUpdatedServices(updatedServices.filter((n) => n !== service));
    } else {
      setUpdatedServices([...updatedServices, service]);
    }
  };

  const handleSave = async () => {
    try {
      setIsProcessing(true);
      const res = await clientApi.put("/provider/services", { services: updatedServices });
      if (res.status === 200) {
        showToast(res.data.message, "success", "TC");
      }
    } catch (error) {
      showToast(error.response.data.message, "error", "TC");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-light dark:bg-dark rounded-lg p-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">My Service Categories</p>
        <div className="flex gap-3 items-center">
          <p className="font-semibold">Select All</p>
          <Checkbox checked={updatedServices.length === Object.keys(serviceTypes).length} onChange={selectDeselectAll} />
        </div>
      </div>

      <div className="">
        <div className="mt-4 w-full space-y-3">
          {Object.keys(serviceTypes).map((service) => (
            <div key={service} className="flex items-center justify-between gap-3">
              <p className="">{serviceTypes[service]}</p>
              <Checkbox checked={updatedServices.includes(service)} onChange={() => handleServiceChange(service)} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="primary" isProcessing={isProcessing} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
