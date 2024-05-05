import React from "react";
import ClientList from "./ClientList";
import Search from "@/components/ui/Search";
import serverApi from "@/libs/serverApi";

export default async function Clients({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/user/clients", { params: { query, page } }).catch((e) => {});
  const clients = res?.data?.clients || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Clients </p>
        <div className="mt-2">
          <Search placeholder="Search Clients" />
        </div>
      </div>
      <ClientList clients={clients} totalPages={totalPages} />
    </div>
  );
}
