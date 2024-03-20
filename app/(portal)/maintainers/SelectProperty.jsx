"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Table } from "flowbite-react";
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
    return data.properties.includes(id);
  };

  const handleCheck = (e) => {
    const { id, name, checked } = e.target;
    if (name === "head-checkbox") {
      if (checked) {
        setData((prevData) => ({
          ...prevData,
          properties: properties.map((property) => property._id),
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          properties: [],
        }));
      }
    } else {
      if (checked) {
        setData((prevData) => ({
          ...prevData,
          properties: [...prevData.properties, id],
        }));
      } else {
        setData((prevData) => ({
          ...prevData,
          properties: prevData.properties.filter((property) => property !== id),
        }));
      }
    }
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
                  <Table.HeadCell className="p-4">
                    <Checkbox name="head-checkbox" onChange={handleCheck} />
                  </Table.HeadCell>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {!loading &&
                    properties.length > 0 &&
                    properties.map((property, index) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="p-4">
                          <Checkbox
                            checked={isChecked(property._id)}
                            id={property._id}
                            name="cell-checkbox"
                            onChange={handleCheck}
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                You have selected{" "}
                <span className=" text-primary-500 font-semibold">{data.properties.length}</span>{" "}
                {data.properties.length > 1 ? "properties" : "property"}
              </div>
              <Button size="xs" onClick={() => setOpenModal(false)}>
                Submit
              </Button>
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
