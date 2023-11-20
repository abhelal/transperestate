"use client";
import React, { useState } from "react";
import { Checkbox, Table } from "flowbite-react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

const maintainersData = [
  {
    id: 1,
    name: "Maintainer 1",
    email: "maintainer1@example.com",
    contactNumber: "123-456-7890",
    property: "Property 1",
  },
  {
    id: 2,
    name: "Maintainer 2",
    email: "maintainer2@example.com",
    contactNumber: "987-654-3210",
    property: "Property 2",
  },
  // Add more maintainers as needed
];

export default function MaintainersList() {
  const router = useRouter();
  const [selectedMaintainers, setSelectedMaintainers] = useState([]);

  const handleCheckboxChange = (maintainerId) => {
    const isSelected = selectedMaintainers.includes(maintainerId);
    if (isSelected) {
      setSelectedMaintainers((prevSelected) =>
        prevSelected.filter((id) => id !== maintainerId)
      );
    } else {
      setSelectedMaintainers((prevSelected) => [...prevSelected, maintainerId]);
    }
  };

  return (
    <div>
      <div className="pb-4">
        <p className="text-xl font-semibold">Maintainers</p>
        <div className="mt-2 flex justify-between">
          <div className="w-full max-w-xs flex items-center bg-white p-1.5 px-4 rounded-lg">
            <div>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <input
              className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
              placeholder="Search maintainer"
            ></input>
          </div>
          <Button onClick={() => router.push("/maintainer/new")}>
            Add New
          </Button>
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Maintainer Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Contact Number</Table.HeadCell>
          <Table.HeadCell>Property</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {maintainersData.map((maintainer) => (
            <Table.Row
              key={maintainer.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="p-4">
                <Checkbox
                  checked={selectedMaintainers.includes(maintainer.id)}
                  onChange={() => handleCheckboxChange(maintainer.id)}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {maintainer.name}
              </Table.Cell>
              <Table.Cell>{maintainer.email}</Table.Cell>
              <Table.Cell>{maintainer.contactNumber}</Table.Cell>
              <Table.Cell>{maintainer.property}</Table.Cell>
              <Table.Cell>
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
