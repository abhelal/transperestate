"use client";

import React, { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import moment from "moment";
import clientApi from "@/libs/clientApi";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import Pagination from "@/components/ui/pagination";

export default function TenantDashboard({ query }) {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [selectedDate, setSelectedDate] = useState(moment());
  const messages = [1, 2, 3, 4];

  const getDashboardData = async () => {
    setLoading(true);

    await clientApi
      .get("/utility/weather")
      .then((res) => setWeather(res.data))
      .catch((e) => {});
    await clientApi
      .get("/notification/list", { params: { page: 1 } })
      .then((res) => {
        setNotifications(res.data.notifications);
        setTotalPages(res.data.totalPages);
      })
      .catch((e) => {});
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) return <BodySkeleton />;
  else
    return (
      <div className="flex flex-col grow">
        {JSON.stringify(query)}
        <p className="text-xl font-semibold">Dashboard</p>
        <div className="mt-3 grid grid-cols-12 w-full h-full gap-3">
          <div className="col-span-8 space-y-3 flex flex-col h-full">
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <div className="h-0 grow overflow-y-auto">
              <div className="flex flex-col h-full rounded-lg bg-white pt-2">
                <div className="flex flex-col h-0 grow overflow-y-auto p-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="relative w-full rounded-lg boxshadow-sm p-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">{notification.title}</p>
                          <p className="text-xs">{new Date(notification.date).toDateString()}</p>
                        </div>
                        <div></div>
                      </div>
                      <p className="mt-4 text-sm">{notification.body}</p>
                      <div className="mt-4 flex gap-2">
                        {notification.properties.map((property) => (
                          <span className="text-xs p-0.5 px-2 border rounded-full">{property.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t flex w-full justify-center p-2">
                  <Pagination totalPages={totalPages} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 space-y-3">
            {weather && (
              <div className="boxshadow-sm rounded-lg p-4 bg-white text-sm space-y-2">
                <div className="flex items-center gap-10 shrink-0">
                  <div className="w-full">
                    <p className="whitespace-nowrap">
                      {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", day: "2-digit" })}
                    </p>
                    <p className="whitespace-nowrap">
                      {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                    </p>

                    <div className="pt-4">
                      <div className="flex items-center gap-3">
                        <p>Sunrise </p>
                        <p className="whitespace-nowrap">{moment(weather.sys.sunrise * 1000).format("hh:mm A")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p>Sunset </p>
                        <p className="whitespace-nowrap">{moment(weather.sys.sunset * 1000).format("hh:mm A")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-end">
                    <div className="flex gap-2 items-center shrink-0">
                      <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width={100} height={100} />
                      <div className="">
                        <div className="flex">
                          <p className="text-3xl font-semibold">{weather?.main.temp?.toFixed(1)}</p>
                          <p className="font-semibold">o</p>
                          <p className="text-3xl font-semibold">C</p>
                        </div>
                        <div>{weather.weather[0].description}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div>Humidity {weather.main.humidity.toFixed(0)} % </div>
                      <div>Wind {weather.wind.speed.toFixed(0)} km/h </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className=" boxshadow-sm rounded-lg p-4 bg-white text-sm space-y-2">
              <p className="font-semibold text-lg">New Messages</p>
              <div className="pt-2 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                      <Image src={"/images/photo1.png"} fill alt="" />
                    </div>
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
