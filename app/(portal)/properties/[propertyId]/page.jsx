"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useAppDispatch } from "@/libs/hooks";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import { useAppSelector } from "@/libs/hooks";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import { propertyTypes } from "@/constants/propertyTypes";
import UpdateModal from "./updateModal";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Amenities from "./Amenities";
import Utilities from "./Utilities";
import PetPolicy from "./PetPolicy";
import Documents from "./Documents";
import Maintainer from "./Maintainers";
import Apartments from "./Apartments";

export default function PropertyDetails({ params }) {
  const propertyId = params.propertyId;
  const dispatch = useAppDispatch();
  const { property, loadingProperty } = useAppSelector((state) => state.property);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProperty(propertyId));
  }, [propertyId]);

  return (
    <div className="relative w-full h-full">
      {loadingProperty && <BodySkeleton />}
      <UpdateModal openModal={openModal} setOpenModal={setOpenModal} property={property} />
      {property && (
        <div className="w-full grid md:grid-cols-2 mx-auto gap-4">
          <div className="w-full space-y-4">
            <div className="bg-white p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold capitalize">
                  {property.name}{" "}
                  {`(${propertyTypes.find((p) => p.value === property.propertyType)?.label})`}
                </p>
                <div>
                  <button outline onClick={() => setOpenModal(true)}>
                    <HiOutlinePencilSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="my-2 flex items-center gap-2 text-secondary-500 text-sm">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary-500" />
                <p className="text-gray-600">{`${property.street} ${property.buildingNo}, ${property.zipCode} ${property.city}, ${property.country}`}</p>
              </div>
            </div>
            <Amenities />
            <PetPolicy />
            <Utilities />
            <Maintainer />
            <Documents />
          </div>
          <div className="w-full space-y-4">
            <Apartments />
          </div>
        </div>
      )}
    </div>
  );
}
