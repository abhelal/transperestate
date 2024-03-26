"use client";
import React, { useState } from "react";
import { Modal, Label } from "flowbite-react";
import { useAppSelector } from "@/libs/hooks";

export default function SelectApartment({ data, setData }) {
  const { property } = useAppSelector((state) => state.property);
  const [openModal, setOpenModal] = useState(false);

  const groupedByFloor = property?.apartments.reduce((acc, apartment) => {
    const key = apartment.floor;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(apartment);
    return acc;
  }, {});

  return (
    <div>
      <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          {!property && <p>Please select property first</p>}
          {property && (
            <div>
              {property.apartments.length === 0 && (
                <div>
                  <p>This property have no apartment</p>
                </div>
              )}
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
                            className={`${
                              apartment.tenant ? "bg-green-200" : "bg-gray-100"
                            } w-full p-1 text-sm rounded-md flex justify-between items-center`}
                            onClick={() => {
                              setData({ ...data, apartment: apartment });
                              setOpenModal(false);
                            }}
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
          )}
        </Modal.Body>
      </Modal>

      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="apartment" value="Apartment" />
          </div>
          <button
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm text-start rounded-lg"
            onClick={() => setOpenModal(true)}
          >
            {data.apartment ? (
              <span className="uppercase">
                {data.apartment.floor}-{data.apartment.door}
              </span>
            ) : (
              "Select Apartment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
