"use client";
import React from "react";
import { useAppSelector } from "@/libs/hooks";

export default function AuthProvider({ children }) {
  const { loading } = useAppSelector((state) => state.user);
  if (loading) return null;
  else return <>{children}</>;
}
