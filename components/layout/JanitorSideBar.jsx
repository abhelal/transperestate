"use client";
import React from "react";
import Logo from "@/components/Logo";

import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CreditCardIcon,
  Squares2X2Icon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { PiBellRinging } from "react-icons/pi";

import { BiMessageSquareDots } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";

export default function JanitorSideBar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const menuA = [
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
      icon: <BiMessageSquareDots className="w-5 h-5" />,
    },

    {
      name: "Notifications",
      route: "/notifications",
      icon: <PiBellRinging className="w-5 h-5" />,
    },

    {
      name: "Bills",
      route: "/bills",
      icon: <CreditCardIcon className="w-5 h-5" />,
    },
  ];

  const menuB = [
    {
      name: "Properties",
      route: "/properties",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
    },
    {
      name: "Tenants",
      route: "/tenants",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      name: "Finance",
      route: "/finance",
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
    },
    {
      name: "Reports",
      route: "/reports",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
  ];

  const permissions = user.permissions;

  if (!permissions.includes("READ_MAINTENANCE") && !permissions.includes("UPDATE_MAINTENANCE")) delete menuA[1];
  if (!permissions.includes("READ_MESSAGE") && !permissions.includes("UPDATE_MESSAGE")) delete menuA[2];
  if (!permissions.includes("READ_NOTIFICATION") && !permissions.includes("UPDATE_NOTIFICATION")) delete menuA[3];
  if (!permissions.includes("READ_BILL") && !permissions.includes("UPDATE_BILL")) delete menuA[4];
  if (!permissions.includes("READ_PROPERTY") && !permissions.includes("UPDATE_PROPERTY")) delete menuB[0];
  if (!permissions.includes("READ_TENANT") && !permissions.includes("UPDATE_TENANT")) delete menuB[1];
  if (!permissions.includes("READ_FINANCE")) delete menuB[2];
  if (!permissions.includes("READ_REPORT")) delete menuB[3];

  return (
    <div className="w-72 h-full p-2">
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-gray-400">Transparestate </p>
        <div className="mt-4 flex flex-col h-0 grow overflow-y-auto hidescrollbar p-4 space-y-1">
          {menuA.map((menu, index) => (
            <button
              key={index}
              onClick={() => router.push(menu.route)}
              className={`flex items-center gap-2 p-2 rounded-md ${path.startsWith(menu.route) ? "bg-primary-500 text-white" : ""}`}
            >
              <div>{menu.icon}</div>
              <p>{menu.name}</p>
            </button>
          ))}

          <div className="border-b py-2"></div>

          {menuB.map((menu, index) => (
            <button
              key={index}
              onClick={() => router.push(menu.route)}
              className={`flex items-center gap-2 p-2 rounded-md ${path.startsWith(menu.route) ? "bg-primary-500 text-white" : ""}`}
            >
              <div>{menu.icon}</div>
              <p>{menu.name}</p>
            </button>
          ))}
          <div className="grow"></div>
          <div className="border rounded-lg p-2">
            <p className="font-semibold text-sm">{user.role}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
