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
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Country</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>
          <div className="flex items-center justify-center">Actions</div>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {companies?.map((company, index) => (
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{company.companyId}</Table.Cell>
            <Table.Cell>{company.name}</Table.Cell>
            <Table.Cell>{company.address}</Table.Cell>
            <Table.Cell>{company.country}</Table.Cell>
            <Table.Cell>
              {company.archived ? (
                <span className="text-red-500">Archived</span>
              ) : (
                <span className="text-green-500">Active</span>
              )}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center justify-end gap-3">
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
