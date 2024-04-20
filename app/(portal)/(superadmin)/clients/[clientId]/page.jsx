import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";

export default async function ClientPage({ params }) {
  const res = await serverApi.get(`/clients/${params?.clientId}`).catch((e) => console.error(e));
  const client = res?.data?.client || {};

  return (
    <div>
      <p className="font-semibold px-2">{client?.name}</p>
      <div className="mt-3 lg:flex w-full gap-4">
        <div className="w-full lg:w-1/2">
          <div className=" bg-white boxshadow-sm rounded-lg p-4">
            <p className="text-lg px-2">Client Information</p>
            <div className="mt-4">
              <div className="mt-4 rounded-lg overflow-hidden">
                <div className="flex justify-between gap-2 bg-slate-100 p-1 px-3">
                  <p className="text-gray-500">Client ID : </p>
                  <p>{client?.userId}</p>
                </div>
                <div className="flex justify-between gap-2 bg-slate-50 p-1 px-3">
                  <p className="text-gray-500">Email : </p>
                  <p>{client?.email}</p>
                </div>
                <div className="flex justify-between gap-2 bg-slate-100 p-1 px-3">
                  <p className="text-gray-500">Phone : </p>
                  <p>{client?.client?.contactNumber}</p>
                </div>
                <div className="flex justify-between gap-2 bg-slate-50 p-1 px-3">
                  <p className="text-gray-500">Address : </p>
                  <p>{client?.address}</p>
                </div>
                <div className="flex justify-between gap-2 bg-slate-100 p-1 px-3">
                  <p className="text-gray-500">Country : </p>
                  <p>{client?.country}</p>
                </div>
                <div className="flex justify-between gap-2 bg-slate-50 p-1 px-3">
                  <p className="text-gray-500">Member Since : </p>
                  <p>{moment(client?.createdAt).format("ll")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-white boxshadow-sm rounded-lg p-4">
            <p className="text-lg px-2">Subscription</p>
            <div className="mt-4">
              <div className="flex justify-between gap-2 bg-slate-50 p-1 px-3">
                <p className="text-gray-500">Subscribed : </p>
                <p>{client?.client?.isSubscribed ? "Yes" : "No"}</p>
              </div>
              <div className="flex justify-between gap-2 bg-slate-100 p-1 px-3">
                <p className="text-gray-500">Subscription Plan : </p>
                <p>{client?.client?.subscriptionPlan}</p>
              </div>
              <div className="flex justify-between gap-2 bg-slate-50 p-1 px-3">
                <p className="text-gray-500">Status : </p>
                <p>{client?.status}</p>
              </div>

              <div className="flex justify-between gap-2 bg-slate-100 p-1 px-3">
                <p className="text-gray-500">End Date : </p>
                <p>
                  {client?.client?.isSubscribed &&
                    moment(client?.client?.subscriptionValidUntil).format("ll")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white boxshadow-sm rounded-lg p-4">
            <p className="text-lg px-2">Client Properties</p>
            <div className="mt-4 rounded-lg overflow-hidden">
              <div className=" min-h-6">
                {client?.properties?.map((property, index) => (
                  <div key={index} className="flex gap-2 p-1 px-3">
                    <p>{index + 1}.</p>
                    <p>{property?.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}