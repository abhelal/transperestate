"use client";
import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  TextInput,
  Textarea,
  Label,
  Select,
} from "flowbite-react";

// Mock data for properties and tenants
const mockProperties = [
  { id: "property1", name: "Property 1" },
  { id: "property2", name: "Property 2" },
];

const mockTenants = [
  {
    id: "tenant1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  {
    id: "tenant2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
  },
  // Add more mock tenants as needed
];

const TenantCommunicationForm = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [tenants, setTenants] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    // Simulate fetching properties from your backend API
    setProperties(mockProperties);

    // Simulate fetching tenants for the default property from your backend API
    if (mockProperties.length > 0) {
      setSelectedProperty(mockProperties[0].id);
      setTenants(mockTenants.filter((tenant) => tenant.id !== "tenant1")); // Exclude the first tenant for demonstration
    }
  }, []);

  const handlePropertyChange = (propertyId) => {
    // Simulate fetching tenants based on the selected property from your backend API
    setSelectedProperty(propertyId);
    setTenants(mockTenants.filter((tenant) => tenant.id !== "tenant1")); // Exclude the first tenant for demonstration
    setSelectedTenants([]);
  };

  const handleCheckboxChange = (tenantId) => {
    const isSelected = selectedTenants.includes(tenantId);
    if (isSelected) {
      setSelectedTenants((prevSelected) =>
        prevSelected.filter((id) => id !== tenantId)
      );
    } else {
      setSelectedTenants((prevSelected) => [...prevSelected, tenantId]);
    }
  };

  const handleSendMessages = () => {
    // Implement logic to send bulk messages to the selected tenants
    // In a real application, you would likely make an API call to your backend
    console.log("Sending messages to:", selectedTenants);
    console.log("Message Subject:", messageSubject);
    console.log("Message Body:", messageBody);
  };

  return (
    <div className="space-y-4 bg-white rounded-lg p-4">
      <Label htmlFor="title" className="text-lg" value="Send New Message" />
      <div className="w-full max-w-md space-y-2">
        <Label htmlFor="property" value="Select Property" />
        <Select
          id="property"
          onChange={(value) => handlePropertyChange(value)}
          required
        >
          <option value="">Select Property</option>
          {properties.map((property) => (
            <option value={property.id}>{property.name}</option>
          ))}
        </Select>
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="subject" value="Subject" />
        <TextInput
          label="Message Subject"
          value={messageSubject}
          onChange={(e) => setMessageSubject(e.target.value)}
          required
        />
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="subject" value="Message Body" />
        <Textarea
          label="Message Body"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Checkbox id="email" />
          <Label htmlFor="email">Email </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="message" />
          <Label htmlFor="message">Text Message</Label>
        </div>
      </div>
      <Button onClick={handleSendMessages}>Send Now</Button>
    </div>
  );
};

export default TenantCommunicationForm;
