"use client";

import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { PiDoorOpenThin, PiDoorDuotone, PiDoorThin } from "react-icons/pi";

export default function HeaderCards({ dashboardData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:space-y-0 items-center gap-3">
      <div className="card">
        <div className="w-full border-b px-4 py-2">
          <p>Total Properties</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.totalProperties}</p>
          <HiOutlineHome size={24} color="#3498db" />
        </div>
      </div>
      <div className="card">
        <div className="w-full border-b px-4 py-2">
          <p>Total Apartment</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.totalApartments}</p>
          <PiDoorOpenThin size={24} color="#3498db" />
        </div>
      </div>
      <div className="card">
        <div className="w-full border-b px-4 py-2">
          <p>Rented Apartment</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.rentedApartments}</p>
          <PiDoorDuotone size={24} color="#3498db" />
        </div>
      </div>

      <div className="card">
        <div className="w-full border-b px-4 py-2">
          <p>Free Apartment</p>
        </div>
        <div className="flex w-full justify-between p-4">
          <p className="text-4xl font-semibold">{dashboardData.freeApartments}</p>
          <PiDoorThin size={24} color="#3498db" />
        </div>
      </div>
    </div>
  );
}
