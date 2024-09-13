"use client";
import { Button } from "flowbite-react";
import React from "react";

export default function CancelSubscription() {
  return (
    <div className="flex justify-end">
      <Button size="xs" outline>
        Cancel Subscription
      </Button>
    </div>
  );
}
