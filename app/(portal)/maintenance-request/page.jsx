"use client";
import React, { useState } from "react";
import { Button, Label, TextInput, TextArea, Select, Datepicker } from "flowbite-react";

export default function MaintenanceRequestForm() {
  const [tenantName, setTenantName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [maintenanceCategory, setMaintenanceCategory] = useState("");
  const [maintenanceDetails, setMaintenanceDetails] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., API call or state update)
    console.log("Form submitted:", {
      tenantName,
      contactNumber,
      email,
      maintenanceCategory,
      maintenanceDetails,
      scheduleDate,
    });
  };

  return (
    <form className="flex w-full flex-col items-center p-4 gap-4" onSubmit={handleSubmit}>
      <div className="flex w-full max-w-4xl flex-col gap-4 bg-light dark:bg-dark rounded-lg p-6">
        <p className="text-lg font-semibold">Tenant Information</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="tenantName" value="Tenant Name" />
            </div>
            <TextInput
              id="tenantName"
              type="text"
              placeholder="Enter tenant name"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="contactNumber" value="Contact Number" />
            </div>
            <TextInput
              id="contactNumber"
              type="tel"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-4xl flex-col gap-4 bg-light dark:bg-dark rounded-lg p-6">
        <p className="text-lg font-semibold">Maintenance Request Details</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="maintenanceCategory" value="Maintenance Category" />
            </div>
            <Select id="maintenanceCategory" value={maintenanceCategory} onChange={(e) => setMaintenanceCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="plumbing">Plumbing</option>
              <option value="electricity">Electricity</option>
              <option value="others">Others</option>
              {/* Add more categories as needed */}
            </Select>
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="maintenanceDetails" value="Maintenance Details" />
            </div>
            <TextInput
              id="maintenanceDetails"
              type="text"
              placeholder="Enter details of the maintenance request"
              value={maintenanceDetails}
              onChange={(e) => setMaintenanceDetails(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="scheduleDate" value="Schedule Maintenance On" />
            </div>
            <Datepicker
              id="scheduleDate"
              name="scheduleDate"
              placeholder="Select date"
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-4xl justify-end">
        <Button type="submit">Submit Maintenance Request</Button>
      </div>
    </form>
  );
}
