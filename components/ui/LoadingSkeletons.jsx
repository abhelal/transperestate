import React from "react";

export function TableSkeleton() {
  const arr = Array.from({ length: 20 }, (_, i) => i);
  return (
    <>
      {arr.map((i) => (
        <div
          key={i}
          className="animate-pulse grid grid-cols-12 p-2 gap-3 items-center border-b text-sm"
        >
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-3 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
        </div>
      ))}
    </>
  );
}

export function TableWithImageSkeleton() {
  const arr = Array.from({ length: 20 }, (_, i) => i);
  return (
    <>
      {arr.map((i) => (
        <div
          key={i}
          className="animate-pulse grid grid-cols-12 p-2 gap-3 items-center border-b text-sm"
        >
          <div className="col-span-3 flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100"></div>
            <div className="h-10 w-20 bg-gray-100 rounded-md"></div>
          </div>
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
        </div>
      ))}
    </>
  );
}
