"use client";
import React from "react";
import Logo from "@/components/Logo";
import { Squares2X2Icon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { BiMessageSquareDots } from "react-icons/bi";
import { RiCommunityLine } from "react-icons/ri";
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
      name: "My Rentals",
      route: "/myrentals",
      icon: <RiCommunityLine className="w-5 h-5" />,
    },
    {
      name: "My Bills",
      route: "/mybills",
      icon: <TiDocumentText className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-72 h-full p-2">
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="mt-4 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-gray-400">Transparestate </p>
        <div className="mt-4 flex flex-col h-0 grow overflow-y-auto scrollboxmenu p-4">
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
