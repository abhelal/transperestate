import React from "react";
import { ImSpinner6 } from "react-icons/im";
import { ImSpinner9 } from "react-icons/im";

export function PageSkeleton() {
  return (
    <div className="absolute z-50 flex inset-0 justify-center items-center bg-gray-50 bg-opacity-15">
      <ImSpinner6 className="animate-spin text-6xl text-primary-500" />
    </div>
  );
}

export function BodySkeleton() {
  return (
    <div className="absolute z-50 flex inset-0 justify-center items-center bg-gray-50 bg-opacity-15">
      <ImSpinner9 className="lg:ml-44 animate-spin text-3xl text-primary-500" />
    </div>
  );
}

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
          <div className="col-span-2 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-3 flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100"></div>
            <div className="h-10 w-full bg-gray-100 rounded-md"></div>
          </div>
          <div className="col-span-3 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
          <div className="col-span-1 h-10 bg-gray-100 rounded-md"></div>
        </div>
      ))}
    </>
  );
}
