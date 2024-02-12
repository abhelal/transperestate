import React from "react";
import CompanyList from "./CompanyList";
import { LinkButton } from "@/components/ui/Link";
import api from "@/libs/axios";
import Search from "@/components/ui/Search";

export default async function Companies({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await api.get("/company/list", { params: { query, page } });
  const { companies, totalPages } = res.data;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Companies</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Companies" />
          <LinkButton href="/companies/new">Create New Company</LinkButton>
        </div>
      </div>
      <CompanyList companies={companies} totalPages={totalPages} />
    </div>
  );
}
