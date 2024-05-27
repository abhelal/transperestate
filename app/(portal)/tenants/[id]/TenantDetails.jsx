"use client";
import React from "react";
import UpdateInformation from "@/components/UpdateInfo";
import TenantInfo from "./TenantInfo";

export default function TenantDetails({ user }) {
  return (
    <div className="flex w-full gap-4 mt-4">
      <div className="w-1/2">
        <UpdateInformation user={user} />
      </div>
      <div className="w-1/2">
        <TenantInfo user={user} />
      </div>
    </div>
  );
}
