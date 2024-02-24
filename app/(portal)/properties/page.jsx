import React from "react";
import Search from "@/components/ui/Search";
import CreateNewModal from "./CreateModal";
import PropertyList from "./PropertyList";

export default function Properties({ searchParams }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Properties</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Properties" />
          <CreateNewModal />
        </div>
      </div>
      <PropertyList searchParams={searchParams} />
    </div>
  );
}
