import React from "react";

export default function Finanace() {
  return (
    <div>
      <div className="text-xl font-semibold">
        <p>Finance</p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        <button className="flex flex-col w-full h-36 items-center justify-center boxshadow-md bg-white rounded-lg hover:scale-105 transition duration-300 gap-2">
          <p className="text-md font-semibold">Bills</p>
        </button>
      </div>
    </div>
  );
}
