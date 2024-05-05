"use client";

import React from "react";
import Pagination from "@/components/ui/pagination";
import { Badge, Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function JanitorList({ totalPages = 1, managers = [] }) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-3">Contact</p>
          <p className="col-span-3">Property</p>
          <p className="col-span-1 text-center">Status</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {managers?.map((manager, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-2">{manager.userId}</p>
              <p className="col-span-2">{manager.name}</p>
              <div className="col-span-3">
                <p>{manager.contactNumber}</p>
                <p>{manager.email}</p>
              </div>
              <p className="col-span-3 flex flex-wrap gap-2">
                {manager.properties.map((property, index) => (
                  <Badge
                    key={index}
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => router.push(`/properties/${property.propertyId}`)}
                  >
                    {property.name}
                  </Badge>
                ))}
              </p>
              <div className="col-span-1 text-center">
                {manager.status === "ACTIVE" ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">{manager.status}</span>
                )}
              </div>
              <div className="col-span-1 flex justify-center">
                <Button outline size="xs" onClick={() => router.push(`managers/${manager.userId}`)}>
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
