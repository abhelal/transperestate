"use server";
import axios from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

serverApi.interceptors.request.use(
  async function (config) {
    const cookieStore = cookies();
    config.headers.cookie = cookieStore;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default serverApi;
