"use client";

import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  if (!user) {
    router.push("/login");
    return null;
  }

  if (user.role !== "CLIENT") {
    router.push("/");
    return null;
  }

  if (user.status === "ACTIVE") {
    router.push("/dashboard");
    return null;
  }

  return <>{children}</>;
}
