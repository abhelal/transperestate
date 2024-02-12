import React from "react";
import CompanyList from "./CompanyList";
import api from "@/libs/axios";
import Search from "@/components/ui/Search";
import CreateModal from "./CreateModal";

const getCompanies = async (query, page) => {
  try {
    const res = await api.get("/company/list", { params: { query, page } });
    return res.data;
  } catch (error) {
    return { companies: [], totalPages: 0 };
  }
};

export default async function Companies({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const { companies, totalPages } = await getCompanies(query, page);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Companies</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Companies" />
          <CreateModal />
        </div>
      </div>
      <CompanyList companies={companies} totalPages={totalPages} />
    </div>
  );
}
