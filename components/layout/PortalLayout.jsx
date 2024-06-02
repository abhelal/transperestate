"use client";

import React, { useEffect, useState } from "react";
import { BellIcon, CalendarIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { FiUser } from "react-icons/fi";
import Sidebar from "@/components/layout/SideBar";
import SideBarPortal from "@/components/layout/SideBarPortal";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { logout } from "@/libs/features/user/userSlice";
import clientApi from "@/libs/clientApi";
import socket from "@/libs/socket";

export default function PortalLayout({ children }) {
  const { user } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutFromPortal = async () => {
    try {
      const res = await clientApi.post("/auth/logout");
      if (res.data.success) {
        dispatch(logout());
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
    socket.disconnect();
    socket.connect();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!user) return null;
  else
    return (
      <div className="relative flex w-full h-full bg-gray-100">
        <div className="block lg:hidden">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
            <SideBarPortal />
          </Sidebar>
        </div>
        <div className="hidden lg:block">
          <SideBarPortal />
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
              <div className="flex items-center gap-2">
                <button className="flex w-10 h-10 items-center justify-center">
                  <p>EN</p>
                </button>
                <button className="flex w-10 h-10 items-center justify-center">
                  <BellIcon className="w-6 h-6" />
                </button>
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <div className="flex w-10 h-10 items-center justify-center cursor-pointer">
                      <FiUser className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                >
                  <Dropdown.Item className="w-36" onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => router.push("/settings")}>Settings</Dropdown.Item>
                  <Dropdown.Item onClick={() => logoutFromPortal()}>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-0 grow overflow-y-auto p-2">{children}</div>
        </div>
      </div>
    );
}
