import React from "react";
import UserList from "@/components/UserList";
import Search from "@/components/ui/Search";
import CreateUser from "@/components/CreateUser";
import serverApi from "@/libs/serverApi";
import ServerError from "@/components/ServerError";

export default async function PropertyJanitor({ searchParams }) {
  let errorMessages = null;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/user/tenants", { params: { query, page } }).catch((e) => {
    errorMessages = e.response.data.message;
  });
  const users = res?.data?.users || [];
  const totalPages = res?.data?.totalPages || 1;

  if (errorMessages) return <ServerError message={errorMessages} />;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Property Tenants</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Tenants" />
          <CreateUser />
        </div>
      </div>
      <UserList users={users} totalPages={totalPages} />
    </div>
  );
}
