import React from "react";
import Membership from "./MemberShip";
import Stats from "./Stats";
import Banner from "./Banner";

export default async function HomePage() {
  return (
    <div>
      <Banner />
      <Stats />
      <Membership />
    </div>
  );
}
