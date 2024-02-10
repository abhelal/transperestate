import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CompanyList from "./CompanyList";
import { LinkButton } from "@/components/ui/Link";

export default async function Companies() {
  const companies = [
    {
      id: 1,
      name: "Basundhora Properties",
      email: "john@example.com",
      contactNumber: "123456789",
      address: "123 Main St",
      country: "USA",
    },
    {
      id: 2,
      name: "Sagufta Housing",
      email: "john2@example.com",
      contactNumber: "123456789",
      address: "123 Main St",
      country: "USA",
    },
  ];

  return (
    <div>
      <div className="pb-4">
        <p className="text-xl font-semibold">Companies</p>
        <div className="mt-2 flex justify-between">
          <div className="w-full max-w-xs flex items-center bg-white p-1.5 px-4 rounded-lg">
            <div>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <input
              className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
              placeholder="Search company"
            ></input>
          </div>
          <LinkButton href="/companies/new">Create New Company</LinkButton>
        </div>
      </div>
      <CompanyList companies={companies} />
    </div>
  );
}
