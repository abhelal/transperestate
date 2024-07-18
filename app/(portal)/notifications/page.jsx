"use client";

import React, { useState, useEffect } from "react";
import { Table, Button } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
// Mock data for sent messages
const mockSentMessages = [
  {
    id: "1",
    tenant: "John Doe",
    property: "Property 1",
    messageType: "Email",
    subject: "Hello",
    status: "Sent",
  },
  {
    id: "2",
    tenant: "Jane Doe",
    property: "Property 2",
    messageType: "Text Message",
    subject: "Hi there",
    status: "Sent",
  },
  // Add more mock sent messages as needed
];

const SentMessagesTable = () => {
  const router = useRouter();
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    // Simulate fetching sent messages from your backend API
    setSentMessages(mockSentMessages);
  }, []);

  return (
    <div>
      <div className="pb-4">
        <p className="text-xl font-semibold">Sent Email / Text</p>
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
          <Button onClick={() => router.push("/email-text/new")}>
            Send New
          </Button>
        </div>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Tenant</Table.HeadCell>
          <Table.HeadCell>Property</Table.HeadCell>
          <Table.HeadCell>Message Type</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {sentMessages.map((message) => (
            <Table.Row
              key={message.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{message.id}</Table.Cell>
              <Table.Cell>{message.tenant}</Table.Cell>
              <Table.Cell>{message.property}</Table.Cell>
              <Table.Cell>{message.messageType}</Table.Cell>
              <Table.Cell>{message.subject}</Table.Cell>
              <Table.Cell>{message.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SentMessagesTable;
