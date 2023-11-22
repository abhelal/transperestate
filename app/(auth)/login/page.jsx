"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import LoginModal from "@/components/auth/LoginModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { user } = useAuth();
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user) push("/dashboard");
  }, [user]);

  const PaperButton = ({ children }) => {
    return (
      <button
        onClick={() => setOpenModal(true)}
        className="flex flex-col h-56 w-44 items-center bg-white boxshadow-md rounded-md p-4 hover:scale-105 duration-300"
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex flex-col w-full grow items-center justify-center p-6">
      <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
      <p className="text-3xl font-semibold text-primary-700 p-2">Transparestate</p>
      <p>Manage your property with transperency</p>
      <div className="mt-8 bloack space-y-3 lg:space-y-0 lg:flex gap-4 p-4">
        <PaperButton>
          <p className="w-full text-center font-semibold text-lg">MANAGER</p>
          <UserIcon className="mt-6 w-12 h-12 text-primary-700" />
          <p className="mt-4">Manage with transparency</p>
        </PaperButton>

        <div className="hidden lg:flex items-end mb-12">
          <ArrowLeftIcon className="w-6 h-6 text-primary-700" />
        </div>

        <PaperButton>
          <p className="w-full text-center font-semibold text-lg">TENANT</p>
          <UserGroupIcon className="mt-6 w-12 h-12 text-primary-700" />
          <p className="mt-4">Live with transparency</p>
        </PaperButton>

        <div className="hidden lg:flex items-end mb-12">
          <ArrowRightIcon className="w-6 h-6 text-primary-700" />
        </div>
        <PaperButton>
          <p className="w-full text-center font-semibold text-lg">INVESTOR</p>
          <UsersIcon className="mt-6 w-12 h-12 text-primary-700" />
          <p className="mt-4">Money with transparency</p>
        </PaperButton>
      </div>
      <div className="mt-10">
        <p className="text-secondary-400 text-xs whitespace-pre-wrap">
          Join the Transparestate community and embrace transparency in property management
        </p>
      </div>
    </div>
  );
}
