"use client";
import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { PageSkeleton } from "@/components/ui/LoadingSkeletons";

export default function AuthProvider({ children }) {
  const { loading } = useAppSelector((state) => state.user);
  if (loading) return <PageSkeleton />;
  else return <>{children}</>;
}
