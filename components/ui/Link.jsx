import React from "react";
import Link from "next/link";

export function LinkButton({ href, children }) {
  return (
    <Link
      className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
      href={href}
    >
      <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">{children}</span>
    </Link>
  );
}

export function LinkButtonOutlined({ href, children }) {
  return (
    <Link
      className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-cyan-700 bg-light dark:bg-dark border border-cyan-700 enabled:hover:bg-cyan-50 focus:ring-cyan-300 dark:bg-cyan-800 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
      href={href}
    >
      <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">{children}</span>
    </Link>
  );
}
