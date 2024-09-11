import React from "react";
import Membership from "./MemberShip";
import Stats from "./Stats";
import Banner from "./Banner";
import WhyTransparestate from "./WhyTransparestate";
import CallToAction from "./CallToAction";

export default async function HomePage() {
  return (
    <div>
      <Banner />
      <Stats />
      <WhyTransparestate />
      <Membership />
      <CallToAction />
    </div>
  );
}
