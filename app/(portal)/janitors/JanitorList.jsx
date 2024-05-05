"use client";

import React, { useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/LoadingSkeletons";
import { Badge, Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";
import { fetchJanitors } from "@/libs/features/janitor/janitorAction";

export default function JanitorList({ searchParams }) {
  const router = useRouter();
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  const dispatch = useAppDispatch();
  const { janitors, totalPages, loading } = useAppSelector((state) => state.janitor);

  useEffect(() => {
    dispatch(fetchJanitors({ query, page }));
  }, [query, page]);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-3">Contact</p>
          <p className="col-span-3">Properties</p>
          <p className="col-span-1 text-center">Status</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {loading && janitors.length === 0 && <TableSkeleton />}
          {janitors?.map((janitor, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-2">{janitor.userId}</p>
              <p className="col-span-2">{janitor.name}</p>
              <div className="col-span-3">
                <p>{janitor.contactNumber}</p>
                <p>{janitor.email}</p>
              </div>
              <p className="col-span-3 flex flex-wrap gap-2">
                {janitor.properties.map((property, index) => (
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
                {janitor.status === "ACTIVE" ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">{janitor.status}</span>
                )}
              </div>
              <div className="col-span-1 flex justify-center">
                <Button outline size="xs" onClick={() => router.push(`janitors/${janitor.userId}`)}>
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
