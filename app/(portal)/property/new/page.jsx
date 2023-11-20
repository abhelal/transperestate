"use client";

import React, { useState } from "react";
import { Button, Label, TextInput, Select, Datepicker } from "flowbite-react";

export default function AddNewProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [rent, setRent] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [lateFee, setLateFee] = useState("");
  const [incidentReceipt, setIncidentReceipt] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., API call or state update)
    console.log("Form submitted:", {
      propertyType,
      address,
      country,
      state,
      city,
      zipCode,
      rent,
      securityDeposit,
      lateFee,
      incidentReceipt,
      paymentDueDate,
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg p-4">
        <p className="text-lg font-semibold">Property Details</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="propertyType" value="Property Type" />
            </div>
            <Select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              required
            >
              <option value="">Select Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              {/* Add more property types as needed */}
            </Select>
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="rent" value="Rent" />
            </div>
            <TextInput
              id="rent"
              type="number"
              placeholder="0.00"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              required
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 bg-white rounded-lg p-6">
        <p className="text-lg font-semibold">Address Details</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="country" value="Country" />
            </div>
            <TextInput
              id="country"
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="state" value="State" />
            </div>
            <TextInput
              id="state"
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="zipCode" value="Zip Code" />
            </div>
            <TextInput
              id="zipCode"
              type="text"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 bg-white rounded-lg p-6">
        <p className="text-lg font-semibold">Rental Information</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="securityDeposit" value="Security Deposit" />
            </div>
            <TextInput
              id="securityDeposit"
              type="number"
              placeholder="0.00"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value)}
              required
              step="0.01"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lateFee" value="Late Fee" />
            </div>
            <TextInput
              id="lateFee"
              type="number"
              placeholder="0.00"
              value={lateFee}
              onChange={(e) => setLateFee(e.target.value)}
              required
              step="0.01"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="incidentReceipt" value="Incident Receipt" />
            </div>
            <TextInput
              id="incidentReceipt"
              type="number"
              placeholder="0.00"
              value={incidentReceipt}
              onChange={(e) => setIncidentReceipt(e.target.value)}
              required
              step="0.01"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="paymentDueDate" value="Payment due on date" />
            </div>
            <Datepicker
              id="paymentDueDate"
              name="paymentDueDate"
              placeholder="Select due date"
              selected={paymentDueDate}
              onChange={(date) => setPaymentDueDate(date)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
