import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full grow items-center justify-center p-4 lg:p-6">
      <div className="w-full bg-white shadow-sm max-w-md border rounded-lg p-4 lg:p-10">
        <LoginForm />
        <div className="mt-6">
          <p className="text-secondary-400 text-xs whitespace-pre-wrap">
            Join the Transparestate community and embrace transparency in
            property management
          </p>
        </div>
      </div>
    </div>
  );
}
