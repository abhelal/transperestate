"use client";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import Apartment from "./Apartment";

export default function Apartments({ user }) {
  const [apartments, setApartments] = useState(user?.apartments || []);

  const addNewApartment = () => {
    setApartments([...apartments, {}]);
  };

  if (!apartments.length) {
    return (
      <div className="flex flex-col grow w-full h-full items-center justify-center">
        <div className="text-sm italic">No apartments found</div>
        <Button className="mt-4" onClick={addNewApartment}>
          Add Apartment
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        {apartments.map((apartment, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <Apartment apartment={apartment} userId={user.userId} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button size={"sm"} onClick={addNewApartment}>
          Add Apartment
        </Button>
      </div>
    </div>
  );
}
