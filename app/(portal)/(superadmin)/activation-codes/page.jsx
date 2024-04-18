import React from "react";
import ActivationCodeList from "./ActivationCodeList";
import Search from "@/components/ui/Search";
import serverApi from "@/libs/serverApi";
import GenerateNewCode from "./GenerateNew";

export default async function ActivationCodes({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/coupons", { params: { query, page } });

  const { coupons, totalPages } = res.data;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Activation Codes</p>
        <div className="mt-2 flex w-full justify-between gap-2">
          <Search placeholder="Search by user" />
          <GenerateNewCode />
        </div>
      </div>
      <ActivationCodeList totalPages={totalPages} coupons={coupons} />
    </div>
  );
}
