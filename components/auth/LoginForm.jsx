"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import api from "@/libs/clientApi";
import { useAppDispatch } from "@/libs/hooks";
import { login } from "@/libs/features/user/userSlice";
import socket from "@/libs/socket";

export default function LoginForm() {
  const { showToast } = useToast();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter email and password", "error", "TC");
      return;
    }
    try {
      setIsProcessing(true);
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success) {
        dispatch(login(res.data.user));
        push("/dashboard");
        socket.disconnect();
        socket.connect();
      }
    } catch (error) {
      showToast(error.response.data.message, "error", "TC");
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 px-2">
      <div className="text-2xl font-medium text-gray-900 dark:text-white">
        Login to <span className="text-primary-700 font-bold">Transparestate</span> portal
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="name@domain.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="********"
          required
        />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={() => push("forgot-password")} className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
          Lost Password?
        </button>
        <Button type="submit" onClick={handleLogin} isProcessing={isProcessing}>
          Login
        </Button>
      </div>
      <div className="pt-4 w-full flex justify-end">
        <p className="text-xs text-gray-500 dark:text-gray-300">
          {`Don't have an account ? `}
          <button type="button" onClick={() => push("register")} className="text-cyan-700 hover:underline dark:text-cyan-500">
            Register Business
          </button>
        </p>
      </div>
    </form>
  );
}
