"use client";

import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";

export default function PagesLayout({ children }) {
  const { push } = useRouter();
  const { user } = useAppSelector((state) => state.user);
  if (user) push("/dashboard");
  else
    return (
      <div className="flex flex-col h-full min-h-screen">
        <Header />
        <div className="flex flex-col grow">{children}</div>
        <Footer />
      </div>
    );
}
