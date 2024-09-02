import React from "react";
import AddNewPlan from "./AddNew";

export default function SubscriptionPlan() {
  return (
    <div className="grow flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Subscription Plan</p>
        <AddNewPlan />
      </div>
      <div className="mt-2 bg-white grow p-4 rounded-lg">SubscriptionPlan</div>
    </div>
  );
}
