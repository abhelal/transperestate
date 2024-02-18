"use client";

import React, { useEffect, useState } from "react";
import CompanyList from "./CompanyList";
import Search from "@/components/ui/Search";
import CreateModal from "./CreateModal";
import clientApi from "@/libs/clientApi";

export default function Companies({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const [companies, setCompanies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await clientApi.get("/company/list", { params: { query, page } });
        setCompanies(res.data.companies);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        return;
      }
      setLoading(false);
    };
    getCompanies();
  }, [page, query]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Companies </p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Companies" />
          <CreateModal />
        </div>
      </div>
      <CompanyList loading={loading} companies={companies} totalPages={totalPages} />
    </div>
  );
}
