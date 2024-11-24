"use client";
import React from "react";
import Logo from "@/components/Logo";

import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CreditCardIcon,
  Squares2X2Icon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { HiOutlineMegaphone } from "react-icons/hi2";

import { BiMessageSquareDots } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";

export default function MaintainerSideBar() {
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
      name: "Notice",
      route: "/notice",
      icon: <HiOutlineMegaphone className="w-5 h-5" />,
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
      name: "Reports",
      route: "/reports",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
  ];
  const permissions = user.permissions;

  if (!permissions.includes("READ_MAINTENANCE") && !permissions.includes("UPDATE_MAINTENANCE")) delete menuA[1];
  if (!permissions.includes("READ_MESSAGE") && !permissions.includes("UPDATE_MESSAGE")) delete menuA[2];
  if (!permissions.includes("READ_NOTICE") && !permissions.includes("UPDATE_NOTICE")) delete menuA[3];
  if (!permissions.includes("READ_BILL") && !permissions.includes("UPDATE_BILL")) delete menuA[4];
  if (!permissions.includes("READ_PROPERTY") && !permissions.includes("UPDATE_PROPERTY")) delete menuB[0];
  if (!permissions.includes("READ_TENANT") && !permissions.includes("UPDATE_TENANT")) delete menuB[1];
  if (!permissions.includes("READ_FINANCE")) delete menuB[2];
  if (!permissions.includes("READ_REPORT")) delete menuB[3];

  return (
    <div className="w-72 h-full p-2">
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-gray-400">Transparestate </p>
        <div className="mt-3 flex flex-col h-0 grow overflow-y-auto scrollboxmenu p-4">
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
          <div className="flex flex-col text-sm space-y-2">
            <button onClick={() => router.push("/coming-soon")} className="text-pink-600">
              Whats comming next ?
            </button>
            <button onClick={() => router.push("/feedback")} className="text-primary-600">
              Give feedback
            </button>
          </div>
        </div>
        <div className="p-4 border-t">
          <p className="font-semibold text-sm">{user.role}</p>
          <p>{user.email}</p>
          <p className="text-sm">ID: {user.userId}</p>
        </div>
      </div>
    </div>
  );
}
