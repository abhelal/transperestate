"use client";
import React from "react";
import Logo from "@/components/Logo";

import {
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { CiBarcode } from "react-icons/ci";
import { BiMessageSquareDots } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/libs/hooks";
import { HiOutlineSupport } from "react-icons/hi";
import { LiaUsersCogSolid, LiaUsersSolid } from "react-icons/lia";
import { LuUsers2 } from "react-icons/lu";
import { RiUserSettingsLine } from "react-icons/ri";

export default function SideBarComponents() {
  const path = usePathname();
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
  ];

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
      name: "Payments",
      route: "/payment",
      icon: <CreditCardIcon className="w-5 h-5" />,
    },
  ];

  const maintainerA = [
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

  const tenantA = [
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
      name: "My Bills",
      route: "/bills",
      icon: <TiDocumentText className="w-5 h-5" />,
    },
  ];

  const superadminB = [
    {
      name: "Finance",
      route: "/finance",
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
    },
    {
      name: "Support",
      route: "/support",
      icon: <HiOutlineSupport className="w-5 h-5" />,
    },
  ];

  const clientB = [
    {
      name: "Properties",
      route: "/properties",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
    },
    {
      name: "Managers",
      route: "/managers",
      icon: <RiUserSettingsLine className="w-5 h-5" />,
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

  const maintainerB = [
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

  const tenantB = [];

  const menuA =
    user.role === "SUPERADMIN"
      ? superadminA
      : user.role === "CLIENT"
      ? clientA
      : user.role === "MAINTAINER"
      ? maintainerA
      : user.role === "TENANT"
      ? tenantA
      : [];
  const menuB =
    user.role === "SUPERADMIN"
      ? superadminB
      : user.role === "CLIENT"
      ? clientB
      : user.role === "MAINTAINER"
      ? maintainerB
      : user.role === "TENANT"
      ? tenantB
      : [];

  return (
    <div className="w-72 h-full p-2">
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-gray-400">Transparestate </p>
        <div className="mt-4 flex flex-col h-0 grow overflow-y-auto hidescrollbar p-4 space-y-1">
          {menuA.map((menu, index) => (
            <Link
              key={index}
              href={menu.route}
              className={`flex items-center gap-2 p-2 rounded-md ${
                path.startsWith(menu.route) ? "bg-primary-500 text-white" : ""
              }`}
            >
              <div>{menu.icon}</div>
              <p>{menu.name}</p>
            </Link>
          ))}

          <div className="border-b py-2"></div>

          {menuB.map((menu, index) => (
            <Link
              key={index}
              href={menu.route}
              className={`flex items-center gap-2 p-2 rounded-md ${
                path.startsWith(menu.route) ? "bg-primary-500 text-white" : ""
              }`}
            >
              <div>{menu.icon}</div>
              <p>{menu.name}</p>
            </Link>
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
