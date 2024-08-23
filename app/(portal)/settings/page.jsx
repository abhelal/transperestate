import React from "react";
import UpdatePassword from "./updatePassword";
import Updateaddress from "./updateAddress";
import serverApi from "@/libs/serverApi";

export default async function Settings() {
  const res = await serverApi.get("/auth/address");
  const address = res.data.address;
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Updateaddress address={address} />
      </div>
      <div className="col-span-1">
        <UpdatePassword />
      </div>
    </div>
  );
}
