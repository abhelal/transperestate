"use client";

import React from "react";
import { Button, Label, TextInput, Select, Datepicker } from "flowbite-react";

export default function PersonalInformation() {
  return (
    <form className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Personal Information</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="firstName" value="First Name" />
            </div>
            <TextInput
              id="firstName"
              type="text"
              placeholder="First Name"
              required
              shadow
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lastName" value="Last Name" />
            </div>
            <TextInput
              id="lastName"
              type="text"
              placeholder="Last Name"
              required
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
              shadow
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput id="password" type="password" required shadow />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="contactNumber" value="Contact Number" />
            </div>
            <TextInput
              id="contactNumber"
              type="tel"
              placeholder="Contact Number"
              required
              shadow
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="job" value="Job" />
            </div>
            <TextInput id="job" type="text" placeholder="Job" required shadow />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="age" value="Age" />
            </div>
            <TextInput
              id="age"
              type="number"
              placeholder="Age"
              required
              shadow
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="familyMember" value="Family Member" />
            </div>
            <TextInput
              id="familyMember"
              type="text"
              placeholder="Family Member"
              required
              shadow
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Previous Address</p>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="prevAddress" value="Address" />
          </div>
          <TextInput
            id="prevAddress"
            type="text"
            placeholder="Enter your address"
            required
            shadow
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="prevCountry" value="Country" />
            </div>
            <Select id="prevCountry" required>
              <option value="">Select Country</option>
            </Select>
          </div>
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="prevState" value="State" />
            </div>
            <TextInput
              id="prevState"
              type="text"
              placeholder="Enter your state"
              required
              shadow
            />
          </div>
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="prevCity" value="City" />
            </div>
            <TextInput
              id="prevCity"
              type="text"
              placeholder="Enter your city"
              required
              shadow
            />
          </div>
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="prevZipCode" value="Zip Code" />
            </div>
            <TextInput
              id="prevZipCode"
              type="text"
              placeholder="Enter your zip code"
              required
              shadow
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Permanent Address</p>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="permAddress" value="Address" />
          </div>
          <TextInput
            id="permAddress"
            type="text"
            placeholder="Enter your address"
            required
            shadow
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="permCountry" value="Country" />
            </div>
            <Select id="permCountry" required>
              <option value="">Select Country</option>
            </Select>
          </div>
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="permState" value="State" />
            </div>
            <TextInput
              id="permState"
              type="text"
              placeholder="Enter your state"
              required
              shadow
            />
          </div>
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="permCity" value="City" />
            </div>
            <TextInput
              id="permCity"
              type="text"
              placeholder="Enter your city"
              required
              shadow
            />
          </div>
          <div className="w-full md:w-1/4">
            <div className="mb-2 block">
              <Label htmlFor="permZipCode" value="Zip Code" />
            </div>
            <TextInput
              id="permZipCode"
              type="text"
              placeholder="Enter your zip code"
              required
              shadow
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button type="submit">Save and Next</Button>
      </div>
    </form>
  );
}
