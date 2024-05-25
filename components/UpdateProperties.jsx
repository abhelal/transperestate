"use client";
import React, { useState } from "react";
import { Checkbox, Button } from "flowbite-react";
import SelectProperty from "@/components/SelectProperty";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import clientApi from "@/libs/clientApi";

export default function UpdateProperties({ user }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const [data, setData] = useState({
    properties: user?.properties || [],
  });

  const handleCheck = (e) => {
    const { id } = e.target;
    setData((prevData) => ({
      ...prevData,
      properties: prevData.properties.filter((property) => property._id !== id),
    }));
  };
  const handleUpdate = async () => {
    setIsProcessing(true);
    try {
      const properties = data.properties.map((property) => property._id);
      const res = await clientApi.put(`/user/update/properties/${user.userId}`, {
        properties,
      });
      showToast(res.data.message, "success");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };
  return (
    <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
      <p className=" font-semibold">Properties</p>
      <div className="mt-2 grid grid-cols-10 p-4 text-xs font-semibold uppercase bg-gray-50 rounded-t-xl">
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
      <div className="mt-4 flex items-center justify-between">
        <SelectProperty data={data} setData={setData} />
        <Button isProcessing={isProcessing} onClick={handleUpdate}>
          Save
        </Button>
      </div>
    </div>
  );
}
