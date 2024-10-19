import React from "react";
import serverApi from "@/libs/serverApi";

export default async function RentalDetails({ params }) {
  const apartmentId = params.apartmentId || "";
  const res = await serverApi.get(`/tenants/myrental/${apartmentId}`).catch((e) => {});
  const rental = res?.data?.rental || {};
  return <div>RentalDetails {JSON.stringify(rental, null, 2)}</div>;
}
