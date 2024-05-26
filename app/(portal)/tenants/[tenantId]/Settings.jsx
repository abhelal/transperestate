"use client";
import React from "react";
import UpdatePassword from "@/components/UpdatePassword";
import { useParams } from "next/navigation";
export default function Settings() {
  const params = useParams();
  const userId = params?.tenantId;
  return (
    <div className="">
      <div className="grid lg:grid-cols-2">
        <UpdatePassword user={{ userId: userId }} />
      </div>
    </div>
  );
}
