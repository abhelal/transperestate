import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";

export default async function Feedback() {
  const res = await serverApi.get("/feedback");
  const feedbacks = res.data?.feedbacks || [];
  const totalPages = res.data?.totalPages || 1;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between pb-4">
        <p className="text-xl font-semibold">Feedbacks</p>
      </div>
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="hidden xl:grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <p className="col-span-2">Feedback By</p>
          <p className="col-span-6">Message</p>
          <p className="col-span-2">Date</p>
          <p className="col-span-2 text-end">Action</p>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu">
          {feedbacks?.map((feedback, index) => (
            <div key={index} className="xl:grid grid-cols-12 p-2 px-4 items-center text-sm border-b">
              <div className="col-span-2">
                <p className=" font-semibold">{feedback.feedbackBy.name}</p>
                <p>{feedback.feedbackBy.email}</p>
              </div>
              <div className="col-span-6 w-full pr-8">
                <p className="truncate">{feedback.message}</p>
              </div>
              <div className="col-span-2">{moment(feedback.createdAt).format("LL")}</div>
              <div className="col-span-2 flex items-center justify-end">
                <Link className=" text-primary-500" outline href={`/feedbacks/${feedback.feedbackId}`}>
                  View
                </Link>
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
