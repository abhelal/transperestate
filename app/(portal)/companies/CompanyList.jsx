"use client";

import React from "react";
import { Table } from "flowbite-react";
import { LinkButton, LinkButtonOutlined } from "@/components/ui/Link";
export default function CompanyList({ companies }) {
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
        {companies?.map((company, index) => (
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{company.companyId}</Table.Cell>
            <Table.Cell>{company.name}</Table.Cell>
            <Table.Cell>{company.owner.email}</Table.Cell>
            <Table.Cell>{company.contactNumber}</Table.Cell>
            <Table.Cell>{company.address}</Table.Cell>
            <Table.Cell>{company.country}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-3">
                <LinkButtonOutlined href={`/companies/${company.companyId}/update`}>
                  Edit
                </LinkButtonOutlined>
                <LinkButton href={`/companies/${company.companyId}`}>Visit</LinkButton>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
