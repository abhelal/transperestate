import React from "react";
import UpdatePassword from "./updatePassword";
import Updateaddress from "./updateAddress";
import serverApi from "@/libs/serverApi";
import NotificationSettings from "./NotificationSettings";
import ServiceSettings from "./ServiceSettings";

export default async function Settings() {
  const res = await serverApi.get("/auth/settings");

  const role = res.data?.role;
  const address = res.data?.address;
  const notifications = res.data?.notifications;
  const services = res.data?.services;

  return (
    <div className="grid xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2 space-y-4">
        <Updateaddress address={address} />
        {role === "PROVIDER" && <ServiceSettings services={services} />}
      </div>
      <div className="xl:col-span-1 space-y-4">
        <UpdatePassword />
        <NotificationSettings currentNotifications={notifications} />
      </div>
    </div>
  );
}
