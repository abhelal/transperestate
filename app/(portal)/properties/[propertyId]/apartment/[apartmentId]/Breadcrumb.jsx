"use client";

import { Breadcrumb } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function MyBreadcrumb({ apartmentId, propertyId }) {
  const router = useRouter();

  return (
    <div className=" mb-2">
      <Breadcrumb>
        <Breadcrumb.Item className="cursor-pointer" onClick={() => router.push("/properties")}>
          Properties
        </Breadcrumb.Item>

        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => router.push(`/properties/${propertyId}`)}
        >
          {propertyId}
        </Breadcrumb.Item>

        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => router.push(`/properties/${propertyId}`)}
        >
          Apartments
        </Breadcrumb.Item>

        <Breadcrumb.Item className="cursor-pointer">{apartmentId}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
