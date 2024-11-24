import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default async function PricingPlan({ plans }) {
  return (
    <div className="w-full flex flex-col items-center py-16">
      <p>PRICING</p>
      <p className="text-2xl font-semibold">Simple Transparent Pricing</p>
      <div className="w-full max-w-3xl px-4 md:px-0">
        <div className="relative mt-20 flex flex-col md:flex-row border rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          {plans.map((plan, index) => (
            <div key={index} className="relative flex flex-col w-full md:w-1/3 h-72 rounded-lg p-4">
              <div
                className={`w-full flex flex-col ${
                  plan.isPopular
                    ? "h-[340px] absolute bg-gradient-to-b from-slate-400 to-gray-50 rounded-xl -top-[54px] p-4 right-1"
                    : "h-72"
                }`}
              >
                {plan.isPopular && (
                  <div className="flex flex-col items-end justify-center h-[52px]">
                    <p className="text-sm rounded-full px-4 p-0.5 bg-slate-500 text-white">Most popular</p>
                  </div>
                )}
                <p className="text-2xl font-bold">${plan.price} /mo</p>
                <h2 className="text-lg font-bold">{plan.name}</h2>
                <p className="text-sm text-gray-500">{plan.duration} month</p>
                <div>
                  {plan.features.map((feature, ind) => (
                    <div key={ind} className="flex justify-start items-center mt-2">
                      <IoIosCheckmarkCircleOutline />
                      <p className="text-sm ml-2">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="grow"></div>
                <a
                  href={`/checkout/${plan.planId}`}
                  className="border border-primary-500 hover:bg-primary-500 hover:text-white rounded-full p-1.5 text-center"
                >
                  Choose Plan
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
