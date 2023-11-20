"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import PersonalInformation from "./PersonalInformation";
import HomeDetails from "./HomeDetails";
import UploadDocumentForm from "./Documents";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [categories] = useState({
    Information: {
      name: "Tenants Information",
      icon: <LiaUserCircleSolid />,
      component: <PersonalInformation />,
    },
    HomeDetails: {
      name: "Home Details",
      icon: <GoHome />,
      component: <HomeDetails />,
    },

    Documents: {
      name: "Documents",
      icon: <IoDocumentTextOutline />,
      component: <UploadDocumentForm />,
    },
  });

  return (
    <div className="w-full p-4 bg-white rounded-lg">
      <p className="text-xl font-semibold pb-4">Add Tenants</p>
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b">
          {Object.values(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "rounded-t-lg p-2.5 text-sm font-medium leading-5",
                  "focus:outline-none ",
                  selected
                    ? "bg-gray-100 text-primary-600"
                    : "hover:bg-white/[0.12] hover:text-primary-600"
                )
              }
            >
              <div className="flex items-center gap-3">
                {category.icon}
                <p> {category.name}</p>
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx}>{posts.component}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
