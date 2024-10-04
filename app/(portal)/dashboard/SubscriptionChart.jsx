"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Client Registered and Subscribed",
    },
  },
};

export function SubscriptionChart({ subscribedVsTotalClient = [] }) {
  const data = {
    labels: subscribedVsTotalClient.map((month) => month.month),
    datasets: [
      {
        fill: true,
        label: "Registered",
        data: subscribedVsTotalClient.map((month) => month.total),
        borderColor: "rgb(8, 145, 178)",
        backgroundColor: "rgba(8, 145, 178, 0.25)",
        tension: 0.2,
      },

      {
        fill: false,
        label: "Subscribed",
        data: subscribedVsTotalClient.map((month) => month.subscribed),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.25)",
        tension: 0.4,
      },
    ],
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
