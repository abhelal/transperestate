"use client";

import React, { useState, useEffect } from "react";
import { Table, Button } from "flowbite-react";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
// Mock data for expenses
const mockExpenses = [
  {
    id: "1",
    name: "Expense 1",
    property: "Property 1",
    unit: "Unit 1",
    expenseType: "Expense Type 1",
    description: "Description 1",
    totalAmount: 100,
    responsibilities: ["Tenant"],
    documents: "document1.pdf",
  },
  {
    id: "2",
    name: "Expense 2",
    property: "Property 2",
    unit: "Unit 2",
    expenseType: "Expense Type 2",
    description: "Description 2",
    totalAmount: 200,
    responsibilities: ["Property Owner"],
    documents: "document2.pdf",
  },
  // Add more mock expenses as needed
];

const ExpensesTable = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Simulate fetching expenses from your backend API
    setExpenses(mockExpenses);
  }, []);

  const handleEditExpense = (expenseId) => {
    // Implement logic to navigate to the edit expense page
    console.log(`Edit expense with ID ${expenseId}`);
  };

  const handleDeleteExpense = (expenseId) => {
    // Implement logic to delete the expense
    console.log(`Delete expense with ID ${expenseId}`);
  };

  return (
    <div>
      <div className="pb-4">
        <p className="text-xl font-semibold">Expenses</p>
        <div className="mt-2 flex justify-between">
          <div className="w-full max-w-xs flex items-center bg-white p-1.5 px-4 rounded-lg">
            <div>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <input
              className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
              placeholder="Search expense"
            ></input>
          </div>
          <Button onClick={() => router.push("/expense/new")}>
            Add New Expense
          </Button>
        </div>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Property & Unit</Table.HeadCell>
          <Table.HeadCell>Expense Type</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Total Amount</Table.HeadCell>
          <Table.HeadCell>Responsibilities</Table.HeadCell>
          <Table.HeadCell>Documents</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {expenses.map((expense) => (
            <Table.Row
              key={expense.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{expense.name}</Table.Cell>
              <Table.Cell>{`${expense.property}, ${expense.unit}`}</Table.Cell>
              <Table.Cell>{expense.expenseType}</Table.Cell>
              <Table.Cell>{expense.description}</Table.Cell>
              <Table.Cell>{expense.totalAmount}</Table.Cell>
              <Table.Cell>{expense.responsibilities.join(", ")}</Table.Cell>
              <Table.Cell>{expense.documents}</Table.Cell>
              <Table.Cell className="space-x-2">
                <button onClick={() => handleEditExpense(expense.id)}>
                  <HiOutlinePencilSquare />
                </button>
                <button
                  className=" text-red-500"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <GoTrash />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ExpensesTable;
