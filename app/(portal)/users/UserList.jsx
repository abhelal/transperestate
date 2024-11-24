"use client";

import React from "react";
import { Table } from "flowbite-react";
import { LinkButtonOutlined } from "@/components/ui/Link";

export default function UserList({ users }) {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Role</Table.HeadCell>
        <Table.HeadCell>Company</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>
          <div className="flex items-center justify-center">Actions</div>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users?.map((user, index) => (
          <Table.Row key={index} className="bg-light dark:bg-dark dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{user.userId}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>{user.country}</Table.Cell>
            <Table.Cell>{user.status}</Table.Cell>
            <Table.Cell>
              <LinkButtonOutlined href={`/users/${user.userId}/update`}>Update</LinkButtonOutlined>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
