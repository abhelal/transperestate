"use client";

import React from "react";
import Logo from "@/components/Logo";
import { ArrowTrendingUpIcon, Squares2X2Icon, UserGroupIcon } from "@heroicons/react/24/outline";
import { PiShieldWarningLight, PiPackageDuotone } from "react-icons/pi";
import { CiBarcode, CiSettings } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";
import { HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { LuMails } from "react-icons/lu";

export default function SuperAdminSideBar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const superadminA = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <Squares2X2Icon className="w-5 h-5" />,
    },

    {
      name: "Clients",
      route: "/clients",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },

    {
      name: "Activation Codes",
      route: "/activation-codes",
      icon: <CiBarcode className="w-5 h-5" />,
    },
    {
      name: "Subscription Plan",
      route: "/subscription-plan",
      icon: <PiPackageDuotone className="w-5 h-5" />,
    },
  ];

  const superadminB = [
    {
      name: "Tickets",
      route: "/tickets",
      icon: <HiOutlineTicket className="w-5 h-5" />,
    },
    {
      name: "Contact",
      route: "/contact-messages",
      icon: <LuMails className="w-5 h-5" />,
    },
    {
      name: "Feedbacks",
      route: "/feedbacks",
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
  ];

  const superadminC = [
    {
      name: "Pages",
      route: "/pages",
      icon: <PiShieldWarningLight className="w-5 h-5" />,
    },

    {
      name: "Settings",
      route: "/settings",
      icon: <CiSettings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-72 h-full p-2">
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark-bg rounded-xl">
        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-gray-400">Transparestate </p>
        <div className="mt-4 flex flex-col h-0 grow overflow-y-auto hidescrollbar p-4 space-y-1">
          {superadminA.map((menu, index) => (
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

          {superadminB.map((menu, index) => (
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
          {superadminC.map((menu, index) => (
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
