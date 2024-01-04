"use client";
import React, { useEffect, useState } from "react";
import { BellIcon, CalendarIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Sidebar from "@/components/layout/SideBar";
import SideBarComponents from "@/components/layout/SideBarComponents";
import { usePathname } from "next/navigation";
import { Dropdown } from "flowbite-react";
import { useAuth } from "@/context/AuthContext";

export default function ManagerLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative flex w-full h-full bg-gray-100">
      <div className="block lg:hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
          <SideBarComponents />
        </Sidebar>
      </div>
      <div className="hidden lg:block">
        <SideBarComponents />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="w-full p-2">
          <div className="flex w-full p-3 px-6 justify-between items-center bg-white rounded-lg">
            <div className="flex">
              <button onClick={() => setIsOpen(true)} className="block lg:hidden">
                <Bars3Icon className="w-5 h-5" />
              </button>
              <button className="hidden lg:flex items-center gap-2">
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
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <div className="relative w-10 h-10 bg-gray-50 rounded-full shrink-0 overflow-hidden">
                    <Image
                      src={"/images/photo3.png"}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
              >
                <Dropdown.Item className="w-36">Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto px-2 pb-2">{children}</div>
      </div>
    </div>
  );
}
