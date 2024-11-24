"use client";

import React, { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import moment from "moment";
import clientApi from "@/libs/clientApi";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import RecentMessage from "./RecentMessage";

export default function TenantDashboard() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [messages, setMessages] = useState([]);

  const getDashboardData = async () => {
    setLoading(true);

    await clientApi
      .get("/utility/weather")
      .then((res) => setWeather(res.data))
      .catch((e) => {});

    await clientApi
      .get("/messages/recent-messages")
      .then((res) => setMessages(res.data.messages))
      .catch((e) => {});

    await clientApi
      .get("/notice/list", { params: { page: 1 } })
      .then((res) => {
        setNotices(res.data.notices);
        setTotalPages(res.data.totalPages);
      })
      .catch((e) => {});
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const eventNotices = notices.filter((notice) => notice.dateEvent);
  const otherNotices = notices.filter((notice) => !notice.dateEvent);
  const dateEventNotices = notices.filter((notice) => notice.dateEvent && moment(notice.date).isSame(selectedDate, "day"));

  function NotificationList({ notices, totalPages }) {
    return (
      <>
        {notices.map((notice, index) => (
          <div key={index} className={`relative w-full rounded-lg boxshadow-sm p-4 ${notice.dateEvent ? "border border-primary-500" : ""}`}>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{notice.title}</p>
                {notice.dateEvent && <p className="text-xs font-semibold text-primary-500">{new Date(notice.date).toDateString()}</p>}
              </div>
              <div></div>
            </div>
            <p className="mt-4 text-sm">{notice.body}</p>
            <div className="flex items-center justify-between">
              <div className="mt-4 flex gap-2">
                {notice.properties.map((property, ind) => (
                  <span key={ind} className="text-xs p-0.5 px-2 border rounded-full">
                    {property.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <p>Published :</p>
                <p>{new Date(notice.createdAt).toDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (loading) return <BodySkeleton />;
  else
    return (
      <div className="flex flex-col grow">
        <p className="text-xl font-semibold">Dashboard</p>
        <div className="mt-3 grid grid-cols-12 w-full h-full gap-3">
          <div className="col-span-8 space-y-3 flex flex-col h-full">
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} notices={eventNotices} />
            <div className="h-0 grow overflow-y-auto">
              <div className="flex flex-col h-full rounded-lg bg-light dark:bg-dark pt-2">
                <div className="flex flex-col h-0 grow overflow-y-auto p-4 space-y-2">
                  <NotificationList notices={dateEventNotices} totalPages={totalPages} />
                  <NotificationList notices={otherNotices} totalPages={totalPages} />
                  {!dateEventNotices.length && !otherNotices.length && (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-secondary-400">No notices available</p>
                    </div>
                  )}
                </div>
                {/* <div className="border-t flex w-full justify-center p-2">
                  <Pagination totalPages={totalPages} />
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-span-4 space-y-3">
            {weather && (
              <div className="boxshadow-sm rounded-lg p-4 bg-light dark:bg-dark text-sm space-y-2">
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
            <RecentMessage messages={messages} />
          </div>
        </div>
      </div>
    );
}
