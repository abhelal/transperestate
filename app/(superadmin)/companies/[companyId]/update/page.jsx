import React from "react";
import api from "@/libs/axios";
import UpdateCompany from "./updateForm";

export default async function CompanyUpdate({ params }) {
  const companyId = params.companyId;
  const res = await api.get(`/company/${companyId}`);
  const company = res.data.company;
  return <UpdateCompany company={company} />;
}
