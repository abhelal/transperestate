"use client";

import React from "react";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";

export default function PaginationSelf({ totalPages, page, setPage }) {
  if (totalPages === 1) return null;
  return (
    <div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-100"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <HiMiniChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <p className=" text-xs">
          {page} of {totalPages}
        </p>
        <button
          className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-100"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <HiMiniChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
