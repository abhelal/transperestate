"use client";

import React, { useState } from "react";
import { Button, Badge } from "flowbite-react";
import { useAppDispatch } from "@/libs/hooks";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import { useAppSelector } from "@/libs/hooks";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";

export default function Amenities() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { property } = useAppSelector((state) => state.property);
  const [editAmenities, setEditamenities] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      setAmenities([...amenities, input]);
      setInput("");
    }
  };

  const handleRemove = (index) => {
    setAmenities(amenities.filter((ame, i) => i !== index));
  };

  const saveAmenities = async () => {
    try {
      setIsProcessing(true);
      const res = await clientApi.put(`/properties/${property.propertyId}/amenities`, {
        amenities,
      });
      showToast(res.data.message, "success");
      dispatch(fetchProperty(property.propertyId));
      setEditamenities(false);
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };
  return (
    <div className="bg-white p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold capitalize">Amenities</p>
        {!editAmenities && (
          <button
            outline
            onClick={() => {
              setEditamenities(true);
              setAmenities(property.amenities);
            }}
          >
            <HiOutlinePencilSquare className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="my-2 flex items-center gap-2 text-secondary-500 text-sm">
        {editAmenities ? (
          <div className="w-full space-y-3">
            <div className="flex w-full border-gray-300 rounded-md border flex-wrap gap-2 p-1">
              {amenities.map((ame, index) => (
                <Badge key={index} color="gray" rounded className="p-2">
                  {ame}{" "}
                  <button onClick={() => handleRemove(index)}>
                    <span className="text-red-500">x</span>
                  </button>
                </Badge>
              ))}
              <input
                type="text"
                value={input}
                className="focus:outline-none focus:ring-0 border-none text-xs"
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
            </div>

            <div className="flex justify-between">
              <Button outline onClick={() => setEditamenities()}>
                Cancel
              </Button>
              <Button isProcessing={isProcessing} onClick={saveAmenities}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            {property.amenities.map((amenity, index) => (
              <Badge key={index} color="gray" rounded>
                {amenity}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
