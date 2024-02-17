import React from "react";
import UserList from "./UserList";
import { LinkButton } from "@/components/ui/Link";
import api from "@/libs/clientApi";
import Search from "@/components/ui/Search";
import Pagination from "@/components/ui/pagination";

export default async function Companies({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await api.get("/users/list", { params: { query, page } });
  const { users, totalPages } = res.data;

  return (
    <div>
      <div className="pb-4">
        <p className="text-xl font-semibold">Users</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Users" />
          <LinkButton href="/users/new">Create New User</LinkButton>
        </div>
      </div>
      <div className="overflow-x-auto">
        <UserList users={users} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
