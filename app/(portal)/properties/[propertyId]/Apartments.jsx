"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import NewApartment from "./NewApartment";
import { useAppSelector } from "@/libs/hooks";
import { useRouter } from "next/navigation";

export default function Apartments() {
  const router = useRouter();
  const { property } = useAppSelector((state) => state.property);
  const [openModal, setOpenModal] = useState(false);

  const groupedByFloor = property.apartments.reduce((acc, apartment) => {
    const key = apartment.floor;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(apartment);
    return acc;
  }, {});

  return (
    <div className="rounded-lg bg-white p-4">
      <NewApartment openModal={openModal} setOpenModal={setOpenModal} />
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold capitalize">Apartment</p>
        <Button onClick={() => setOpenModal(true)}>New</Button>
      </div>
      <div className="p-4">
        {Object.keys(groupedByFloor)
          .sort((a, b) => b - a) // sort floors in ascending order
          .map((floor) => (
            <div key={floor} className="mt-2">
              <div className="flex items-center gap-2">
                {groupedByFloor[floor]
                  .sort((a, b) => a.door.localeCompare(b.door))
                  .map((apartment) => (
                    <button
                      key={apartment.apartmentId}
                      onClick={() =>
                        router.push(
                          `/properties/${property.propertyId}/apartment/${apartment.apartmentId}`
                        )
                      }
                      className={`${
                        apartment.tenant ? "bg-green-300" : "bg-gray-100"
                      } hover:bg-primary-500 hover:text-white w-full p-1 text-sm rounded-md flex justify-between items-center`}
                    >
                      <p className="uppercase">
                        {floor}-{apartment.door}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
