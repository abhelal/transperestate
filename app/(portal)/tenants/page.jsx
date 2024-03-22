import React from "react";
import Search from "@/components/ui/Search";
import CreateTenant from "./CreateTenantModal";
import TenantList from "./TenantList";

export default function Tenants({ searchParams }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Tenants</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Tenant" />
          <CreateTenant searchParams={searchParams} />
        </div>
      </div>
      <TenantList searchParams={searchParams} />
    </div>
  );
}
