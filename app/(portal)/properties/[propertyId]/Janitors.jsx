"use client";
import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Janitors() {
  const router = useRouter();
  const { property } = useAppSelector((state) => state.property);

  return (
    <>
      <div className="bg-light dark:bg-dark p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold capitalize">Janitors</p>
          <Button size={"sm"} onClick={() => router.push("/janitors")}>
            Manage
          </Button>
        </div>
        {property &&
          property.janitors.map((janitor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-full bg-gray-50 dark:bg-gray-700 flex justify-between items-center gap-4 p-2 rounded-lg">
                <p>{janitor.name}</p>
                <div className="text-end text-sm">
                  <p>{janitor.email}</p>
                  <p>{janitor.contactNumber}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
