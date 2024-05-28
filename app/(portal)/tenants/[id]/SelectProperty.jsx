"use client";
import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Label, Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { fetchProperties } from "@/libs/features/property/propertyActions";
import SearchForm from "@/components/ui/SearchForm";
import PaginationSelf from "@/components/ui/PaginationSelf";

export default function SelectProperty({ data, setData, disabled = false }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { properties, loading, totalPages } = useAppSelector((state) => state.property);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProperties({ query, page }));
  }, [query, page]);

  const isChecked = (propertyId) => {
    if (!data.property) return false;
    return data.property.propertyId === propertyId;
  };

  const handleCheck = (property) => {
    const checked = isChecked(property.propertyId);
    if (!checked) {
      setData((prevData) => ({
        ...prevData,
        property: property,
        apartment: null,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        property: null,
        apartment: null,
      }));
    }
  };

  return (
    <div>
      <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div>
            <div className="flex justify-between">
              <SearchForm placeholder="Search Properties" onChange={setQuery} />
              <PaginationSelf totalPages={totalPages} page={page} setPage={setPage} />
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-10 p-4 text-sm font-semibold uppercase bg-gray-50 rounded-t-xl">
                <div className="col-span-1"></div>
                <p className="col-span-3">id</p>
                <p className="col-span-6">Name</p>
              </div>
              <div className="h-80 overflow-y-auto scrollboxmenu">
                {!loading && properties.length === 0 && <div className="mt-4 w-full text-center">No properties found.</div>}
                {!loading &&
                  properties.length > 0 &&
                  properties.map((property, index) => (
                    <div key={index} className="grid grid-cols-10 p-4 border-b hover:bg-gray-50">
                      <div className="col-span-1">
                        <Checkbox checked={isChecked(property.propertyId)} name="cell-checkbox" onChange={() => handleCheck(property)} />
                      </div>
                      <div className="col-span-3">{property.propertyId}</div>
                      <div className="col-span-6">{property.name}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button size={"sm"} onClick={() => setOpenModal(false)}>
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="property" value="Property" />
          </div>
          <button
            disabled={disabled}
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm text-start rounded-lg"
            onClick={() => setOpenModal(true)}
          >
            {data.property ? <span className="truncate">{data.property?.name}</span> : "Select Property"}
          </button>
        </div>
      </div>
    </div>
  );
}
