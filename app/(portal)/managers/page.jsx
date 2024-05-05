import React from "react";
import ManagerList from "./ManagerList";
import Search from "@/components/ui/Search";
import CreateManager from "./CreateManagerModal";
import serverApi from "@/libs/serverApi";

export default async function PropertyManager({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/user/managers", { params: { query, page } }).catch((e) => {});
  const managers = res?.data?.users || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Property Managers</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Manager" />
          <CreateManager searchParams={searchParams} />
        </div>
      </div>
      <ManagerList managers={managers} totalPages={totalPages} />
    </div>
  );
}
