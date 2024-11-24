"use client";

import React from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Button } from "flowbite-react";
import RemoveTenant from "./RemoveTenant";
import UpdateTenant from "./UpdateTenant";

export default function Tenant({ apartment }) {
  const router = useRouter();
  if (!apartment?.tenant) {
    return (
      <div className="mt-4 bg-light dark:bg-dark rounded-lg p-4 boxshadow-sm">
        <div className="flex justify-between">
          <p className="text-md underline">Tenant</p>
          <Button size="xs">Add Tenant</Button>
        </div>
        <p>No tenant</p>
      </div>
    );
  } else
    return (
      <div className="mt-4 bg-light dark:bg-dark rounded-lg p-4 boxshadow-sm">
        <div className="flex justify-between">
          <p className="text-md underline">Tenant</p>
          <div className="flex gap-3">
            <Button size="xs" outline onClick={() => router.push(`/tenants/${apartment?.tenant?.userId}`)}>
              View
            </Button>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <p>Name : </p>
          <p>{apartment?.tenant?.name}</p>
        </div>
        <div className="flex gap-2">
          <p>Email : </p>
          <p>{apartment?.tenant?.email}</p>
        </div>
        <div className="flex gap-2">
          <p>Lease start : </p>
          <p>{moment(apartment.leaseStartDate).format("ll")}</p>
        </div>
        <div className="flex gap-2">
          <p>Rent : </p>
          <p>
            {apartment?.rent} {`$`}
          </p>
        </div>
      </div>
    );
}
