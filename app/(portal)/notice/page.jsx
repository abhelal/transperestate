import React from "react";
import SendNewNotification from "./SendNew";
import NoticeList from "./NoticeList";
import serverApi from "@/libs/serverApi";

export default async function Notice({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/notification/list", { params: { page } }).catch((e) => {});
  const notifications = res?.data?.notifications || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-between pb-2">
        <p className="text-xl font-semibold">Notice</p>
        <SendNewNotification />
      </div>
      <NoticeList notifications={notifications} totalPages={totalPages} />
    </div>
  );
}
