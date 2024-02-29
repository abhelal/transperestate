import React from "react";
import MaintainerList from "./MaintainerList";
import Search from "@/components/ui/Search";
import CreateNewModal from "./CreateNewModal";

export default function Maintainers({ searchParams }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Maintainers</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Maintainer" />
          <CreateNewModal searchParams={searchParams} />
        </div>
      </div>
      <MaintainerList searchParams={searchParams} />
    </div>
  );
}
