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
          <p className="col-span-3">Adress</p>
          <p className="col-span-1">Subscribed</p>
          <p className="col-span-2 text-center">Status</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {clients?.map((client, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-2">{client.userId}</p>
              <p className="col-span-3">{client.name}</p>
              <p className="col-span-3">{client.client?.address}</p>
              <p className="col-span-1 px-4">{client.client?.isSubscribed ? "Yes" : "No"}</p>
              <div className="col-span-2 text-center">{client.status}</div>
              <div className="col-span-1 flex items-center justify-end gap-3">
                <Button
                  outline
                  size={"sm"}
                  onClick={() => router.push(`/clients/${client.userId}`)}
                >
                  <span className="whitespace-normal">View</span>
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
