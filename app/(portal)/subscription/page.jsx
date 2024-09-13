import React from "react";
import ActivePlanWithCode from "./ActiveWithCode";
import serverApi from "@/libs/serverApi";
import moment from "moment";
import CancelSubscription from "./CancelSubscription";

export default async function Subscription() {
  const subres = await serverApi.get("/subscription/my-subscription");
  const subscription = subres.data?.subscription;

  const subbillres = await serverApi.get("/subscription/my-bill");
  const subscriptionbills = subbillres.data?.bills || [];

  return (
    <div className="w-full grow flex flex-col rounded-lg">
      <div className="text-lg font-semibold">Subscription</div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 bg-white rounded-md p-4">
          {subscription ? (
            <div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">{subscription.subscriptionPlan}</p>
                <p className="text-sm">$ {subscription.price} / Month</p>
              </div>
              <p className="text-sm">{subscription.description}</p>
              <p>
                <span className="text-sm">Subscribed until {moment(subscription.subscriptionValidUntil).format("ll")}</span>
              </p>
              <CancelSubscription />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">No subscription</div>
          )}
        </div>

        <div className="col-span-5">
          <ActivePlanWithCode />
        </div>
      </div>

      <div className="flex flex-col h-full w-full">
        <div className="font-semibold py-3">
          <p>Subscription Bills</p>
        </div>

        {subscriptionbills.length === 0 && (
          <div className="bg-white rounded-md flex-grow flex justify-center items-center text-sm text-gray-500">No bills</div>
        )}
        {subscriptionbills.length > 0 && (
          <div className="h-full w-full flex flex-col rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 bg-gray-50 border-b p-4 font-semibold text-sm">
              <span className="col-span-2">No</span>
              <span className="col-span-4">Description</span>
              <span className="col-span-1">Amount</span>
              <span className="col-span-2">Date</span>
              <span className="col-span-2">Status</span>
            </div>
            <div className="h-0 flex flex-col grow overflow-y-auto text-sm bg-white">
              {subscriptionbills.map((bill, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 p-2 px-4 items-center border-b">
                  <span className="col-span-2">{bill.billId}</span>
                  <span className="col-span-4">{bill.description}</span>
                  <span className="col-span-1">
                    {`$`}
                    {bill.amount}
                  </span>
                  <span className="col-span-2">{moment(bill.createdAt).format("ll")}</span>
                  <span className="col-span-2">
                    {bill.status === "paid" ? <span className="text-green-500">Paid</span> : <span className="text-red-500">Unpaid</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
