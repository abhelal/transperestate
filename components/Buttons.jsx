"use client";
import React from "react";
import { MenuIcon } from "./Icons";
import { useRouter, usePathname } from "next/navigation";

function Spinner() {
  return (
    <svg
      className={`animate-spin h-5 w-5`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function MenuButton({ menu }) {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname.split("/")[2] === menu.route.split("/")[2];

  return (
    <button
      onClick={() => router.push(menu.route)}
      className={`w-full h-12 group ${
        active
          ? "bg-primary-500 text-white"
          : "text-gray-400 hover:text-primary-400 duration-300"
      }`}
    >
      <span className={`flex items-center justify-center xl:justify-start`}>
        <MenuIcon
          className={`hidden xl:block ${active ? "text-white" : "text-white"}`}
        />
        <span
          className={`flex items-center gap-4 ${
            active ? "text-white" : " "
          } xl:ml-8`}
        >
          {menu.icon}
          <p className="text-lg hidden xl:block">{menu.label}</p>
        </span>
      </span>
    </button>
  );
}

export function BoxButton({ menu }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(menu.route)}
      className="group w-full h-52 rounded-2xl bg-white boxshadow flex items-center justify-center hover:scale-105 duration-300"
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center text-primary-500 duration-300">
        {menu.icon}
        <p className="text-md text-gray-700">{menu.label}</p>
      </div>
    </button>
  );
}

export function PrimaryButton({ children, spinning, ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 rounded-md pr-8 p-1 text-white overflow-hidden ${props.className} duration-200`}
    >
      <div className="w-5">{spinning && <Spinner />} </div>
      {children}
    </button>
  );
}

export function ColoredButton({ children, spinning, ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 rounded-md pr-8 p-1 text-white overflow-hidden ${props.className} duration-200`}
    >
      <div className="w-5">{spinning && <Spinner />} </div>
      {children}
    </button>
  );
}

export function PrimaryButtonOutlined({ children, spinning, ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 bg-white border border-primary-500  rounded-md pr-8 p-1 text-primary-500 overflow-hidden ${props.className} duration-200`}
    >
      <div className="w-5">{spinning && <Spinner />} </div>
      {children}
    </button>
  );
}

export function ButtonOutlined({ children, spinning, ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 bg-white border rounded-md pr-8 p-1 overflow-hidden ${props.className} duration-200`}
    >
      <div className="w-5">{spinning && <Spinner />} </div>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-secondary-900 hover:bg-secondary-700 rounded-lg px-6 p-1 text-white overflow-hidden text-sm duration-200"
    >
      {children}
    </button>
  );
}

export function RemoveButton({ zIndex = 0, ...props }) {
  return (
    <button
      {...props}
      style={{ zIndex }}
      className={`w-5 h-5 text-[8px] p-1 bg-secondary-400 bg-opacity-10 rounded-full ${props.className}`}
    >
      X
    </button>
  );
}
