"use client";

import React, { useState } from "react";
import { Checkbox, Button } from "flowbite-react";
import { notifications } from "@/constants/notifications";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";

export default function NotificationSettings({ currentNotifications = [] }) {
  const { showToast } = useToast();
  const [updatedNotifications, setUpdatedNotifications] = useState(currentNotifications);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectDeselectAll = () => {
    if (updatedNotifications.length === Object.values(notifications).length) {
      setUpdatedNotifications([]);
    } else {
      setUpdatedNotifications(Object.values(notifications));
    }
  };

  const handleNotificationChange = (notification) => {
    if (updatedNotifications.includes(notification)) {
      setUpdatedNotifications(updatedNotifications.filter((n) => n !== notification));
    } else {
      setUpdatedNotifications([...updatedNotifications, notification]);
    }
  };

  const handleSave = async () => {
    try {
      setIsProcessing(true);
      const res = await clientApi.post("/auth/update-notifications", { notifications: updatedNotifications });
      if (res.status === 200) {
        showToast("Notifications updated successfully", "success", "TC");
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
        <p className="text-lg font-semibold">Receive Notification</p>
        <div className="flex gap-3 items-center">
          <p className="font-semibold">Select All</p>
          <Checkbox checked={updatedNotifications.length === Object.values(notifications).length} onChange={selectDeselectAll} />
        </div>
      </div>

      <div className="">
        <div className="mt-4 flex justify-between items-center">
          <p>Maintenance</p>
          <Checkbox
            label="Maintenance"
            checked={updatedNotifications.includes(notifications.MAINTENANCE_NOTIFICATION)}
            onChange={() => handleNotificationChange(notifications.MAINTENANCE_NOTIFICATION)}
          />
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
