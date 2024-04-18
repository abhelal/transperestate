import React from "react";
import ClientList from "./ClientList";
import Search from "@/components/ui/Search";
import CreateModal from "./CreateModal";
import serverApi from "@/libs/serverApi";

export default async function Clients({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/company/list", { params: { query, page } });
  const { companies, totalPages } = res.data;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Companies </p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Companies" />
          <CreateModal />
        </div>
      </div>
      <ClientList companies={companies} totalPages={totalPages} />
    </div>
  );
}
