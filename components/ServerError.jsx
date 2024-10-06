import React from "react";
import Image from "next/image";

export default function ServerError({ message }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <Image src="/images/error.png" width={400} height={400} loading="eager" priority alt="Server Error" />
      <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
    </div>
  );
}
