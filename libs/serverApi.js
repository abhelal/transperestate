"use server";

import axios from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    cookie: cookies(),
  },
});

export default serverApi;
