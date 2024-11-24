import React from "react";
import Pagination from "@/components/ui/pagination";
import serverApi from "@/libs/serverApi";
import UpdateStatus from "./UpdateStatus";
import ServerError from "@/components/ServerError";

export default async function BillsPage() {
  let errorMessages = null;
  let bills = [];

  const res = await serverApi.get("/bills/all").catch((error) => {
    errorMessages = error?.response?.data?.message;
  });

  if (res) bills = res?.data?.bills;

  if (errorMessages) return <ServerError message={errorMessages} />;

  return (
    <>
      <div className="text-xl font-semibold">
        <p>Bills</p>
      </div>

      <div className="mt-2 flex flex-col bg-light dark:bg-dark grow rounded-lg boxshadow-sm overflow-hidden">
        <div className="hidden xl:grid grid-cols-12 gap-2 bg-gray-50 dark:bg-gray-700 dark:bg-gray-700 border-b rounded-t-lg p-4 font-semibold text-sm">
          <span className="col-span-1">No</span>
          <span className="col-span-2">Month</span>
          <span className="col-span-2">Apartment</span>
          <span className="col-span-4">Description</span>
          <span className="col-span-1">Amount</span>
          <span className="col-span-1">Status</span>
        </div>
        <div className="h-0 flex flex-col grow overflow-y-auto divide-y text-sm">
          {bills.map((bill, index) => (
            <div key={index} className="xl:grid grid-cols-12 gap-2 p-2 px-4 items-center">
              <div className="col-span-1 flex justify-between">
                <p>{bill.billId}</p>
                <div className="relative flex xl:hidden w-20 justify-end">
                  <UpdateStatus billId={bill.billId} status={bill.status} />
                </div>
              </div>
              <div className="col-span-2">
                {bill.month}, {bill.year}
              </div>
              <div className="col-span-2">
                {bill.apartment.floor}-{bill.apartment.door}, {bill.property.name}
              </div>
              <div className="col-span-4 text-wrap">{bill.description}</div>
              <div className="col-span-1">
                {`$`}
                {bill.amount}
              </div>
              <div className="col-span-1">
                {bill.status === "paid" ? <div className="text-green-500">Paid</div> : <div className="text-red-500">Unpaid</div>}
              </div>
              <div className="relative col-span-1 hidden xl:flex justify-end items-center gap-2 whitespace-nowrap">
                <UpdateStatus billId={bill.billId} status={bill.status} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center p-2 border-t">
          <Pagination totalPages={3} />
        </div>
      </div>
    </>
  );
}
