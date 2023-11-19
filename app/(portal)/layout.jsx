"use client";
import React from "react";
import Logo from "@/components/Logo";

import {
  ArrowTrendingUpIcon,
  BellIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  InboxIcon,
  Squares2X2Icon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";

export default function ManagerLayout({ children }) {
  const path = usePathname();
  const router = useRouter();

  const menus = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <Squares2X2Icon className="w-5 h-5" />,
    },
    {
      name: "Maintenance",
      route: "/maintenance",
      icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
    },
    {
      name: "Message",
      route: "/message",
      icon: <InboxIcon className="w-5 h-5" />,
    },
    {
      name: "Payments",
      route: "/payments",
      icon: <CreditCardIcon className="w-5 h-5" />,
    },
  ];

  const datas = [
    {
      name: "Property",
      route: "/property",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
    },
    {
      name: "Tenants",
      route: "/tenant",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      name: "Finance",
      route: "/message",
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
    },
    {
      name: "Reports",
      route: "/reports",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
  ];
  return (
    <div className="relative flex w-full h-full bg-gray-100">
      <div className="w-72 h-full p-2">
        <div className="flex flex-col w-full h-full bg-white rounded-xl">
          <div className="mt-4 flex justify-center">
            <Logo />
          </div>
          <p className="text-center text-xl text-gray-400">Transparestate </p>
          <div className="mt-4 flex flex-col h-0 grow overflow-y-auto p-4 space-y-3">
            {menus.map((menu, index) => (
              <button
                key={index}
                onClick={() => router.push(menu.route)}
                className={`flex items-center gap-2 p-1 rounded-md ${
                  menu.route === path ? "bg-primary-600 text-white" : ""
                }`}
              >
                <div>{menu.icon}</div>
                <p>{menu.name}</p>
              </button>
            ))}
            <div className="border-b py-2"></div>

            {datas.map((menu, index) => (
              <button
                key={index}
                onClick={() => router.push(menu.route)}
                className={`flex items-center gap-2 p-1 rounded-md ${
                  menu.route === path ? "bg-primary-600 text-white" : ""
                }`}
              >
                <div>{menu.icon}</div>
                <p>{menu.name}</p>
              </button>
            ))}
            <div className="grow"></div>
            <div className="flex items-center gap-2">
              <Cog6ToothIcon className="w-5 h-5" />
              <button>Settings</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-full p-2">
          <div className="flex w-full p-3 px-6 justify-between items-center bg-white rounded-lg">
            <div>
              <button className="flex items-center gap-2">
                <p>23-Oct-2023</p>
                <CalendarIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex w-10 h-10 items-center justify-center border rounded-md">
                <p>EN</p>
              </button>
              <button className="flex w-10 h-10 items-center justify-center border rounded-md">
                <BellIcon className="w-6 h-6" />
              </button>
              <div className="relative w-10 h-10 bg-gray-50 rounded-full shrink-0 overflow-hidden">
                <Image src={"/images/photo3.png"} fill className=" object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto px-2 pb-2">{children}</div>
      </div>
    </div>
  );
}
