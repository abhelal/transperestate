import React from "react";
import { useRouter } from "next/navigation";

export default function BuildingCondition({ dashboardData }) {
  const router = useRouter();
  return (
    <div className="card p-3 space-y-2">
      <p className="font-semibold text-lg">Building Condition</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>Maintenance Pending</p>
          <p>
            {dashboardData.maintenancePending}/{dashboardData.totalMaintenances}
          </p>
        </div>
        <div className="relative w-full h-2 rounded-full bg-gray-300">
          <div style={{ width: `${dashboardData.pendingPercentage}%` }} className="h-2 rounded-full bg-primary-600"></div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>Maintenance In Progress</p>
          <p>
            {dashboardData.maintenanceInProgress}/{dashboardData.totalMaintenances}
          </p>
        </div>
        <div className="relative w-full h-2 rounded-full bg-gray-300">
          <div style={{ width: `${dashboardData.inProgressPercentage}%` }} className="h-2 rounded-full bg-primary-600"></div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>Maintenance Completed</p>
          <p>
            {dashboardData.maintenanceCompleted}/{dashboardData.totalMaintenances}
          </p>
        </div>
        <div className="relative w-full h-2 rounded-full bg-gray-300">
          <div style={{ width: `${dashboardData.completedPercentage}%` }} className="h-2 rounded-full bg-primary-600"></div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>Maintenance Cancelled</p>
          <p>
            {dashboardData.maintenanceCancelled}/{dashboardData.totalMaintenances}
          </p>
        </div>
        <div className="relative w-full h-2 rounded-full bg-gray-300">
          <div style={{ width: `${dashboardData.cancelledPercentage}%` }} className="h-2 rounded-full bg-primary-600"></div>
        </div>
      </div>
      <div className="pt-4">
        <button onClick={() => router.push("/maintenance")} className="w-full border rounded-full p-2">
          Maintenance Details
        </button>
      </div>
    </div>
  );
}
