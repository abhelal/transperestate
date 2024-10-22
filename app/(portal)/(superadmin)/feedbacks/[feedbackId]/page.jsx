import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";

export default async function FeedBackDetails({ params }) {
  const feedbackId = params.feedbackId;
  const res = await serverApi.get(`/feedback/${feedbackId}`).catch((e) => {});
  const feedback = res?.data?.feedback || {};

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between pb-4">
        <p className="text-xl font-semibold">Feedback Details</p>
      </div>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="p-2 px-4 items-center text-sm">
          <div className="flex justify-between">
            <div>
              <p className=" font-semibold">{feedback.feedbackBy?.name}</p>
              <p>{feedback.feedbackBy?.email}</p>
            </div>
            <div className=" underline">{moment(feedback.createdAt).format("LL")}</div>
          </div>
          <div className="mt-6">
            <p className=" font-semibold pb-3"># Feedback </p>
            <div>{feedback.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
