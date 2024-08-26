"use client";
import React from "react";
import Logo from "@/components/Logo";
import { Squares2X2Icon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { BiMessageSquareDots } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";

export default function TenantSideBar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

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
      route: "/mybills",
      icon: <TiDocumentText className="w-5 h-5" />,
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
          {tenantA.map((menu, index) => (
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
