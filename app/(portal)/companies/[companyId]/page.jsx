import api from "@/libs/axios";
import React from "react";

export default async function Company({ params }) {
  const companyId = params.companyId;
  const res = await api.get(`/company/${companyId}`);
  const company = res.data.company;
  return <div>Company - {JSON.stringify(company)}</div>;
}
