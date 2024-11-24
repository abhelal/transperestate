import React from "react";

import serverApi from "@/libs/serverApi";
import Search from "@/components/ui/Search";
import moment from "moment";
import Action from "./Action";
import Pagination from "@/components/ui/pagination";

export default async function ContactMessage({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/contact", { params: { query, page } }).catch((e) => {});

  const messages = res?.data?.contacts || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between pb-4">
        <p className="text-xl font-semibold">Contact Messages</p>
        <div className="mt-2 flex items-center justify-between">
          <Search placeholder="Search message" />
        </div>
      </div>
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <p className="col-span-2">Contact</p>
          <p className="col-span-8">Message</p>
          <p className="col-span-1 text-center">Date</p>
          <p className="col-span-1">Responded</p>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu">
          {messages?.map((message, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm border-b">
              <div className="col-span-2">
                <p className=" font-semibold">{message.name}</p>
                <p>{message.email}</p>
                <p>{message.phone}</p>
              </div>
              <div className="col-span-8 min-h-14">
                <div>{message.message}</div>
              </div>
              <div className="col-span-1 text-center">{moment(message.createdAt).format("ll")}</div>
              <div className="col-span-1 text-center">
                <Action message={message} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center p-2 border-t">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
