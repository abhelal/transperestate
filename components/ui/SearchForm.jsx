"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchForm({ placeholder, onChange }) {
  return (
    <div className="w-full max-w-xs flex items-center bg-light dark:bg-dark p-1.5 px-4 rounded-lg">
      <div>
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      <input
        className="w-full bg-light dark:bg-dark focus:outline-none caret-primary-500 px-2 text-sm"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
