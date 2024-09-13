import Image from "next/image";
import React from "react";

export default function Screen() {
  return (
    <div className="bg-primary-500 p-10 flex justify-center">
      <div className="w-full max-w-6xl py-10">
        <p className="text-5xl text-white font-semibold text-center">Streamline Your Property Management</p>
        <p className="text-white text-center py-8">
          Our user-friendly app is designed to simplify property management. From rent collection and maintenance scheduling to tenant
          communication and financial reporting, we provide the tools you need to streamline your operations and increase efficiency.
        </p>
        <Image alt="properties" src={"/images/property.webp"} width={1200} height={900} className=" rounded-lg overflow-hidden" />
      </div>
    </div>
  );
}
