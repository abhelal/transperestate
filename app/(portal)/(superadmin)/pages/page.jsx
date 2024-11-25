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

    {
      name: "Coming Soon",
      route: "/coming-soon",
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 gap-8 p-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(`pages${item.route}`)}
          className="w-full h-40 bg-light dark:bg-dark boxshadow-md hover:scale-105 rounded-lg flex items-center justify-center text-xl text-gray-500 duration-300"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
