"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [categories] = useState({
    "Personal Information": {
      name: "Personal Information",
      icon: <LiaUserCircleSolid />,
      component: "hkhaflaklsf",
    },
    "Home Details": {
      name: "Home Details",
      icon: <GoHome />,
      component: "hkhaflaklsf",
    },

    Documents: {
      name: "Documents",
      icon: <IoDocumentTextOutline />,
      component: "DOX",
    },
  });

  return (
    <div className="w-full px-2 p-4 bg-white rounded-lg">
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
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>{posts.icon}</ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
