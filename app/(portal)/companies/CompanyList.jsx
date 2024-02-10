"use client";

import React from "react";
import { Button, Table } from "flowbite-react";
export default function CompanyList({ companies }) {
  const handleEdit = (id) => {};
  const handleVisit = (id) => {};

  return (
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
        {companies?.map((client) => (
          <Table.Row key={client.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{client.id}</Table.Cell>
            <Table.Cell>{client.name}</Table.Cell>
            <Table.Cell>{client.email}</Table.Cell>
            <Table.Cell>{client.contactNumber}</Table.Cell>
            <Table.Cell>{client.address}</Table.Cell>
            <Table.Cell>{client.country}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-3">
                <Button outline onClick={handleEdit}>
                  Edit
                </Button>
                <Button onClick={handleVisit}>Visit</Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
