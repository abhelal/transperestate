"use client";

import React from "react";
import UpdateProperties from "@/components/UpdateProperties";
import UpdateInformation from "@/components/UpdateInfo";
import UpdatePassword from "@/components/UpdatePassword";
import UpdateUserStatus from "@/components/UpdateStatus";

export default function ServiceProvider({ user }) {
  return (
    <div className="flex gap-4">
      <div className="w-1/2 mt-4">
        <UpdateInformation user={user} />
        <UpdatePassword user={user} />
      </div>
      <div className="w-1/2">
        <UpdateUserStatus user={user} />
        <UpdateProperties user={user} />
      </div>
    </div>
  );
}
