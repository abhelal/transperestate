"use client";

import React, { useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import { TableWithImageSkeleton } from "@/components/ui/LoadingSkeletons";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { fetchProperties } from "@/libs/features/property/propertyActions";
import { propertyTypes } from "@/constants/propertyTypes";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

export default function PropertyList({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { properties, loading, totalPages } = useAppSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchProperties({ query, page }));
  }, [query, page]);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-4">Adress</p>
          <p className="col-span-1">Type</p>
          <p className="col-span-1 text-center">Status</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {loading && properties.length === 0 && <TableWithImageSkeleton />}
          {properties?.map((property, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-2">{property.propertyId}</p>
              <div className="col-span-3">
                <p>{property.name}</p>
              </div>
              <p className="col-span-4">{`${property.street} ${property.buildingNo}, ${property.zipCode} ${property.city}, ${property.country}`}</p>
              <p className="col-span-1">
                {propertyTypes.find((p) => p.value === property.propertyType)?.label}
              </p>
              <div className="col-span-1 text-center">
                {property.archived ? (
                  <span className="text-red-500">Archived</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </div>
              <div className="col-span-1 flex items-center justify-end gap-3">
                <Button size="sm" onClick={() => router.push(`/properties/${property.propertyId}`)}>
                  View
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
