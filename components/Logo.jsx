import React from "react";
import { TbBuildingEstate } from "react-icons/tb";

export default function Logo({ className = "w-16 h-16 text-primary-600" }) {
  return (
    <div>
      <TbBuildingEstate className={className} />
    </div>
  );
}
