"use client";

import React from "react";
import Pagination from "@/components/ui/pagination";
import { Badge, Button } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";

export default function UserList({ totalPages = 1, users = [] }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="hidden xl:grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-3">Contact</p>
          <p className="col-span-3">Property</p>
          <p className="col-span-1 text-center">Status</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {users?.map((user, index) => (
            <div key={index} className="xl:grid grid-cols-12 p-2 px-4 items-center text-sm">
              <div className="col-span-2 flex justify-between items-center">
                <p>{user?.userId}</p>
                <div className="flex xl:hidden items-center gap-3">
                  <div>
                    {user?.status === "ACTIVE" ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">{user?.status}</span>
                    )}
                  </div>
                  <Button outline size="xs" onClick={() => router.push(`${pathname.split("/")[1]}/${user?.userId}`)}>
                    View
                  </Button>
                </div>
              </div>
              <p className="col-span-2">{user?.name}</p>
              <div className="col-span-3">
                <p>{user?.contactNumber}</p>
                <p>{user?.email}</p>
              </div>
              <p className="col-span-3 flex flex-wrap gap-2">
                {user?.properties.map((property, index) => (
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
              <div className="hidden xl:block col-span-1 text-center">
                {user?.status === "ACTIVE" ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">{user?.status}</span>
                )}
              </div>
              <div className="col-span-1 hidden xl:flex justify-center">
                <Button outline size="xs" onClick={() => router.push(`${pathname.split("/")[1]}/${user?.userId}`)}>
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
