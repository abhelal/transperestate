"use client";

import React from "react";
import RegisterProvider from "@/components/auth/RegisterProvider";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function RegisterProviderPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full grow items-center justify-center p-4 lg:p-6">
      <div className="w-full bg-light dark:bg-dark shadow-sm max-w-lg border rounded-lg p-4 lg:p-10">
        <div className="flex justify-center p-4">
          <button onClick={() => router.push("/")}>
            <Logo width={60} height={60} />
          </button>
        </div>
        <RegisterProvider />
      </div>
    </div>
  );
}
