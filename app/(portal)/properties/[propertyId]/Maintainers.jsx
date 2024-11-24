"use client";
import React from "react";
import { useAppSelector } from "@/libs/hooks";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Maintainers() {
  const router = useRouter();
  const { property } = useAppSelector((state) => state.property);

  return (
    <>
      <div className="bg-light dark:bg-dark p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold capitalize">Maintainer</p>
          <Button size={"sm"} onClick={() => router.push("/maintainers")}>
            Manage
          </Button>
        </div>
        {property &&
          property.maintainers.map((maintainer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-full bg-gray-50 dark:bg-gray-700 flex justify-between items-center gap-4 p-2 rounded-lg">
                <p>{maintainer.name}</p>
                <div className="text-end text-sm">
                  <p>{maintainer.email}</p>
                  <p>{maintainer.contactNumber}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
