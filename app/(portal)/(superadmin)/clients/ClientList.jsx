"use client";

import React from "react";
import Pagination from "@/components/ui/pagination";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function ClientList({ clients, totalPages }) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-3">Contact</p>
          <p className="col-span-1">Subscribed</p>
          <p className="col-span-2 text-center">Status</p>
          <div className="col-span-1 text-end">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu">
          {clients?.map((client, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm border-b">
              <p className="col-span-2">{client.userId}</p>
              <div className="col-span-3">
                <p>{client.name}</p>
                <p className="text-xs text-gray-400">{client?.client?.companyName}</p>
              </div>
              <div className="col-span-3 min-h-14">
                <div>{client.email}</div>
                <div>{client.contactNumber}</div>
                <div className="flex text-xs text-gray-500">
                  {client.street && (
                    <div>
                      {client.street} {client.buildingNo},
                    </div>
                  )}
                  {client.zipCode && (
                    <div>
                      {client.zipCode} {client.city},
                    </div>
                  )}
                  {client.country}
                </div>
              </div>
              <p className="col-span-1 px-4">{client.client?.isSubscribed ? "Yes" : "No"}</p>
              <div className="col-span-2 text-center">{client.status}</div>
              <div className="col-span-1 flex items-center justify-end gap-3">
                <Button outline size={"xs"} onClick={() => router.push(`/clients/${client.userId}`)}>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t flex w-full justify-center p-2">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
