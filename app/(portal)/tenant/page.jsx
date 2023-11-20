"use client";

import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const properties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Properties() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <p className="text-xl font-semibold">Tenants</p>
      <div className="flex justify-between">
        <div className="w-full max-w-xs flex items-center bg-white p-1.5 px-4 rounded-lg">
          <div>
            <MagnifyingGlassIcon className="w-5 h-5" />
          </div>
          <input
            className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
            placeholder="Search tenants"
          ></input>
        </div>
        <Button onClick={() => router.push("/tenant/new")}>Add New</Button>
      </div>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-2 px-8 border-b bg-gray-200 rounded-t-xl text-sm">
          <p className="col-span-3">Name</p>
          <p className="col-span-2">Propery</p>
          <p className="col-span-2 text-center">Appartment</p>
          <p className="col-span-1 text-center">Start Date</p>
          <p className="col-span-2 text-center">Rent/Month</p>
          <p className="col-span-1 text-center">Total Due</p>
          <div className="col-span-1 flex justify-end">
            <button className="flex items-center gap-2 px-2">
              <p>Filter</p>
              <FunnelIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto">
          {properties.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-12 p-2 items-center border-b text-sm"
            >
              <div className="col-span-3 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={"/images/photo1.png"}
                    fill
                    className=" object-cover"
                  />
                </div>
                <p>John Don</p>
              </div>
              <div className="col-span-2">
                <p>Sky blue city house</p>
                <p className="text-xs text-secondary-400">
                  123, ABC Street, Frankfut
                </p>
              </div>
              <p className="col-span-2 text-center">3B</p>
              <p className="col-span-1 text-center">01-Jun-2022</p>
              <p className="col-span-2 text-center">$ 1020 </p>
              <p className="col-span-1 text-center">$ 0 </p>
              <div className="col-span-1">
                <button
                  onClick={() => router.push("/tenant/123456")}
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
