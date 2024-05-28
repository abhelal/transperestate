"use client";
import React, { useState } from "react";
import { Modal, Label } from "flowbite-react";

export default function SelectApartment({ data, setData, apartments, disabled = false }) {
  const [openModal, setOpenModal] = useState(false);

  const groupedByFloor = apartments.reduce((acc, apartment) => {
    const key = apartment.floor;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(apartment);
    return acc;
  }, {});

  return (
    <div className="relative">
      <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          {!data.property && <p>Please select property first</p>}
          {data.property && (
            <div>
              {apartments.length === 0 && (
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
                          <div className="w-full group">
                            <button
                              key={apartment.apartmentId}
                              disabled={apartment.tenant}
                              className={`${
                                apartment.tenant ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-primary-500 text-white"
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
                            <div className="hidden group-hover:flex flex-col absolute z-50 top-2 p-2 bg-primary-500 bg-opacity-50 rounded-md text-sm text-white">
                              <div>
                                <span>Size : </span> <span>{apartment.size} sqft</span>
                              </div>
                              <div>
                                <span>Rooms : </span> <span>{apartment.rooms}</span>
                              </div>
                            </div>
                          </div>
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
            disabled={disabled}
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
