"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Logo from "@/components/Logo";
import ErrorMessage from "@/components/ErrorMesssage";
import validateEmail from "@/validator/forgotPassword";
import { useToast } from "@/context/ToastContext";

export default function ForgotPassword() {
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    if (validateEmail({ email }, setErrors)) {
      showToast("Please enter email and password", "error", "RB");
      return;
    }
  };

  return (
    <div className="flex grow items-center justify-center">
      <div className="w-full max-w-sm p-4 lg:p-10 rounded-lg bg-white border shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <Logo className="w-8 h-8 text-primary-600" />
          <p className="text-xl font-semibold">Transparestate</p>
        </div>
        <div className="pt-4 font-semibold text-gray-900 dark:text-white text-center">Reset your password</div>
        <p className="mt-4 text-sm text-center">{`Enter your email and we'll send you a link to reset your password.`}</p>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email address" />
          </div>
          <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="name@domain.com" />
          <ErrorMessage message={errors.email} />
        </div>
        <Button className="mt-2 w-full" onClick={handleLogin} isProcessing={false}>
          Reset your password
        </Button>
      </div>
    </div>
  );
}
