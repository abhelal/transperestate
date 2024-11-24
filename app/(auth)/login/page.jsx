"use client";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full grow items-center justify-center p-4 lg:p-6">
      <div className="w-full bg-light dark:bg-dark shadow-sm max-w-md border rounded-lg p-4 lg:p-10">
        <div className="flex justify-center p-4">
          <button onClick={() => router.push("/")}>
            <Logo width={60} height={60} />
          </button>
        </div>
        <LoginForm />
        <div className="mt-6">
          <p className="text-secondary-400 text-xs whitespace-pre-wrap">
            Join the Transparestate community and embrace transparency in property management
          </p>
        </div>
      </div>
    </div>
  );
}
