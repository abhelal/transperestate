import React from "react";
import serverApi from "@/libs/serverApi";
import { propertyTypes } from "@/constants/propertyTypes";
import Filter from "./Filter";

export default async function PropertiesReport({ searchParams }) {
  const type = searchParams?.type || "";
  const res = await serverApi.get("/reports/properties", { params: { type } }).catch((error) => {
    console.error(error);
  });
  const properties = res.data.properties || [];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4 flex justify-between">
        <div className="text-xl font-semibold">
          <p>Properties</p>
        </div>
        <Filter />
      </div>
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <p className="col-span-3">Name</p>
          <p className="col-span-4">Adress</p>
          <p className="col-span-1">Type</p>
          <p className="col-span-1 text-center">Status</p>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {properties?.map((property, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <div className="col-span-3">
                <p className=" font-semibold">{property.name}</p>
                <p className="col-span-4">{`${property.street} ${property.buildingNo}, ${property.zipCode} ${property.city}, ${property.country}`}</p>
              </div>
              <p className="col-span-4">{`${property.street} ${property.buildingNo}, ${property.zipCode} ${property.city}, ${property.country}`}</p>
              <p className="col-span-1">{propertyTypes.find((p) => p.value === property.propertyType)?.label}</p>
              <div className="col-span-1 text-center">
                {property.archived ? <span className="text-red-500">Archived</span> : <span className="text-green-500">Active</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
