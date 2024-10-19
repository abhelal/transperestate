import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";
import Link from "next/link";

export default async function MyRentals() {
  const res = await serverApi.get("/tenants/myrental").catch((e) => {
    console.log(e);
  });
  const rentals = res?.data?.rentals || [];
  return (
    <>
      <div className="text-xl font-semibold">
        <p>My Rentals</p>
      </div>
      <div className="mt-2 flex flex-col bg-white grow rounded-lg boxshadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 bg-gray-50 border-b rounded-t-lg p-4 font-semibold text-sm">
          <span className="col-span-3">Name</span>
          <span className="col-span-4">Address</span>
          <span className="col-span-2">Start Date</span>
          <span className="col-span-1">Rent/Month</span>
          <span className="col-span-2 text-end">Action</span>
        </div>
        <div className="h-0 flex flex-col grow overflow-y-auto divide-y text-sm">
          {rentals.map((rental, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 p-2 px-4 items-center">
              <span className="col-span-3">
                <p>
                  {rental.floor}
                  {`-`}
                  {rental.door}
                </p>
                <p>{rental.property.name}</p>
              </span>

              <span className="col-span-4">
                {rental.property.street}, {rental.property.buildingNo}, {rental.property.city}, {rental.property.country}
              </span>
              <span className="col-span-2">{moment(rental.leaseStartDate).format("LL")}</span>
              <span className="col-span-1"> $ {rental.rent}</span>
              <div className="col-span-2 flex justify-end items-center">
                <Link
                  href={`/myrentals/${rental.apartmentId}`}
                  className="text-primary-500 font-semibold text-sm border border-primary-500 rounded-md p-1 px-3 hover:bg-primary-500 hover:text-white duration-300"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
