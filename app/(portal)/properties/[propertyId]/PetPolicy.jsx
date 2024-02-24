import React from "react";
import { ToggleSwitch } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import clientApi from "@/libs/clientApi";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import { useToast } from "@/context/ToastContext";

export default function PetPolicy() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { property } = useAppSelector((state) => state.property);

  const handleChange = async () => {
    try {
      await clientApi.put(`/properties/${property.propertyId}/allowpets`);
      dispatch(fetchProperty(property.propertyId));
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold capitalize">Allow Pets</p>
        <ToggleSwitch checked={property.allowPets} onChange={handleChange} />
      </div>
    </div>
  );
}
