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
  UserGroupIcon,
  UsersIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { BiMessageSquareDots } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBarComponents() {
  const path = usePathname();

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
      name: "Maintainer",
      route: "/maintainer",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },
    {
      name: "Live Chat",
      route: "/chat",
      icon: <BiMessageSquareDots className="w-5 h-5" />,
    },

    {
      name: "Bulk Email/Text",
      route: "/email-text",
      icon: <MdOutlineMailOutline className="w-5 h-5" />,
    },
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
  ];

  const datas = [
    {
      name: "Companies",
      route: "/companies",
      icon: <UserIcon className="w-5 h-5" />,
    },
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
        <div className="mt-4 flex flex-col h-0 grow overflow-y-auto hidescrollbar p-4 space-y-3">
          {menus.map((menu, index) => (
            <Link
              key={index}
              href={menu.route}
              className={`flex items-center gap-2 p-1 rounded-md ${
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
              className={`flex items-center gap-2 p-1 rounded-md ${
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
