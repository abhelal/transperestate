"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi2";
import { PiDoorOpenThin, PiDoorDuotone } from "react-icons/pi";
import clientApi from "@/libs/clientApi";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";

export default function ClientDashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const messages = [1, 2, 3, 4];
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await clientApi.get("/dashboard/client");
        setDashboardData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (loading) return <BodySkeleton />;
  return (
    <div>
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="mt-3 block lg:flex w-full gap-3">
        <div className="flex flex-col w-full">
          <div className="block space-y-3 lg:flex lg:space-y-0 items-center gap-3">
            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Total Properties</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-xl font-semibold">{dashboardData.propertiesCount}</p>
                <HiOutlineHome size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">
                <span className={dashboardData.propertiesIncreased ? "text-green-500" : "text-red-400"}>
                  {dashboardData.propertyIncreatedPercent}%
                </span>{" "}
                <span>Since last month</span>
              </div>
            </div>
            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Total Apartment</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-xl font-semibold">1200</p>
                <PiDoorOpenThin size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">
                <span className="text-red-400">-0.05%</span> <span>Since last month</span>
              </div>
            </div>

            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Rented Apartment</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-xl font-semibold">1246</p>
                <PiDoorDuotone size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">
                <span className="text-green-400">+0.05%</span> <span>Since last month</span>
              </div>
            </div>

            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Total Earning</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-xl font-semibold">$12746</p>
                <CiMoneyCheck1 size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">
                <span className="text-green-400">+0.05%</span> <span>Since last month</span>
              </div>
            </div>
          </div>
          <div className="mt-3 w-full h-full bg-white border rounded-xl p-4">
            {/* Components  */}
            {JSON.stringify(dashboardData, null, 2)}
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
              <button onClick={() => router.push("/maintenance")} className="w-full border rounded-full p-2">
                Maintenance Details
              </button>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-white text-sm space-y-2">
            <p className="font-semibold text-lg">New Messages</p>
            <div className="flex bg-gray-200 rounded-full">
              <button className="flex gap-2 items-center justify-center w-full bg-primary-500 rounded-full p-2 px-4 text-white">
                <p>Tenants</p>
                <div className="flex items-center justify-center rounded-full bg-primary-100 w-6 h-6 bg-opacity-50">5</div>
              </button>
              <button className="w-full ">Investors</button>
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
