"use client";
import React, { useEffect, useState } from "react";
import clientApi from "@/libs/clientApi";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import HeaderCards from "./HeaderCards";
import BuildingCondition from "./BuildingCondition";
import RecentMessage from "./RecentMessage";
import { MyChart } from "./AreaChart";

export default function ClientDashboard() {
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
          .get("/dashboard/client")
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
      <div className="mt-3 grid grid-cols-1 xl:grid-cols-3 xl:gap-3">
        <div className="xl:col-span-2 w-full pb-3">
          <HeaderCards dashboardData={dashboardData} />
          <div className="mt-3 w-full bg-light dark:bg-dark border rounded-xl p-4">
            <MyChart maintenanceRequestAndComplete={dashboardData.maintenanceRequestAndComplete} />
          </div>
        </div>
        <div className="xl:col-span-1 w-full space-y-3">
          <BuildingCondition dashboardData={dashboardData} />
          <RecentMessage messages={messages} />
        </div>
      </div>
    </div>
  );
}
