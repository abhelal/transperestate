"use client";
import React from "react";
import { HiOutlineSun } from "react-icons/hi2";
import { getTheme, setTheme } from "@/actions.js";

export default function ToggleTheme() {
  const toggleTheme = async () => {
    const theme = await getTheme();
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme();
    } else {
      document.documentElement.classList.remove("dark");
      setTheme();
    }
  };

  return (
    <button onClick={toggleTheme}>
      <HiOutlineSun className="w-6 h-6" />
    </button>
  );
}
