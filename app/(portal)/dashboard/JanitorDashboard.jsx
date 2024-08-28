"use client";

import React, { useEffect, useState } from "react";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import clientApi from "@/libs/clientApi";
import HeaderCards from "./HeaderCards";
import BuildingCondition from "./BuildingCondition";
import RecentMessage from "./RecentMessage";

export default function JanitorDashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await clientApi
          .get("/messages/recent-messages")
          .then((res) => setMessages(res.data.messages))
          .catch((e) => {});

        await clientApi
          .get("/dashboard")
          .then((res) => setDashboardData(res.data))
          .catch((e) => {});

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <BodySkeleton />;
  return (
    <div>
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="mt-3 block lg:flex w-full gap-3">
        <div className="flex flex-col w-full">
          <HeaderCards dashboardData={dashboardData} />
          <div className="mt-3 w-full h-full bg-white border rounded-xl p-4">{/* Components  */}</div>
        </div>
        <div className="w-full lg:max-w-xs space-y-3">
          <BuildingCondition dashboardData={dashboardData} />
          <RecentMessage messages={messages} />
        </div>
      </div>
    </div>
  );
}
