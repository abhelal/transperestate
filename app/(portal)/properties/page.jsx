"use client";

import React, { useState, useEffect } from "react";
import Search from "@/components/ui/Search";
import CreateNewModal from "./CreateModal";
import clientApi from "@/libs/clientApi";
import PropertyList from "./PropertyList";

export default function Properties({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await clientApi.get("/properties/list", { params: { query, page } });
        setProperties(res.data.properties);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, [query, page]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="pb-4">
        <p className="text-xl font-semibold">Properties</p>
        <div className="mt-2 flex justify-between">
          <Search placeholder="Search Properties" />
          <CreateNewModal />
        </div>
      </div>
      <PropertyList loading={loading} properties={properties} totalPages={totalPages} />
    </div>
  );
}
