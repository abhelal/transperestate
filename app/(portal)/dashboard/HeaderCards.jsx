"use client";

import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { PiDoorOpenThin, PiDoorDuotone, PiDoorThin } from "react-icons/pi";

export default function HeaderCards({ dashboardData }) {
  return (
    <div className="block space-y-3 lg:flex lg:space-y-0 items-center gap-3">
      <div className="w-full boxshadow-sm bg-white rounded-lg">
        <div className="w-full border-b px-4 py-2">
          <p>Total Properties</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.totalProperties}</p>
          <HiOutlineHome size={24} color="#3498db" />
        </div>
        {/* <div className="px-4 pb-2 text-sm">
                <span className={dashboardData.propertiesIncreased ? "text-green-500" : "text-red-400"}>
                  {dashboardData.propertyIncreatedPercent}%
                </span>{" "}
                <span>Since last month</span>
              </div> */}
      </div>
      <div className="w-full boxshadow-sm bg-white rounded-lg">
        <div className="w-full border-b px-4 py-2">
          <p>Total Apartment</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.totalApartments}</p>
          <PiDoorOpenThin size={24} color="#3498db" />
        </div>
        {/* <div className="px-4 pb-2 text-sm">
                <span className="text-red-400">-0.05%</span> <span>Since last month</span>
              </div> */}
      </div>

      <div className="w-full boxshadow-sm bg-white rounded-lg">
        <div className="w-full border-b px-4 py-2">
          <p>Rented Apartment</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.rentedApartments}</p>
          <PiDoorDuotone size={24} color="#3498db" />
        </div>
        {/* <div className="px-4 pb-2 text-sm">
                <span className="text-green-400">+0.05%</span> <span>Since last month</span>
              </div> */}
      </div>

      <div className="w-full boxshadow-sm bg-white rounded-lg">
        <div className="w-full border-b px-4 py-2">
          <p>Free Apartment</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.freeApartments}</p>
          <PiDoorThin size={24} color="#3498db" />
        </div>
        {/* <div className="px-4 pb-2 text-sm">
                <span className="text-green-400">+0.05%</span> <span>Since last month</span>
              </div> */}
      </div>
    </div>
  );
}
