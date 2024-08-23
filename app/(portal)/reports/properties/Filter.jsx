"use client";

import React from "react";
import { Dropdown } from "flowbite-react";
import { propertyTypes } from "@/constants/propertyTypes";
import { HiOutlineFilter } from "react-icons/hi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterData = (propertyType) => {
    const params = new URLSearchParams(searchParams);
    propertyType ? params.set("type", propertyType) : params.delete("type");
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex justify-end w-36">
      <Dropdown
        label="Filter"
        renderTrigger={() => (
          <div className="flex items-center gap-2 cursor-pointer">
            <HiOutlineFilter className="w-5 h-5 text-gray-600" />
          </div>
        )}
        placement="bottom"
      >
        <Dropdown.Item onClick={() => filterData("")}>All</Dropdown.Item>
        {propertyTypes.map((propertyType, index) => (
          <Dropdown.Item key={index} onClick={() => filterData(propertyType.value)}>
            {propertyType.label}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}
