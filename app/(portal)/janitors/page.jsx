import React from "react";
import JanitorList from "./JanitorList";
import Search from "@/components/ui/Search";
import CreateJanitor from "./CreateJanitorModal";

export default function Janitors({ searchParams }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Janitors</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Janitor" />
          <CreateJanitor searchParams={searchParams} />
        </div>
      </div>
      <JanitorList searchParams={searchParams} />
    </div>
  );
}
