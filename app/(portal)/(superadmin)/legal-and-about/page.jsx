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

    {
      name: "Contact Us",
      route: "/contact-us",
    },
  ];
  return (
    <div className="flex justify-between gap-8 p-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(`legal-and-about${item.route}`)}
          className="w-full h-40 bg-white boxshadow-md hover:scale-105 rounded-lg flex items-center justify-center text-xl text-gray-500 duration-300"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
