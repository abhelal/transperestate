import React from "react";
import serverApi from "@/libs/serverApi";
import moment from "moment";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi2";
import SendMessage from "./SendMessage";

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
        <div className="col-span-8">
          <div className="bg-white rounded-lg boxshadow-sm p-4">
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
          </div>
        </div>
        <div className="col-span-4 space-y-2">
          <div className="flex flex-col bg-white rounded-lg boxshadow-sm p-4 space-y-3">
            <p className="font-semibold">Maintainers</p>
            {rental.property.maintainers.map((maintainer, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <p className="font-semibold">{maintainer.name}</p>
                  <SendMessage id={maintainer._id} />
                </div>
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
          <div className="flex flex-col bg-white rounded-lg boxshadow-sm p-4 space-y-3">
            <p className="font-semibold">Janitors</p>
            {rental.property.janitors.map((janitor, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <p className="font-semibold">{janitor.name}</p>
                  <SendMessage id={janitor._id} />
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineMail className="inline-block" />
                  <p className="text-sm text-gray-500">{janitor.email}</p>
                </div>

                <div className="flex items-center gap-1">
                  <HiOutlinePhone className="inline-block" />
                  <p className="text-sm text-gray-500">{janitor.contactNumber}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col bg-white rounded-lg boxshadow-sm p-4">
            <p className="font-semibold mb-3">Owner</p>
            <div className="flex justify-between">
              <p className="font-semibold">{rental.client.owner?.name}</p>
              <SendMessage id={rental.client.owner._id} />
            </div>

            <div className="flex items-center gap-1">
              <HiOutlineMail className="inline-block" />
              <p className="text-sm text-gray-500">{rental.client.owner?.email}</p>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlinePhone className="inline-block" />
              <p className="text-sm text-gray-500">{rental.client.owner?.contactNumber ?? "Not Available"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
