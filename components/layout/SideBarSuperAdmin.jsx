"use client";
import React from "react";
import Logo from "@/components/Logo";

import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { BiMessageSquareDots } from "react-icons/bi";
import { MdOutlineHome, MdOutlineMailOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiOutlineUsers } from "react-icons/hi2";

export default function SideBarSuperAdmin() {
  const path = usePathname();
  const menus = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <Squares2X2Icon className="w-5 h-5" />,
    },
    {
      name: "Companies",
      route: "/companies",
      icon: <MdOutlineHome className="w-5 h-5" />,
    },
    {
      name: "Message",
      route: "/message",
      icon: <BiMessageSquareDots className="w-5 h-5" />,
    },

    {
      name: "Send Notice",
      route: "/email-text",
      icon: <MdOutlineMailOutline className="w-5 h-5" />,
    },
  ];

  const datas = [
    {
      name: "Payments",
      route: "/payment",
      icon: <CreditCardIcon className="w-5 h-5" />,
    },
    {
      name: "Expenses",
      route: "/expense",
      icon: <TiDocumentText className="w-5 h-5" />,
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
  return (
    <div className="w-72 h-full p-2">
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-gray-400">Transparestate </p>
        <div className="mt-4 flex flex-col h-0 grow overflow-y-auto hidescrollbar p-4 space-y-1">
          {menus.map((menu, index) => (
            <Link
              key={index}
              href={menu.route}
              className={`flex items-center gap-2 p-2 rounded-md ${
                path.startsWith(menu.route) ? "bg-primary-600 text-white" : ""
              }`}
            >
              <div>{menu.icon}</div>
              <p>{menu.name}</p>
            </Link>
          ))}

          <div className="border-b py-2"></div>

          {datas.map((menu, index) => (
            <Link
              key={index}
              href={menu.route}
              className={`flex items-center gap-2 p-2 rounded-md ${
                path.startsWith(menu.route) ? "bg-primary-600 text-white" : ""
              }`}
            >
              <div>{menu.icon}</div>
              <p>{menu.name}</p>
            </Link>
          ))}
          <div className="grow"></div>
          <div className="flex items-center gap-2">
            <Cog6ToothIcon className="w-5 h-5" />
            <Link href="/setting">Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
