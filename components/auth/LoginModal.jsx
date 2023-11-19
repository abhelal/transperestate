"use client";

import { useAuth } from "@/context/AuthContext";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ openModal, setOpenModal }) {
  const { showToast } = useToast();
  const { push } = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="text-xl font-medium text-gray-900 dark:text-white">
              Login to <span className="text-primary-700">Transparestate</span> portal
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
                placeholder="name@company.com"
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
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div onClick={handleLogin} className="w-full flex justify-end">
              <Button isProcessing={false}>Log in to your account</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
