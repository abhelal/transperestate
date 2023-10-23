import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function Properties() {
  const properties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <p className="text-xl font-semibold">Properties</p>
      <div className="flex justify-between">
        <div className="w-full max-w-xs flex items-center bg-white p-1.5 px-4 rounded-lg">
          <div>
            <MagnifyingGlassIcon className="w-5 h-5" />
          </div>
          <input
            className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
            placeholder="Search property"
          ></input>
        </div>
        <button className="bg-white px-8 p-1 rounded-md">Add New </button>
      </div>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-2 px-8 border-b bg-gray-200 rounded-t-xl">
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
        <div className="flex flex-col h-0 grow overflow-y-auto">
          {properties.map((p, i) => (
            <div key={i} className="grid grid-cols-12 p-2 items-center border-b text-sm">
              <div className="col-span-3 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                  <Image src={"/images/building2.png"} fill className=" object-cover" />
                </div>
                <p>Sky Blue tower</p>
              </div>
              <p className="col-span-3">1234, ABC, Germany</p>
              <p className="col-span-2 text-center">24</p>
              <p className="col-span-1 text-center">20</p>
              <p className="col-span-2 text-center">20-Oct-2023</p>
              <div className="col-span-1">
                <button className="border p-1 px-6 rounded-md"> Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
