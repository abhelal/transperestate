"use client";

import React from "react";
import { Button, Label, TextInput, Select, Datepicker } from "flowbite-react";

export default function HomeDetails() {
  return (
    <form className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Home Details</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="property" value="Property" />
            </div>
            <Select id="property" required>
              <option value="">Select Property</option>
            </Select>
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="unit" value="Unit" />
            </div>
            <Select id="unit" required>
              <option value="">Select Unit</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="leaseStartDate" value="Lease Start Date" />
            </div>
            <Datepicker
              id="leaseStartDate"
              name="leaseStartDate"
              placeholder="Select start date"
              required
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="leaseEndDate" value="Lease End Date" />
            </div>
            <Datepicker
              id="leaseEndDate"
              name="leaseEndDate"
              placeholder="Select end date"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Rent Information</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="generalRent" value="General Rent" />
            </div>
            <TextInput
              id="generalRent"
              type="number"
              placeholder="0.00"
              required
              step="0.01"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="securityDeposit" value="Security Deposit" />
            </div>
            <TextInput
              id="securityDeposit"
              type="number"
              placeholder="0.00"
              required
              step="0.01"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lateFee" value="Late Fee" />
            </div>
            <TextInput
              id="lateFee"
              type="number"
              placeholder="0.00"
              required
              step="0.01"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="incidentReceipt" value="Incident Receipt" />
            </div>
            <TextInput
              id="incidentReceipt"
              type="number"
              placeholder="0.00"
              required
              step="0.01"
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="paymentDueDate" value="Payment due on date" />
            </div>
            <Select id="paymentDueDate" required>
              <option value="">02</option>
              <option value="">03</option>
              <option value="">04</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit">Save and Next</Button>
      </div>
    </form>
  );
}
