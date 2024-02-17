import React from "react";
import api from "@/libs/clientApi";
import UpdateUser from "./updateForm";

const getUser = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data.user;
};

const getCompanies = async () => {
  const res = await api.get("/company/list");
  return res.data.companies;
};

export default async function CompanyUpdate({ params }) {
  const userId = params.userId;
  const user = await getUser(userId);
  const companies = await getCompanies();

  return <UpdateUser user={user} companies={companies} />;
}
