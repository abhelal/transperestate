"use client";

import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import PortalLayout from "@/components/layout/PortalLayout";

export default function PagesLayout({ children }) {
  const { push } = useRouter();
  const { user } = useAppSelector((state) => state.user);
  if (!user) push("/login");
  if (user && user.role === "CLIENT" && user.status === "NEW") push("/subscription");
  else return <PortalLayout>{children}</PortalLayout>;
}
