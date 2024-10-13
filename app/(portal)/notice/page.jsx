import React from "react";
import SendNewNotification from "./SendNew";
import NoticeList from "./NoticeList";
import serverApi from "@/libs/serverApi";
import ServerError from "@/components/ServerError";

export default async function Notice({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  let errorMessage = null;
  const res = await serverApi.get("/notice/list", { params: { page } }).catch((e) => {
    errorMessage = e.response.data.message;
  });

  if (errorMessage) return <ServerError message={errorMessage} />;

  const notices = res?.data?.notices || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-between pb-2">
        <p className="text-xl font-semibold">Notice</p>
        <SendNewNotification />
      </div>
      <NoticeList notices={notices} totalPages={totalPages} />
    </div>
  );
}
