"use client";
import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";

export default function PagesLayout({ children }) {
  const { push } = useRouter();
  const { user } = useAppSelector((state) => state.user);
  if (!user) push("/login");
  else return <>{children}</>;
}
