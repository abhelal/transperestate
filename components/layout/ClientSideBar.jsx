"use client";
import React from "react";
import Logo from "@/components/Logo";

import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CreditCardIcon,
  Squares2X2Icon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { PiBellRinging } from "react-icons/pi";
import { BiMessageSquareDots } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";
import { LiaUsersCogSolid, LiaUsersSolid } from "react-icons/lia";
import { LuUsers2 } from "react-icons/lu";
import { TbCalendarUser } from "react-icons/tb";
import { MenuButton } from "../ui/Buttons";

export default function ClientSideBar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const clientA = [
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

  const clientB = [
    {
      name: "Properties",
      route: "/properties",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
    },
    {
      name: "Maintainers",
      route: "/maintainers",
      icon: <LiaUsersCogSolid className="w-5 h-5" />,
    },
    {
      name: "Janitors",
      route: "/janitors",
      icon: <LuUsers2 className="w-5 h-5" />,
    },
    {
      name: "Tenants",
      route: "/tenants",
      icon: <LiaUsersSolid className="w-5 h-5" />,
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
          {clientA.map((menu, index) => (
            <MenuButton key={index} menu={menu} />
          ))}

          <div className="border-b py-2"></div>

          {clientB.map((menu, index) => (
            <MenuButton key={index} menu={menu} />
          ))}

          <div className="border-b py-2"></div>

          {[
            {
              name: "Subscription",
              route: "/subscription",
              icon: <TbCalendarUser className="w-5 h-5" />,
            },
          ].map((menu, index) => (
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
