import React from "react";
import Search from "@/components/ui/Search";
import serverApi from "@/libs/serverApi";
import ServerError from "@/components/ServerError";
import ProviderList from "@/components/ProviderList";

export default async function ServiceProvider({ searchParams }) {
  let errorMessages = null;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const res = await serverApi.get("/provider/list", { params: { query, page } }).catch((error) => {
    errorMessages = error?.response?.data?.message;
  });
  const providers = res?.data?.providers || [];
  const totalPages = res?.data?.totalPages || 1;

  if (errorMessages) return <ServerError message={errorMessages} />;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Service Providers</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Provider" />
        </div>
      </div>
      <ProviderList providers={providers} totalPages={totalPages} />
    </div>
  );
}
