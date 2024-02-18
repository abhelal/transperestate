"use client";
import React from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { user } = useAppSelector((state) => state.user);
  const { push } = useRouter();
  if (!user) push("/login");
  else return <PortalLayout>{children}</PortalLayout>;
}
