"use server";
import serverApi from "@/libs/serverApi";

const getCompanies = async (query, page) => {
  try {
    const res = await serverApi.get("/company/list", { params: { query, page } });
    return res.data;
  } catch (error) {
    return { companies: [], totalPages: 0 };
  }
};

export default getCompanies;
