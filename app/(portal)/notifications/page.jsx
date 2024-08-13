import React from "react";
import SendNewNotification from "./SendNew";
import NotificationList from "./NotificationList";
import serverApi from "@/libs/serverApi";

export default async function Notifications({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/notification/list", { params: { page } }).catch((e) => {});
  const notifications = res?.data?.notifications || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col grow">
      <div className="pb-4">
        <div className="mt-2 flex justify-between pr-2">
          <p className="text-xl font-semibold">Notifications</p>
          <SendNewNotification />
        </div>
      </div>
      <NotificationList notifications={notifications} totalPages={totalPages} />
    </div>
  );
}
