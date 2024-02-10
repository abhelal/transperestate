"use client";
import { useAuth } from "@/context/AuthContext";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { showToast } = useToast();
  const { push } = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Please enter email and password", "failure");
      return;
    }
    login({ email, password });
  };

  useEffect(() => {
    if (user) push("/dashboard");
  }, [user]);

  return (
    <div className="space-y-6 px-2">
      <div className="text-2xl font-medium text-gray-900 dark:text-white">
        Login to <span className="text-primary-700 font-bold">Transparestate</span> portal
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          placeholder="name@domain.com"
          required
        />
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
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={remember} onChange={() => setRemember(!remember)} />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <button
          onClick={() => push("forgot-password")}
          className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
        >
          Lost Password?
        </button>
      </div>
      <div className="pt-4 w-full flex justify-end">
        <Button onClick={handleLogin} isProcessing={false}>
          Log in to your account
        </Button>
      </div>
    </div>
  );
}
