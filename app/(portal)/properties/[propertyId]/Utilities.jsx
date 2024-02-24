import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Utilities() {
  const utilities = [
    { label: "Water", value: "water", included: true },
    { label: "Electricity", value: "electricity", included: false },
    { label: "Gas", value: "gas", included: true },
    { label: "Heating", value: "heating", included: false },
    { label: "Cooling", value: "cooling", included: true },
    { label: "Trash/Recycling", value: "trashRecycling", included: true },
    { label: "Internet/Cable", value: "internetCable", included: false },
    { label: "Sewer/Septic", value: "sewerSeptic", included: true },
    { label: "Landscaping/Gardening", value: "landscapingGardening", included: true },
    { label: "Pest Control", value: "pestControl", included: false },
  ];

  return (
    <div className="bg-white p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold capitalize">Utilities</p>
        <button outline onClick={() => {}}>
          <HiOutlinePencilSquare className="w-5 h-5" />
        </button>
      </div>

      {utilities.map((utility, i) => (
        <div key={i} className="flex items-center gap-3">
          <div>
            <IoMdCheckmarkCircleOutline className={utility.included ? "text-primary-600" : ""} />
          </div>
          <div>
            <p className="text-sm">{utility.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
