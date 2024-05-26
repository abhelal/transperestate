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
      <div className="bg-white p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold capitalize">Janitors</p>
          <Button size={"sm"} onClick={() => router.push("/janitors")}>
            Manage
          </Button>
        </div>
        {property &&
          property.janitors.map((maintainer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="">{maintainer.name}</p>
                <p>{maintainer.email}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
