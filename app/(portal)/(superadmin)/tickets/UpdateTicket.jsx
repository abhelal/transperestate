"use client";
import React from "react";
import { Dropdown } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi2";

export default function UpdateTicket({ ticket }) {
  const dropdownItems = [
    { label: "Open", value: "OPEN" },
    { label: "Pending", value: "PENDING" },
    { label: "Closed", value: "CLOSED" },
  ];

  const { showToast } = useToast();
  const router = useRouter();

  const handleChange = async (status) => {
    await clientApi
      .put(`/support/ticket/${ticket._id}`, { status })
      .then((response) => {
        showToast(response.data.message, "success");
        router.refresh();
      })
      .catch((error) => {
        showToast(error.response.data.message, "error");
      });
  };

  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <button
          className={`flex gap-1 items-center px-4 py-1 text-xs font-semibold rounded-full ${
            ticket.status === "OPEN"
              ? "bg-green-100 text-green-800"
              : ticket.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span>{ticket.status}</span>{" "}
          <span>
            <HiChevronDown />
          </span>
        </button>
      )}
    >
      {dropdownItems.map((item, i) => (
        <Dropdown.Item key={i} onClick={() => handleChange(item.value)}>
          {item.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
