"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function LegalAndAbout() {
  const router = useRouter();
  const menuItems = [
    {
      name: "Terms & Conditions",
      route: "/terms-and-conditions",
    },
    {
      name: "Privacy Policy",
      route: "/privacy-policy",
    },
    {
      name: "Refund Policy",
      route: "/refund-policy",
    },
    {
      name: "About Us",
      route: "/about-us",
    },
  ];
  return (
    <div className="flex justify-between gap-8 p-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(`legal-and-about${item.route}`)}
          className="w-full h-48 bg-white boxshadow rounded-lg flex items-center justify-center text-2xl text-gray-500"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
