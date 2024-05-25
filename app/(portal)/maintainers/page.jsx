import React from "react";
import UserList from "@/components/UserList";
import Search from "@/components/ui/Search";
import CreateUser from "@/components/CreateUser";
import serverApi from "@/libs/serverApi";

export default async function PropertyMaintainer({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/user/maintainers", { params: { query, page } }).catch((e) => {});
  const users = res?.data?.users || [];
  const totalPages = res?.data?.totalPages || 1;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Property Maintainers</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Maintainer" />
          <CreateUser />
        </div>
      </div>
      <UserList users={users} totalPages={totalPages} />
    </div>
  );
}
