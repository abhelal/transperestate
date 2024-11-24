"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { fetchProperties } from "@/libs/features/property/propertyActions";
import SearchForm from "@/components/ui/SearchForm";
import PaginationSelf from "@/components/ui/PaginationSelf";

export default function SelectProperty({ data, setData }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { properties, loading, totalPages } = useAppSelector((state) => state.property);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProperties({ query, page }));
  }, [query, page]);

  const isChecked = (id) => {
    if (data.properties.length === 0) return false;
    return data.properties.find((property) => property._id === id);
  };

  const handleCheck = (e) => {
    const { id, name, checked } = e.target;

    if (name === "head-checkbox") {
      if (checked) {
        setData((prevData) => ({
          ...prevData,
          properties: properties.map((property) => property),
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          properties: [],
        }));
      }
    } else {
      if (!checked) {
        setData((prevData) => ({
          ...prevData,
          properties: prevData.properties.filter((property) => property._id !== id),
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          properties: [...prevData.properties, properties.find((property) => property._id === id)],
        }));
      }
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
              <div className="grid grid-cols-10 p-4 text-sm font-semibold uppercase bg-gray-50 dark:bg-gray-600 rounded-t-xl">
                <div className="col-span-1">
                  <Checkbox
                    checked={data.properties.length === properties.length}
                    id="head-checkbox"
                    name="head-checkbox"
                    onChange={handleCheck}
                  />
                </div>
                <p className="col-span-3">id</p>
                <p className="col-span-6">Name</p>
              </div>
              <div className="h-80 overflow-y-auto scrollboxmenu">
                {!loading && properties.length === 0 && <div className="mt-4 w-full text-center">No properties found.</div>}
                {!loading &&
                  properties.length > 0 &&
                  properties.map((property, index) => (
                    <div key={index} className="grid grid-cols-10 p-4 border-b hover:bg-gray-50 hover:dark:bg-gray-800">
                      <div className="col-span-1">
                        <Checkbox checked={isChecked(property._id)} id={property._id} name="cell-checkbox" onChange={handleCheck} />
                      </div>
                      <div className="col-span-3">{property.propertyId}</div>
                      <div className="col-span-6">{property.name}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  You have selected <span className=" text-primary-500 font-semibold">{data.properties.length}</span>{" "}
                  {data.properties.length > 1 ? "properties" : "property"}
                </div>
                <Button size="xs" onClick={() => setOpenModal(false)}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <button className="text-primary-600 text-sm" onClick={() => setOpenModal(true)}>
        Select Property{` >>`}
      </button>
    </div>
  );
}
