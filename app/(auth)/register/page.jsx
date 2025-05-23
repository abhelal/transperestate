"use client";

import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full grow items-center justify-center p-4 lg:p-6">
      <div className="w-full bg-light dark:bg-dark shadow-sm max-w-lg border rounded-lg p-4 lg:p-10">
        <div className="flex justify-center p-4">
          <button onClick={() => router.push("/")}>
            <Logo width={60} height={60} />
          </button>
        </div>
        <RegisterForm />
        <div className="mt-6">
          <span className="text-secondary-400 whitespace-pre-wrap">
            Are you a service provider?{" "}
            <button onClick={() => router.push("/register-provider")} className="text-primary-500 hover:underline">
              Register here
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
