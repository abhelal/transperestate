"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Reports() {
  const router = useRouter();
  return (
    <div className="flex flex-col grow">
      <div className="text-xl font-semibold">
        <p>Reports</p>
      </div>

      <div className="flex items-center justify-center h-full grow">
        <p className="text-gray-500 italic">We are working on this, appreciate your feedback </p>
      </div>
      {/* <div className="mt-4 grid grid-cols-4 gap-4">
        <button
          onClick={() => router.push("/reports/properties")}
          className="flex flex-col w-full h-36 items-center justify-center boxshadow-md bg-light dark:bg-dark rounded-lg hover:scale-105 transition duration-300 gap-2"
        >
          <p className="text-md font-semibold">Properties</p>
        </button>
        <button
          onClick={() => router.push("/reports/maintenance")}
          className="flex flex-col w-full h-36 items-center justify-center boxshadow-md bg-light dark:bg-dark rounded-lg hover:scale-105 transition duration-300 gap-2"
        >
          <p className="text-md font-semibold">Maintenance</p>
        </button>
      </div> */}
    </div>
  );
}
