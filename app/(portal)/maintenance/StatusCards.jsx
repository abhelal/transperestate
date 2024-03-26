"use client";
import React from "react";
import { FaTools, FaCheck, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function StatusCards() {
  return (
    <div className="mt-3 block space-y-3 lg:flex lg:space-y-0 items-center gap-3">
      <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
        <FaTools size={20} color="#3498db" />
        <p className="font-semibold">Total Requests</p>
        <p className="text-xl font-semibold">120</p>
      </div>

      <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
        <FaSpinner size={20} color="#f39c12" />
        <p className="font-semibold">In Progress</p>
        <p className="text-xl font-semibold">3</p>
      </div>
      <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
        <FaExclamationTriangle size={20} color="#e74c3c" />
        <p className="font-semibold">Action Required</p>
        <p className="text-xl font-semibold">6</p>
      </div>
      <div className="w-full p-4 boxshadow-sm bg-white rounded-lg flex flex-col items-center">
        <FaCheck size={20} color="#2ecc71" />
        <p className="font-semibold">Solved</p>
        <p className="text-xl font-semibold">12</p>
      </div>
    </div>
  );
}
