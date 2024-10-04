"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiUsersThree, PiUsersThreeDuotone } from "react-icons/pi";
import { CiMoneyCheck1, CiCreditCard2 } from "react-icons/ci";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import { SubscriptionChart } from "./SubscriptionChart";

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const messages = [1, 2, 3, 4];
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setLoading(true);
        await clientApi.get("/support/tickets-open").then((res) => setTickets(res.data.tickets));
        await clientApi.get("/dashboard/super-admin").then((res) => setData(res.data));
      } catch (error) {
        console.log(error);
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
            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Subscribed Clients</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">{data?.subscribedClients}</p>
                <PiUsersThreeDuotone size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-red-400">-0.05%</span> <span>Since last month</span> */}</div>
            </div>
            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Total Clients</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">{data?.totalClients}</p>
                <PiUsersThree size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-red-400">-0.05%</span> <span>Since last month</span> */}</div>
            </div>

            <div className="w-full boxshadow-sm bg-white rounded-lg">
              <div className="w-full border-b px-4 py-2">
                <p>Sales This Month</p>
              </div>
              <div className="flex w-full justify-between p-4">
                <p className="text-3xl font-semibold">$ {data.thisMonthBillAmount}</p>
                <CiCreditCard2 size={24} color="#3498db" />
              </div>
              <div className="px-4 pb-2 text-sm">{/* <span className="text-green-400">+0.05%</span> <span>Since last month</span> */}</div>
            </div>

            <div className="w-full boxshadow-sm bg-white rounded-lg">
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
          <div className="mt-3 w-full h-full bg-white border rounded-xl p-4">
            <SubscriptionChart subscribedVsTotalClient={data?.subscribedVsTotalClient} />
          </div>
        </div>
        <div className="w-full lg:max-w-xs space-y-3">
          <div className="border rounded-lg p-4 bg-white text-sm space-y-2">
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
          <div className="border rounded-lg p-4 bg-white text-sm space-y-2">
            <p className="font-semibold text-lg">New Messages</p>
            <div className="flex bg-gray-200 rounded-full">
              <button className="flex gap-2 items-center justify-center w-full bg-primary-500 rounded-full p-2 px-4 text-white">
                <p>Tenants</p>
                <div className="flex items-center justify-center rounded-full bg-primary-100 w-6 h-6 bg-opacity-50">5</div>
              </button>
              <button className="w-full ">Investors</button>
            </div>
            <div className="pt-2 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100"></div>
                  <div className="w-full">
                    <p className=" font-semibold">John Dan</p>
                    <p>Please repair my light box</p>
                  </div>
                  <div>12.30</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
