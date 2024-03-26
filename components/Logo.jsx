import React from "react";
import Image from "next/image";

export default function Logo({ width = 60, height = 60 }) {
  return (
    <div>
      <Image src="/logo.png" width={width} height={height} alt="Tranparestate" />
    </div>
  );
}
