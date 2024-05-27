"use client";
import React from "react";
import UpdatePassword from "@/components/UpdatePassword";

export default function Settings({ user }) {
  return (
    <div className="">
      <div className="grid lg:grid-cols-2">
        <UpdatePassword user={user} />
      </div>
    </div>
  );
}
