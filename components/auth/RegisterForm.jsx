"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/validator/auth";
import ErrorMessage from "@/components/ErrorMesssage";
import api from "@/libs/clientApi";
import { useAppDispatch } from "@/libs/hooks";
import { login } from "@/libs/features/user/userSlice";

export default function RegisterForm() {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    if (validateRegister(data, setErrors)) {
      try {
        const res = await api.post("/auth/register", data);
        if (res.status === 201) {
          await dispatch(login(res.data.user));
          showToast("Registration successful", "success", "TC");
          window.location.href = "/subscription";
        }
      } catch (error) {
        showToast(error.response.data.message, "error", "TC");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="px-2">
      <div className="text-2xl font-medium text-gray-900 dark:text-white">
        Register to <span className="text-primary-700 font-bold">Transparestate</span> portal
      </div>
      <form className="mt-4" onSubmit={handleRegister}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput value={data.name} onChange={handleChange} id="name" name="name" type="text" placeholder="John" />
          <ErrorMessage message={errors.name} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Company Name (Optional)" />
          </div>
          <TextInput
            value={data.companyName}
            onChange={handleChange}
            id="companyName"
            name="companyName"
            type="text"
            placeholder="ABC properties ltd"
          />
          <ErrorMessage message={errors.companyName} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput value={data.email} onChange={handleChange} id="email" name="email" type="text" placeholder="name@domain.com" />
          <ErrorMessage message={errors.email} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput value={data.password} onChange={handleChange} id="password" name="password" type="password" placeholder="********" />
          <ErrorMessage message={errors.password} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword" value="Confirm password" />
          </div>
          <TextInput
            value={data.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
          />
          <ErrorMessage message={errors.confirmPassword} />
        </div>
        <div className="flex justify-between">
          <button
            autoFocus={false}
            type="button"
            onClick={() => push("/login")}
            className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Already a member?
          </button>

          <Button type="submit" onClick={handleRegister} isProcessing={isProcessing}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
