"use client";

import React, { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  FileInput,
  Textarea,
} from "flowbite-react";

const AddExpenseForm = () => {
  const [name, setName] = useState("");
  const [property, setProperty] = useState("");
  const [unit, setUnit] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState(null);

  const handleResponsibilitiesChange = (value) => {
    setResponsibilities(value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedDocuments(file);
  };

  const handleSaveExpense = () => {
    // Implement logic to save expense, including uploading documents
    console.log("Expense Details:", {
      name,
      property,
      unit,
      expenseType,
      description,
      totalAmount,
      responsibilities,
      uploadedDocuments,
    });
  };

  return (
    <form className="flex flex-col gap-4 bg-white rounded-lg p-4">
      <p className="text-lg font-semibold">Add New Expenses</p>
      <div className="flex gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="property" value="Property" />
          </div>
          <Select
            id="property"
            options={["Property 1", "Property 2", "Property 3"].map(
              (option) => ({ label: option, value: option })
            )}
            onChange={(value) => setProperty(value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="unit" value="Unit" />
          </div>
          <Select
            id="unit"
            options={["Unit 1", "Unit 2", "Unit 3"].map((option) => ({
              label: option,
              value: option,
            }))}
            onChange={(value) => setUnit(value)}
            required
          />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="expenseType" value="Expense Type" />
          </div>
          <Select
            id="expenseType"
            options={["Expense Type 1", "Expense Type 2", "Expense Type 3"].map(
              (option) => ({ label: option, value: option })
            )}
            onChange={(value) => setExpenseType(value)}
            required
          />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="totalAmount" value="Total Amount" />
          </div>
          <TextInput
            id="totalAmount"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="responsibilities" value="Responsibilities" />
          </div>
          <Select
            id="responsibilities"
            options={["Tenant", "Property Owner"].map((option) => ({
              label: option,
              value: option,
            }))}
            isMulti
            onChange={(values) => handleResponsibilitiesChange(values)}
            required
          />
        </div>
      </div>

      <div id="fileUpload" className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Upload Document" />
        </div>
        <FileInput id="file" />
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={() => console.log("Go back clicked")}>
          Back
        </Button>
        <Button type="button" onClick={handleSaveExpense}>
          Save Expenses
        </Button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
