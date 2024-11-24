import React from "react";
import serverApi from "@/libs/serverApi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import BillingInformation from "./BillingInformation";

export default async function Checkout({ params }) {
  const planId = params?.planId;
  const res = await serverApi.get(`/subscription/plans/${planId}`).catch((err) => {});
  const plan = res?.data?.plan;

  if (!plan) return <div className="w-full h-full grow flex items-center justify-center">Sorry Plan not found</div>;

  return (
    <div className="p-6">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-4">Complete your payment</h1>
        <div className="mt-8 w-full max-w-5xl lg:grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="bg-light dark:bg-dark rounded-lg border p-6">
              <div className="">
                <p className="text-lg font-bold">{plan?.name}</p>
                <p className="text-sm text-gray-500">{plan?.description}</p>
                <p className="text-lg font-bold mt-2">${plan?.price} /mo</p>
                <p className="text-sm text-gray-500">{plan?.duration} month</p>
                <div>
                  {plan?.features.map((feature, index) => (
                    <div key={index} className="flex justify-start items-center mt-2">
                      <IoIosCheckmarkCircleOutline />
                      <p className="text-sm ml-2">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-8 space-y-4">
            <div className="bg-light dark:bg-dark rounded-lg border p-6">
              <h1 className="text-lg font-bold">Order Summary</h1>
              <div className="flex justify-between mt-4">
                <p>Subtotal</p>
                <p>${plan?.price}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Tax</p>
                <p>$0</p>
              </div>
              <div className="flex justify-between mt-2 border-t font-semibold">
                <p>Total</p>
                <p>${plan?.price}</p>
              </div>
            </div>
            <BillingInformation plan={plan} />
          </div>
        </div>
      </div>
    </div>
  );
}
