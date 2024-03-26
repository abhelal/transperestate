"use client";
import React from "react";
import PortalLayout from "./PortalLayout";
import SuperAdminLayout from "./SuperAdminLayout";
import { useAppSelector } from "@/libs/hooks";

export default function AppLayout({ children }) {
  const { user } = useAppSelector((state) => state.user);
  if (user && user.role === "SUPERADMIN") return <SuperAdminLayout>{children}</SuperAdminLayout>;
  if (user && user.role != "SUPERADMIN") return <PortalLayout>{children}</PortalLayout>;
  if (!user) return <>{children}</>;
}
