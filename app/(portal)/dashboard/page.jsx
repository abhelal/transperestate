"use client";

import React from "react";

import { useAppSelector } from "@/libs/hooks";
import AdminDashboard from "./AdminDashboard";
import MaintainerDashboard from "./MaintainerDashboard";
import TenantDashboard from "./TenantDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.user);

  if (user.role === "ADMIN") return <AdminDashboard />;
  if (user.role === "MAINTAINER") return <MaintainerDashboard />;
  if (user.role === "TENANT") return <TenantDashboard />;
  if (user.role === "SUPERADMIN") return <SuperAdminDashboard />;

  return null;
}
