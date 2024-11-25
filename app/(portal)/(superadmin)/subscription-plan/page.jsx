import React from "react";
import AddNewPlan from "./AddNewPlan";
import serverApi from "@/libs/serverApi";
import DeletePlan from "./DeletePlan";
import MakePopular from "./MakePopular";
import UpdatePlan from "./UpdatePlan";

export default async function SubscriptionPlan() {
  const res = await serverApi.get("/subscription/plan");
  const plans = res.data.plans;

  return (
    <div className="grow flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Subscription Plan</p>
        <AddNewPlan />
      </div>
      <div className="mt-2 bg-light dark:bg-dark flex flex-col h-full rounded-lg overflow-hidden">
        <div className="hidden xl:grid grid-cols-12 border-b bg-gray-200 rounded-t-lg">
          <div className="col-span-2 p-2">Name</div>
          <div className="col-span-1 p-2">Price</div>
          <div className="col-span-1 p-2">Duration</div>
          <div className="col-span-3 p-2">Description</div>
          <div className="col-span-3 p-2">Features</div>
          <div className="col-span-2 p-2">Status</div>
        </div>
        <div className="w-full h-0 grow overflow-y-auto">
          {plans.map((plan) => (
            <div key={plan.planId} className="xl:grid grid-cols-12 border-b">
              <div className="col-span-2 p-2">{plan.name}</div>
              <div className="col-span-1 p-2">$ {plan.price}/mo</div>
              <div className="col-span-1 p-2">{plan.duration} month</div>
              <div className="col-span-3 p-2">{plan.description}</div>
              <div className="col-span-3 p-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <div className="col-span-2 p-2 flex justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex">
                    <div>
                      {plan.status === "active" ? (
                        <p className="text-xs border rounded-full p-1 px-4">Active</p>
                      ) : (
                        <p className="text-xs border border-red-500 text-red-500 rounded-full p-1 px-4">Inactive</p>
                      )}
                    </div>
                  </div>
                  <div>
                    {plan.isPopular ? (
                      <button className="text-xs bg-red-500 text-white rounded-full p-1 px-4 cursor-not-allowed">Most Popular</button>
                    ) : (
                      <MakePopular id={plan.planId} />
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <UpdatePlan plan={plan} />
                  <DeletePlan id={plan.planId} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
