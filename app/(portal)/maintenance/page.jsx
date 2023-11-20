import React from "react";
import { FaTools, FaCheck, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function Properties() {
  const properties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <p className="text-xl font-semibold flex items-center gap-2">Maintenance Requests</p>
      <div className="mt-3 flex items-center gap-3">
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

      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-2 px-4 border-b bg-gray-200 rounded-t-xl">
          <p className="col-span-2">Complaint</p>
          <p className="col-span-2">Property</p>
          <p className="col-span-1 text-center">Appartment</p>
          <p className="col-span-2 text-center">Requested By</p>
          <p className="col-span-1 text-center">Date</p>
          <p className="col-span-3 px-6">Description</p>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto">
          {properties.map((p, i) => (
            <div key={i} className="grid grid-cols-12 p-2 px-4 items-center border-b text-sm">
              <div className="col-span-2">
                <p>Plumbing</p>
                <p className="text-xs text-secondary-400">Request ID : MF-40254</p>
              </div>

              <div className="col-span-2">
                <p>Sky blue city house</p>
                <p className="text-xs text-secondary-400">123, ABC Street, Frankfut</p>
              </div>
              <p className="col-span-1 text-center">B-403</p>
              <p className="col-span-2 text-center"> John Doe</p>
              <p className="col-span-1 text-center">20-Oct-2023</p>
              <p className="col-span-3 pl-8">My shower is not working properly</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
