"use client";

import Search from "@/components/ui/Search";
import { FunnelIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CreateNewModal from "./CreateModal";

export default function Properties() {
  const router = useRouter();
  const properties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Properties</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Properties" />
          <CreateNewModal />
        </div>
      </div>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-2 px-8 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-3">Name</p>
          <p className="col-span-3">Address</p>
          <p className="col-span-2 text-center">Appartment</p>
          <p className="col-span-1 text-center">Tenants</p>
          <p className="col-span-2 text-center">Last Monitored</p>
          <div className="col-span-1 flex justify-center">
            <button className="flex items-center gap-2 px-2">
              <p>Filter</p>
              <FunnelIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto divide-y">
          {properties.map((p, i) => (
            <div key={i} className="grid grid-cols-12 p-2 items-center text-sm">
              <div className="col-span-3 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={"/images/building2.png"}
                    width={40}
                    height={40}
                    className="object-cover"
                    priority
                    alt=""
                  />
                </div>
                <p>Sky Blue tower</p>
              </div>
              <p className="col-span-3">1234, ABC, Germany</p>
              <p className="col-span-2 text-center">24</p>
              <p className="col-span-1 text-center">20</p>
              <p className="col-span-2 text-center">20-Oct-2023</p>
              <div className="col-span-1">
                <button
                  onClick={() => router.push("/property/12345678")}
                  className="border p-1 px-6 rounded-md"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
