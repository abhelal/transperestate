import React from "react";
import Banner from "./Banner";
import WhyTransparestate from "./WhyTransparestate";
import CallToAction from "./CallToAction";
import Screen from "./Screen";
import serverApi from "@/libs/serverApi";
import PricingPlan from "@/components/PricingPlan";

export default async function HomePage() {
  const res = await serverApi.get("/subscription/plans").catch((e) => {
    console.error(e);
  });

  const plans = res?.data?.plans || [];
  const lowRatePlan = plans.length > 0 ? plans.reduce((prev, current) => (prev.price < current.price ? prev : current)) : null;

  return (
    <div>
      <Banner />
      <WhyTransparestate lowRatePlan={lowRatePlan} />
      <Screen />
      <PricingPlan plans={plans} />
      <CallToAction />
    </div>
  );
}
