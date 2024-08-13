import React from "react";
import Pagination from "@/components/ui/pagination";
export default function MyBills() {
  const bills = [
    {
      billId: "12345678",
      createdAt: "February,2024",
      description: "Monthly rent",
      amount: 2000,
      status: "unpaid",
    },
    {
      billId: "12345677",
      createdAt: "January,2024",
      description: "Monthly rent",
      amount: 3000,
      status: "paid",
    },

    {
      billId: "12345676",
      createdAt: "January,2024",
      description: "Security Deposite",
      amount: 6000,
      status: "paid",
    },
  ];
  return (
    <>
      <div className="text-xl font-semibold">
        <p>My Bills</p>
      </div>
      <div className="mt-2 flex flex-col bg-white grow rounded-lg boxshadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 bg-gray-50 border-b rounded-t-lg p-4 font-semibold text-sm">
          <span className="col-span-2">No</span>
          <span className="col-span-2">Month</span>
          <span className="col-span-5">Description</span>
          <span className="col-span-2">Amount</span>
          <span className="col-span-1">Status</span>
        </div>
        <div className="h-0 flex flex-col grow overflow-y-auto divide-y text-sm">
          {bills.map((bill, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 p-2 px-4 items-center">
              <span className="col-span-2">{bill.billId}</span>
              <span className="col-span-2">{bill.createdAt}</span>
              <span className="col-span-5">{bill.description}</span>
              <span className="col-span-2">
                {`$`}
                {bill.amount}
              </span>
              <span className="col-span-1">
                {bill.status === "paid" ? <span className="text-green-500">Paid</span> : <span className="text-red-500">Unpaid</span>}
              </span>
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
