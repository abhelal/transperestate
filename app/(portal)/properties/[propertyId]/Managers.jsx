"use client";
import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Managers() {
  const router = useRouter();
  const { property } = useAppSelector((state) => state.property);

  return (
    <>
      <div className="bg-white p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold capitalize">Managers</p>
          <Button size={"sm"} onClick={() => router.push("/managers")}>
            Manage
          </Button>
        </div>
        {property &&
          property.managers.map((manager, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="">{manager.name}</p>
                <p>{manager.email}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
