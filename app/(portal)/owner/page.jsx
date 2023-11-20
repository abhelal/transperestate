"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";

const OwnerListTable = () => {
  // Sample owner data
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      contactNumber: "123456789",
      address: "123 Main St",
      country: "USA",
    },
    {
      id: 2,
      name: "Doe John",
      email: "john2@example.com",
      contactNumber: "123456789",
      address: "123 Main St",
      country: "USA",
    },
    // Add more owner data as needed
  ]);

  const handleEdit = (id) => {
    // Implement logic for editing an owner (e.g., navigate to edit page)
    console.log("Edit Owner ID:", id);
  };

  const handleDelete = (id) => {
    // Implement logic for deleting an owner (e.g., send delete request to the server)
    console.log("Delete Owner ID:", id);
    // Update the owners state after deletion
    setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== id));
  };

  return (
    <div>
      <div className="pb-4">
        <p className="text-xl font-semibold">Owners</p>
        <div className="mt-2 flex justify-between">
          <div className="w-full max-w-xs flex items-center bg-white p-1.5 px-4 rounded-lg">
            <div>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <input
              className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
              placeholder="Search owner"
            ></input>
          </div>
          <Button onClick={() => router.push("/owner/new")}>Add New</Button>
        </div>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Contact Number</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Country</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {owners.map((owner) => (
            <Table.Row key={owner.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{owner.id}</Table.Cell>
              <Table.Cell>{owner.name}</Table.Cell>
              <Table.Cell>{owner.email}</Table.Cell>
              <Table.Cell>{owner.contactNumber}</Table.Cell>
              <Table.Cell>{owner.address}</Table.Cell>
              <Table.Cell>{owner.country}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleEdit(owner.id)}
                    className="text-blue-500 hover:underline"
                  >
                    <HiOutlinePencilSquare />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(owner.id)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    <GoTrash />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OwnerListTable;
