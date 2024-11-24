import React from "react";

import serverApi from "@/libs/serverApi";
import MyBreadcrumb from "./Breadcrumb";
import DeleteApartment from "./DeleteApartment";
import UpdateApartment from "./UpdateApartment";
import Tenant from "./Tenant";

export default async function Apartment({ params }) {
  const res = await serverApi.get(`/properties/${params.propertyId}/apartments/${params.apartmentId}`).catch((err) => {});

  const apartment = res?.data?.apartment || {};

  return (
    <div>
      <MyBreadcrumb propertyId={params.propertyId} apartmentId={params.apartmentId} />
      <div className="bg-light dark:bg-dark rounded-lg p-4 boxshadow-sm">
        <div className="flex justify-between items-center">
          <p className="text-md underline">Information</p>

          <div className="flex gap-2">
            <DeleteApartment propertyId={params.propertyId} apartmentId={params.apartmentId} />
            <UpdateApartment propertyId={params.propertyId} apartmentId={params.apartmentId} apartment={apartment} />
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <p>Apartment : </p>
          <p className="uppercase">
            {apartment.floor}-{apartment.door}
          </p>
        </div>
        <div className="flex gap-2">
          <p>Size : </p>
          <p>{apartment.size} sqft</p>
        </div>
        <div className="flex gap-2">
          <p>Rooms : </p>
          <p>{apartment.rooms}</p>
        </div>

        <div className="mt-2 text-sm text-gray-400">
          <p>
            {apartment.property?.name},{apartment.property?.street}, {apartment.property?.buildingNo}
          </p>
          <p>
            {apartment.property?.zipCode}, {apartment.property?.city} ,{apartment.property?.country}
          </p>
        </div>
      </div>
      <Tenant apartment={apartment} />
    </div>
  );
}
