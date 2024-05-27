"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Table, Label } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { fetchProperties } from "@/libs/features/property/propertyActions";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import SearchForm from "@/components/ui/SearchForm";

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
    return data.properties.find((prop) => prop._id === id);
  };

  const handleCheck = (property) => {
    setData((prevData) => ({
      ...prevData,
      properties: [property],
    }));
  };

  return (
    <div>
      <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div>
            <div>
              <SearchForm placeholder="Search Properties" onChange={setQuery} />
            </div>
            <div className="mt-4 h-96 overflow-y-auto scrollboxmenu">
              {loading && properties.length === 0 && <BodySkeleton />}
              {!loading && properties.length === 0 && <p>No properties found.</p>}
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="p-4"></Table.HeadCell>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {!loading &&
                    properties.length > 0 &&
                    properties.map((property, index) => (
                      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                          <Checkbox
                            checked={isChecked(property._id)}
                            id={property._id}
                            name="cell-checkbox"
                            onChange={() => handleCheck(property)}
                          />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {property.propertyId}
                        </Table.Cell>
                        <Table.Cell>{property.name}</Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
            <div className="flex items-center justify-end">
              <Button size="xs" onClick={() => setOpenModal(false)}>
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
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm text-start rounded-lg"
            onClick={() => setOpenModal(true)}
          >
            {properties.find((prop) => prop._id == data.properties[0])?.name || data.properties[0]?.name || "Select Property"}
          </button>
        </div>
      </div>
    </div>
  );
}
