"use client";

import React, { useState } from "react";
import { LinkButton } from "@/components/ui/Link";
import Pagination from "@/components/ui/pagination";
import { TableWithImageSkeleton } from "@/components/ui/LoadingSkeletons";
import { Button } from "flowbite-react";
import UpdateModal from "./updateModal";
import clientApi from "@/libs/clientApi";
import Image from "next/image";

export default function PropertyList({ loading, properties, totalPages }) {
  const [openModal, setOpenModal] = useState(false);
  const [property, setProperty] = useState({});

  const openUpdateModal = async (propertyId) => {
    const res = await clientApi.get(`/properties/${propertyId}`);
    const property = res.data.property;
    setProperty(property);
    setOpenModal(true);
  };

  return (
    <>
      <UpdateModal openModal={openModal} setOpenModal={setOpenModal} property={property} />

      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-3">Adress</p>
          <p className="col-span-1">Type</p>
          <p className="col-span-1 text-center">Status</p>
          <div className="col-span-2 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {loading && <TableWithImageSkeleton />}
          {properties?.map((property, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-2">{property.propertyId}</p>
              <div className="col-span-3 flex items-center gap-3">
                <div className="relative w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                  {property.image && (
                    <Image src={property.image} width={40} height={40} objectFit="cover" alt="" />
                  )}
                </div>
                <p>{property.name}</p>
              </div>
              <p className="col-span-3">{`${property.street} ${property.buildingNo}, ${property.zipCode} ${property.city}, ${property.country}`}</p>
              <p className="col-span-1">{property.propertyType}</p>
              <div className="col-span-1 text-center">
                {property.archived ? (
                  <span className="text-red-500">Archived</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-3">
                <Button outline onClick={() => openUpdateModal(property.propertyId)}>
                  Update
                </Button>
                <LinkButton href={`/properties/${property.propertyId}`}>Visit</LinkButton>
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
