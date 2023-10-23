import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import React from "react";

export default function Logo({ className = "W-10 h-10 text-primary-500" }) {
  return (
    <div>
      <BuildingOffice2Icon className={className} />
    </div>
  );
}
