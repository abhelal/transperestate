"use client";

import React from "react";
import { useAppSelector } from "@/libs/hooks";
import ClientDashboard from "./ClientDashboard";
import MaintainerDashboard from "./MaintainerDashboard";
import TenantDashboard from "./TenantDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import JanitorDashboard from "./JanitorDashboard";
import ProviderDashboard from "./ProviderDashboard";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.user);
  if (user?.role === "CLIENT") return <ClientDashboard />;
  if (user?.role === "MAINTAINER") return <MaintainerDashboard />;
  if (user?.role === "JANITOR") return <JanitorDashboard />;
  if (user?.role === "TENANT") return <TenantDashboard />;
  if (user?.role === "SUPERADMIN") return <SuperAdminDashboard />;
  if (user?.role === "PROVIDER") return <ProviderDashboard />;

  return null;
}
