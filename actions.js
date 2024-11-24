"use server";

import { cookies } from "next/headers";

export async function setTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  cookieStore.set("theme", theme === "light" ? "dark" : "light");
}

export async function getTheme() {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value || "light";
}
