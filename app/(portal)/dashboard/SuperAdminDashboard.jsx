"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiUsersThree, PiUsersThreeDuotone } from "react-icons/pi";
import { CiMoneyCheck1, CiCreditCard2 } from "react-icons/ci";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import { SubscriptionChart } from "./SubscriptionChart";
import RecentMessage from "./RecentMessage";

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setLoading(true);
        await clientApi
          .get("/support/tickets-open")
          .then((res) => setTickets(res.data.tickets))
          .catch((e) => {});
        await clientApi
          .get("/dashboard/super-admin")
          .then((res) => setData(res.data))
          .catch((e) => {});
        await clientApi
          .get("/messages/recent-messages")
          .then((res) => setMessages(res.data.messages))
          .catch((e) => {});
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  if (loading) return <BodySkeleton />;

  return (
    <div>
      <p className="text-xl font-semibold">Dashboard</p>
      <div className="mt-3 block lg:flex w-full gap-3">
        <div className="flex flex-col w-full">
          <div className="block space-y-3 lg:flex lg:space-y-0 items-center gap-3">
            <div className="w-full boxshadow-sm bg-light dark:bg-dark rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Subscribed Clients</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">{data?.subscribedClients}</p>
                <PiUsersThreeDuotone size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-red-400">-0.05%</span> <span>Since last month</span> */}</div>
            </div>
            <div className="w-full boxshadow-sm bg-light dark:bg-dark rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Total Clients</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">{data?.totalClients}</p>
                <PiUsersThree size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-red-400">-0.05%</span> <span>Since last month</span> */}</div>
            </div>

            <div className="w-full boxshadow-sm bg-light dark:bg-dark rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Sales This Month</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">$ {data.thisMonthBillAmount}</p>
                <CiCreditCard2 size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-green-400">+0.05%</span> <span>Since last month</span> */}</div>
            </div>

            <div className="w-full boxshadow-sm bg-light dark:bg-dark rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Total Sales</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">$ {data?.totalBillAmount}</p>
                <CiMoneyCheck1 size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-green-400">+0.05%</span> <span>Since last month</span> */}</div>
            </div>
          </div>
          <div className="mt-3 w-full h-full bg-light dark:bg-dark border rounded-xl p-4">
            <SubscriptionChart subscribedVsTotalClient={data?.subscribedVsTotalClient} />
          </div>
        </div>
        <div className="w-full lg:max-w-xs space-y-3">
          <div className="border rounded-lg p-4 bg-light dark:bg-dark text-sm space-y-2">
            <p className="font-semibold text-lg">Open Tickets</p>
            <div className="space-y-1 divide-y">
              {tickets.map((ticket, i) => (
                <button key={i} className="flex w-full gap-2 hover:bg-gray-100 rounded-md px-2 text-start">
                  <div className="w-full">
                    <p className="w-full whitespace-nowrap truncate font-semibold">{ticket.title}</p>
                    {/* <p className="w-full whitespace-nowrap truncate text-sm text-gray-400">{ticket.description}</p> */}
                    <p className=" text-xs">{ticket.client?.companyName}</p>
                    <p className="text-xs text-gray-500">{moment(ticket.createdAt).format("MMM DD YYYY h:mm a")}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-1">
              <button
                onClick={() => router.push("/tickets")}
                className="w-full border rounded-full hover:bg-primary-500 hover:text-white p-2 duration-300"
              >
                View All Tickets
              </button>
            </div>
          </div>
          <RecentMessage messages={messages} />
        </div>
      </div>
    </div>
  );
}
