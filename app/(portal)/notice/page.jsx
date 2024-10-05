import React from "react";
import SendNewNotification from "./SendNew";
import NoticeList from "./NoticeList";
import serverApi from "@/libs/serverApi";
import Calendar from "@/components/Calendar";

export default async function Notice({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/notification/list", { params: { page } }).catch((e) => {});
  const notifications = res?.data?.notifications || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col grow">
      <div className="pb-4">
        <div className="mt-2 flex justify-between pr-2">
          <p className="text-xl font-semibold">Notice</p>
          <SendNewNotification />
        </div>
      </div>
      <div className="h-full grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <NoticeList notifications={notifications} totalPages={totalPages} />
        </div>

        <div className="col-span-3">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
