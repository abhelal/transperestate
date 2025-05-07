import React from "react";
import AddNewType from "./AddNewType";
import serverApi from "@/libs/serverApi";
import PropertyList from "./PropertyList";

export default async function PropertyType() {
  // Fetch property types from the server
  const fetchPropertyTypes = async () => {
    try {
      const res = await serverApi.get("/app-settings/property-type");
      return res.data || [];
    } catch (error) {
      console.error("Error fetching property types:", error);
      return [];
    }
  };

  const propertyTypes = await fetchPropertyTypes();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <AddNewType />
      <PropertyList propertyTypes={propertyTypes} />
    </div>
  );
}
