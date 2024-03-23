"use client";

import React, { useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/LoadingSkeletons";
import { Badge, Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";

import { useRouter } from "next/navigation";
import { fetchTenants } from "@/libs/features/tenant/tenantAction";

export default function TenantList({ searchParams }) {
  const router = useRouter();
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  const dispatch = useAppDispatch();
  const { tenants, totalPages, loading } = useAppSelector((state) => state.tenant);

  useEffect(() => {
    dispatch(fetchTenants({ query, page }));
  }, [query, page]);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-1">id</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-2">Email</p>
          <p className="col-span-2">Contact</p>
          <p className="col-span-3">Property</p>
          <p className="col-span-1">Apartment</p>
          <div className="col-span-1 text-center flex justify-end">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {loading && tenants.length === 0 && <TableSkeleton />}
          {tenants?.map((maintainer, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-1">{maintainer.userId}</p>
              <p className="col-span-2">{maintainer.name}</p>
              <p className="col-span-2">{maintainer.email}</p>
              <p className="col-span-2">{maintainer.contactNumber}</p>
              <p className="col-span-3 flex flex-wrap gap-2">
                {maintainer.properties.map((property, index) => (
                  <Badge
                    key={index}
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => router.push(`/properties/${property.propertyId}`)}
                  >
                    {property.name}
                  </Badge>
                ))}
              </p>
              <div className="col-span-1 text-center">
                {maintainer.status === "ACTIVE" ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">{maintainer.status}</span>
                )}
              </div>
              <div className="col-span-1 flex justify-end">
                <Button
                  outline
                  size="xs"
                  onClick={() => router.push(`tenants/${maintainer.userId}`)}
                >
                  Update
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t flex w-full justify-center p-2">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}