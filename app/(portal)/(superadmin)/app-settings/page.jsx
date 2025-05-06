"use client";

import React from "react";
import { useRouter } from "next/navigation";
export default function AppSettings() {
  const router = useRouter();
  const menuItems = [
    { name: "Property Type", route: "/property-type" },
    { name: "Service Type", route: "/service-type" },
    { name: "Maintenance Status", route: "/maintenance-status" },
  ];
  return (
    <div className="flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(`app-settings${item.route}`)}
            className="w-full h-32 bg-white dark:bg-dark shadow-md hover:shadow-lg rounded-lg flex items-center justify-center text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
