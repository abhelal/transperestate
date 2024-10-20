import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi2";

export default async function RentalDetails({ params }) {
  const apartmentId = params.apartmentId || "";
  const res = await serverApi.get(`/tenants/myrental/${apartmentId}`).catch((e) => {});
  const rental = res?.data?.rental || {};

  return (
    <>
      <div className="text-xl font-semibold">
        <p>My Rental Details</p>
      </div>
      <div className="mt-2 grid grid-cols-12 gap-2">
        <div className="col-span-8 bg-white rounded-lg boxshadow-sm p-4">
          <div>
            <div className="">
              <p className="font-semibold">
                # {rental.floor}
                {`-`}
                {rental.door}
              </p>
              <p className="text-sm text-gray-500">{rental.property.name}</p>
            </div>
            <p className="text-sm">
              {rental.property.street}, {rental.property.buildingNo}, {rental.property.city}, {rental.property.country}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-12">
            <div className="col-span-2">
              <p className="">Property Type</p>
              <p className="">Size</p>
              <p className="">Rooms</p>
              <p className="">Lease Start Date</p>
              <p className="">Rent/Month</p>
              <p>Deposit</p>
              <p>Company Name</p>
            </div>
            <div className="col-span-10">
              <p>: {rental.property.propertyType}</p>
              <p>: {rental.size} sqm</p>
              <p>: {rental.rooms}</p>
              <p>: {moment(rental.leaseStartDate).format("LL")}</p>
              <p>: $ {rental.rent}</p>
              <p>: $ {rental.deposit}</p>
              <p>: {rental.client.companyName}</p>
            </div>
          </div>
          {JSON.stringify(rental, null, 2)}
        </div>
        <div className="col-span-4 space-y-2">
          <div className="flex flex-col bg-white rounded-lg boxshadow-sm p-4">
            <p className="font-semibold pb-4">Maintainers</p>
            {rental.property.maintainers.map((maintainer, index) => (
              <div key={index}>
                <p className="font-semibold">{maintainer.name}</p>
                <div className="flex items-center gap-1">
                  <HiOutlineMail className="inline-block" />
                  <p className="text-sm text-gray-500">{maintainer.email}</p>
                </div>

                <div className="flex items-center gap-1">
                  <HiOutlinePhone className="inline-block" />
                  <p className="text-sm text-gray-500">{maintainer.contactNumber}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col bg-white rounded-lg boxshadow-sm p-4">
            <div>gfdkjasgfj</div>
            <div>Send Message</div>
          </div>
        </div>
      </div>
    </>
  );
}
