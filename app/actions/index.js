"use server";
import serverApi from "@/libs/serverApi";

export const getUser = async () => {
  try {
    const res = await serverApi.get("/auth/me");
    return res.data.user;
  } catch (error) {
    return null;
  }
};
