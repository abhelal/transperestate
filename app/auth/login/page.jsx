import React from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

export default function Login() {
  const paperClass =
    "flex flex-col h-56 w-44 items-center bg-white boxshadow-md rounded-md p-4 hover:scale-105 duration-300";
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <p className="text-3xl font-semibold text-primary-500 p-2">Transperstate</p>
      <p>Manage your property with transperency</p>
      <div className="mt-8 flex gap-4 p-4">
        <button className={paperClass}>
          <p className="w-full text-center font-semibold text-lg">MANAGER</p>
          <UserIcon className="mt-6 w-12 h-12 text-primary-500" />
          <p className="mt-4">Manage with transparency</p>
        </button>
        <div className="flex items-end mb-12">
          <ArrowLeftIcon className="w-6 h-6 text-primary-500" />
        </div>
        <button className={paperClass}>
          <p className="w-full text-center font-semibold text-lg">TENANT</p>
          <UserGroupIcon className="mt-6 w-12 h-12 text-primary-500" />
          <p className="mt-4">Live with transparency</p>
        </button>
        <div className="flex items-end mb-12">
          <ArrowRightIcon className="w-6 h-6 text-primary-500" />
        </div>
        <button className={paperClass}>
          <p className="w-full text-center font-semibold text-lg">INVESTOR</p>
          <UsersIcon className="mt-6 w-12 h-12 text-primary-500" />
          <p className="mt-4">Money with transparency</p>
        </button>
      </div>
      <div className="mt-10">
        <p className="text-secondary-400 text-xs">
          Join the Transparestate community and embrace transparency in property management
        </p>
      </div>
    </div>
  );
}
