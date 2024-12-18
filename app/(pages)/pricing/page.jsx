import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

import serverApi from "@/libs/serverApi";
import PricingPlan from "@/components/PricingPlan";

export default async function Pricing() {
  const res = await serverApi.get("/subscription/plans");
  const plans = res.data.plans;

  const lowRatePlan = plans.reduce((prev, current) => (prev.price < current.price ? prev : current));

  const features = [
    "Unlimited number of users with role-based access control",
    "Management of unlimited properties and units",
    "Full tenant profiles with comprehensive data fields",
    "Tenant communication and notification tools",
    "Automated lease renewal reminders",
    "Submission and tracking of maintenance requests",
    "Photo and video upload for maintenance requests",
    "Scheduling and assigning tasks to maintenance personnel",
    "Rent collection and tracking (online payment options)",
    "Financial reports and analytics",
    "Automated late fee calculation and reminders",
    "Secure storage for leases, agreements, receipts, and other documents",
    "Unlimited document storage",
    "Easy sharing and access for authorized users",
    "In-app messaging and email notifications",
    "Automated workflows for tenant communication",
    "Announcements and updates for tenants",
    "Push notifications",
    "Access to help center and live chat",
    "Professional services for training and onboarding",
  ];

  return (
    <div className="flex flex-col items-center">
      <PricingPlan plans={plans} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Everything you need to manage your properties efficiently.</p>
          </div>
          <div className="mt-10">
            <div className="relative max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
              <div className="flex-1 bg-light dark:bg-dark px-6 py-8 lg:p-12">
                <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Features</h3>
                <p className="mt-6 text-base text-gray-500">Our comprehensive plan includes the following features</p>
                <div className="mt-8 space-y-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <IoIosCheckmark />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-8 px-6 bg-gray-50 dark:bg-gray-700 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center">
                <div className="text-center">
                  <p className="text-lg leading-6 font-medium text-gray-900">Starting at</p>
                  <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                    ${lowRatePlan.price}
                    <span className="ml-3 text-xl font-medium text-gray-500">/month</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Get started
                    </a>
                  </div>
                </div>
                <div className="mt-4 text-sm text-center text-gray-500">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Learn more about our features
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
