import React from "react";

import serverApi from "@/libs/serverApi";
import MyBreadcrumb from "./Breadcrumb";

import DeleteApartment from "./DeleteApartment";
import UpdateApartment from "./UpdateApartment";

export default async function Apartment({ params }) {
  const res = await serverApi
    .get(`/properties/${params.propertyId}/apartments/${params.apartmentId}`)
    .catch((err) => {});

  const apartment = res?.data?.apartment || {};

  return (
    <div>
      <MyBreadcrumb propertyId={params.propertyId} apartmentId={params.apartmentId} />
      <div className="bg-white rounded-lg p-4 boxshadow-sm lg:flex lg:divide-x">
        <div className="lg:w-1/2 pr-2">
          <div className="flex justify-between items-center">
            <p className="text-md underline">Apartment Information</p>
            <div className="flex gap-2">
              <DeleteApartment propertyId={params.propertyId} apartmentId={params.apartmentId} />
              <UpdateApartment
                propertyId={params.propertyId}
                apartmentId={params.apartmentId}
                apartment={apartment}
              />
            </div>
          </div>
          <div className="flex gap-2">
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
        </div>
        <div className="lg:w-1/2 lg:pl-3">
          <p className="text-md underline">Address</p>
          <div className="mt-2">
            <p>{apartment.property?.name}</p>
            <p>
              {apartment.property?.street}, {apartment.property?.buildingNo}
            </p>
            <p>
              {apartment.property?.zipCode}, {apartment.property?.city} ,
              {apartment.property?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
