"use client";

import React, { useState } from "react";
import { Button, Label, TextInput, Select, Avatar } from "flowbite-react";

export default function AddMaintainerForm() {
  const [maintainerImage, setMaintainerImage] = useState(null);
  const [hiddenImageInput, setHiddenImageInput] = useState(null);
  const [maintainerName, setMaintainerName] = useState("");
  const [maintainerEmail, setMaintainerEmail] = useState("");
  const [maintainerContactNumber, setMaintainerContactNumber] = useState("");
  const [maintainerPassword, setMaintainerPassword] = useState("");
  const [property, setProperty] = useState("");

  const handleImageChange = (e) => {
    setMaintainerImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditImage = () => {
    hiddenImageInput.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., API call or state update)
    console.log("Form submitted:", {
      maintainerImage,
      maintainerName,
      maintainerEmail,
      maintainerContactNumber,
      maintainerPassword,
      property,
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg p-6">
        <p className="text-lg font-semibold">Maintainer Information</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="flex items-center space-x-4">
              <Avatar
                rounded
                size="lg"
                src={maintainerImage}
                onClick={handleEditImage}
              />
              <input
                type="file"
                id="maintainerImage"
                accept=".jpg, .jpeg, .png"
                style={{ display: "none" }}
                ref={(input) => setHiddenImageInput(input)}
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="maintainerImage" value="Maintainer Image" />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="maintainerName" value="Maintainer Name" />
            </div>
            <TextInput
              id="maintainerName"
              type="text"
              placeholder="Enter maintainer name"
              value={maintainerName}
              onChange={(e) => setMaintainerName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="maintainerEmail" value="Maintainer Email" />
            </div>
            <TextInput
              id="maintainerEmail"
              type="email"
              placeholder="name@flowbite.com"
              value={maintainerEmail}
              onChange={(e) => setMaintainerEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label
                htmlFor="maintainerContactNumber"
                value="Maintainer Contact Number"
              />
            </div>
            <TextInput
              id="maintainerContactNumber"
              type="tel"
              placeholder="Maintainer contact number"
              value={maintainerContactNumber}
              onChange={(e) => setMaintainerContactNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="maintainerPassword" value="Maintainer Password" />
            </div>
            <TextInput
              id="maintainerPassword"
              type="password"
              placeholder="Enter maintainer password"
              value={maintainerPassword}
              onChange={(e) => setMaintainerPassword(e.target.value)}
              required
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="property" value="Associated Property" />
            </div>
            <Select
              id="property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              required
            >
              <option value="">Select Property</option>
              <option value="property1">Property 1</option>
              <option value="property2">Property 2</option>
              {/* Add more properties as needed */}
            </Select>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit">Add Maintainer</Button>
      </div>
    </form>
  );
}
