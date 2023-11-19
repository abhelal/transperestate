"use client";
import React, { useState } from "react";
import { Datepicker } from "flowbite-react";
import { Button, Toast } from "flowbite-react";
import { MdLoop } from "react-icons/md";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 11, 28));

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  return (
    <div>
      <Datepicker
        defaultDate={selectedDate}
        onSelectedDateChanged={handleDateChange}
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2023, 12, 30)}
      />
      <p>{selectedDate.getDate()}</p>

      <Toast>
        <div className="flex items-start">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300">
            <MdLoop className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Update available
            </span>
            <div className="mb-2 text-sm font-normal">
              A new software version is available for download.
            </div>
            <div className="flex-start flex gap-2">
              <div className="w-auto">
                <Button size="xs">Update</Button>
              </div>
              <div className="w-auto">
                <Button color="light" size="xs">
                  Not now
                </Button>
              </div>
            </div>
          </div>
          <Toast.Toggle />
        </div>
      </Toast>
    </div>
  );
}
