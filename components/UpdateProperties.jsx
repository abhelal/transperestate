"use client";
import React from "react";
import { Checkbox } from "flowbite-react";
import SelectProperty from "@/components/SelectProperty";

export default function UpdateProperties({ data, setData }) {
  const handleCheck = (e) => {
    const { id } = e.target;
    setData((prevData) => ({
      ...prevData,
      properties: prevData.properties.filter((property) => property._id !== id),
    }));
  };

  return (
    <div className="mt-4 flex flex-col bg-light dark:bg-dark p-4 rounded-lg">
      <p className=" font-semibold">Properties</p>
      <div className="mt-2 grid grid-cols-10 p-4 text-xs font-semibold uppercase bg-gray-50 dark:bg-gray-700 rounded-t-xl">
        <p className="col-span-3">id</p>
        <p className="col-span-6">Name</p>
        <p className="col-span-1 text-center"></p>
      </div>
      <div>
        {data.properties.length > 0 &&
          data.properties.map((property, index) => (
            <div key={index} className="grid grid-cols-10 p-3 border-b">
              <div className="col-span-3">{property.propertyId}</div>
              <div className="col-span-6">{property.name}</div>
              <div className="col-span-1">
                <Checkbox checked={true} id={property._id} name="cell-checkbox" onChange={handleCheck} />
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4 flex items-center justify-end">
        <SelectProperty data={data} setData={setData} />
      </div>
    </div>
  );
}
