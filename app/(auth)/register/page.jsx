import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col w-full grow items-center justify-center p-4 lg:p-6">
      <div className="w-full bg-white shadow-sm max-w-lg border rounded-lg p-4 lg:p-10">
        <RegisterForm />
        <div className="mt-6">
          <p className="text-secondary-400 text-xs whitespace-pre-wrap">
            Join the Transparestate community and embrace transparency in property management
          </p>
        </div>
      </div>
    </div>
  );
}
