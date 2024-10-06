"use client";

import React, { useState } from "react";
import moment from "moment";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function Calendar({ selectedDate = moment(), setSelectedDate, minDate, maxDate, notifications = [] }) {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handleDateClick = (date) => {
    setCurrentMonth(date.clone());
    setSelectedDate(date.clone());
  };

  const adjustStartAndEndDays = (startDay, endDay) => {
    if (startDay.date() === 1) {
      startDay.subtract(1, "week");
    }

    if (endDay.date() < 29 && endDay.date() > 21) {
      endDay.add(1, "week");
      startDay.subtract(1, "week");
    }

    if (endDay.date() > 28) {
      endDay.add(1, "week");
    }
  };

  const isDayOutOfRange = (day) => {
    return (minDate && day.isBefore(minDate, "day")) || (maxDate && day.isAfter(maxDate, "day"));
  };

  const dayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let startDay = currentMonth.clone().startOf("month").startOf("week");
  let endDay = currentMonth.clone().endOf("month").startOf("week");

  adjustStartAndEndDays(startDay, endDay);

  const calendar = [];
  let day = startDay.clone();

  while (day.isBefore(endDay)) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return (
    <div className="rounded-lg boxshadow-sm bg-white p-4">
      <div className="flex justify-between p-2">
        <p className="mt-2 font-semibold">{currentMonth.format("MMMM YYYY")}</p>
        <div className="flex gap-3 items-center">
          <button onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, "month"))}>
            <HiChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setCurrentMonth(currentMonth.clone().add(1, "month"))}>
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div>
        <div className="flex w-full justify-evenly pb-2 text-xs font-semibold">
          {dayName.map((d, i) => (
            <div key={i} className="flex justify-center items-center w-8 h-6">
              {d}
            </div>
          ))}
        </div>
        {calendar?.map((week, index) => (
          <div key={index} className="flex w-full justify-evenly py-0.5 text-xs">
            {week.map((day, i) => (
              <div key={i} className={`w-8 h-8 text-center ${currentMonth.isSame(day, "month") ? "" : "text-gray-400"}`}>
                <button
                  onClick={() => handleDateClick(day)}
                  className={`w-7 h-7 rounded-lg ${selectedDate.isSame(day, "day") ? "bg-primary-500 text-white" : ""} ${
                    isDayOutOfRange(day) ? "text-gray-200 cursor-not-allowed" : ""
                  }`}
                  disabled={isDayOutOfRange(day)}
                >
                  <div
                    className={
                      notifications.filter((noti) => moment(noti.date).isSame(day, "day")).length > 0
                        ? "bg-primary-500 rounded-lg text-white animate-bounce"
                        : ""
                    }
                  >
                    {day.format("D")}
                  </div>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
