"use client";

import React, { useState } from "react";
import { Table, Button, Datepicker } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const PaymentListTable = () => {
  // Sample payment data
  const [payments, setPayments] = useState([
    {
      id: 1,
      property: "Property A",
      unit: "Unit 101",
      tenant: "John Doe",
      amount: 1000,
      status: "Paid",
      date: "2023-01-15",
    },
    {
      id: 2,
      property: "Property B",
      unit: "Unit 202",
      tenant: "Jane Smith",
      amount: 1500,
      status: "Pending",
      date: "2023-01-20",
    },
    // Add more payment data as needed
  ]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = () => {
    // Implement logic to filter payments based on date range
    // For example, you can update the payments state with filtered data
    console.log("Filtering from", fromDate, "to", toDate);
  };

  return (
    <div>
      <p className="text-xl font-semibold">Payments</p>
      <div className="flex items-center justify-end gap-4 mb-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
              From Date
            </label>
            <Datepicker id="fromDate" value={fromDate} onChange={(value) => setFromDate(value)} />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <Datepicker id="toDate" value={toDate} onChange={(value) => setToDate(value)} />
          </div>
          <div>
            <Button onClick={handleFilter}>Filter</Button>
          </div>
        </div>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Property</Table.HeadCell>
          <Table.HeadCell>Unit No</Table.HeadCell>
          <Table.HeadCell>Tenant</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {payments.map((payment) => (
            <Table.Row key={payment.id} className="bg-light dark:bg-dark dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{payment.id}</Table.Cell>
              <Table.Cell>{payment.property}</Table.Cell>
              <Table.Cell>{payment.unit}</Table.Cell>
              <Table.Cell>{payment.tenant}</Table.Cell>
              <Table.Cell>{payment.amount}</Table.Cell>
              <Table.Cell>{payment.status}</Table.Cell>
              <Table.Cell>{payment.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PaymentListTable;
