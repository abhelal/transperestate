"use client";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function Tenant({ apartment }) {
  const router = useRouter();

  return (
    <div className="mt-4 bg-white rounded-lg p-4 boxshadow-sm">
      <div className="flex justify-between">
        <p className="text-md underline">Tenant</p>
        <button onClick={() => router.push(`/tenants/${apartment?.tenant?.userId}`)}>
          <PencilSquareIcon className="h-5 w-5 text-gray-500" />
        </button>
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
