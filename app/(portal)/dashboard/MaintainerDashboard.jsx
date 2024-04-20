"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUsers, FaHome, FaMoneyBillAlt, FaMoneyCheckAlt } from "react-icons/fa";

export default function MaintainerDashboard() {
  const messages = [1, 2, 3, 4];
  const router = useRouter();
  return (
    <div>
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="mt-3 block lg:flex w-full gap-3">
        <div className="flex flex-col w-full">
          <div className="block space-y-3 lg:flex lg:space-y-0 items-center gap-3">
            <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
              <FaHome size={24} color="#2ecc71" />
              <p className="font-semibold">Total Property</p>
              <p className="text-xl font-semibold">12</p>
            </div>
            <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
              <FaUsers size={24} color="#3498db" />
              <p className="font-semibold">Total Tenants</p>
              <p className="text-xl font-semibold">120</p>
            </div>

            <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
              <FaMoneyCheckAlt size={24} color="#f39c12" />
              <p className="font-semibold">Total Earning</p>
              <p className="text-xl font-semibold">$34000</p>
            </div>
            <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
              <FaMoneyBillAlt size={24} color="#e74c3c" />
              <p className="font-semibold">Total Expense</p>
              <p className="text-xl font-semibold">$12000</p>
            </div>
          </div>
          <div className="mt-3 w-full h-full bg-white border rounded-xl p-4">
            {/* Components  */}
          </div>
        </div>
        <div className="w-full lg:max-w-xs space-y-3">
          <div className="border rounded-lg p-4 bg-white text-sm space-y-2">
            <p className="font-semibold text-lg">Building Condition</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p>On repairment progress</p>
                <p>20</p>
              </div>
              <div className="relative w-full h-2 rounded-full bg-gray-300">
                <div className="w-5/6 h-2 rounded-full bg-primary-600"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p>Awaiting for repairment</p>
                <p>12</p>
              </div>
              <div className="relative w-full h-2 rounded-full bg-gray-300">
                <div className="w-4/6 h-2 rounded-full bg-primary-600"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p>On request</p>
                <p>8</p>
              </div>
              <div className="relative w-full h-2 rounded-full bg-gray-300">
                <div className="w-2/6 h-2 rounded-full bg-primary-600"></div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => router.push("/maintenance")}
                className="w-full border rounded-full p-2"
              >
                Maintenance Details
              </button>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-white text-sm space-y-2">
            <p className="font-semibold text-lg">New Messages</p>
            <div className="flex bg-gray-200 rounded-full">
              <div className="flex gap-2 items-center justify-between w-full bg-primary-500 rounded-full p-2 px-4 text-white">
                <p>Tenants</p>
                <div className="flex items-center justify-center rounded-full bg-primary-100 w-6 h-6 bg-opacity-50">
                  5
                </div>
              </div>
            </div>
            <div className="pt-2 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                    <Image src={"/images/photo1.png"} fill alt="" />
                  </div>
                  <div className="w-full">
                    <p className=" font-semibold">John Dan</p>
                    <p>Please repair my light box</p>
                  </div>
                  <div>12.30</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}