"use client";
import DeleteModal from "@/components/DeleteModal";
import clientApi from "@/libs/clientApi";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";

export default function NotificationList({ notifications, totalPages }) {
  const [openModal, setOpenModal] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const openDeleteConfirmation = (id) => {
    setNotificationId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await clientApi.delete(`/notification/${notificationId}`);
      showToast(res.data.message, "success");
      setOpenModal(false);
      setNotificationId("");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col h-full rounded-lg bg-white pt-2">
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={handleDelete} isDeleting={isDeleting} />
      <div className="flex flex-col h-0 grow overflow-y-auto p-4">
        {notifications.map((notification, index) => (
          <div key={index} className="relative w-full rounded-lg boxshadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{notification.title}</p>
                <p className="text-xs">{new Date(notification.date).toDateString()}</p>
              </div>
              <div>
                <Button outline size={"xs"} onClick={() => openDeleteConfirmation(notification.notificationId)}>
                  Delete
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm">{notification.body}</p>
            <div className="mt-4 flex gap-2">
              {notification.properties.map((property, ind) => (
                <span key={ind} className="text-xs p-0.5 px-2 border rounded-full">
                  {property.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t flex w-full justify-center p-2">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
