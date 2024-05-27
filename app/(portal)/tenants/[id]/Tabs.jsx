"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import TenantDetails from "./TenantDetails";
import Apartments from "./Apartments";
import UploadDocumentForm from "./Documents";
import Settings from "./Settings";
import { useAppDispatch } from "@/libs/hooks";
import { fetchProperties } from "@/libs/features/property/propertyActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TenantTabs({ user }) {
  const dispatch = useAppDispatch();

  let [categories] = useState({
    Information: {
      name: "Tenants Details",
      icon: <LiaUserCircleSolid />,
      component: <TenantDetails user={user} />,
    },
    Apartments: {
      name: "Apartments",
      icon: <GoHome />,
      component: <Apartments user={user} />,
    },

    Documents: {
      name: "Documents",
      icon: <IoDocumentTextOutline />,
      component: <UploadDocumentForm user={user} />,
    },
    Settings: {
      name: "Settings",
      icon: <IoSettingsOutline />,
      component: <Settings user={user} />,
    },
  });

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  return (
    <div className="mt-2 w-full h-full flex flex-col">
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b bg-white rounded-t-lg">
          {Object.values(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "rounded-t-lg p-2.5 text-sm font-medium leading-5",
                  "focus:outline-none ",
                  selected ? "text-primary-600" : "hover:bg-white/[0.12] hover:text-primary-600"
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
        <Tab.Panels className={"w-full grow"}>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className={"w-full h-full"}>
              {posts.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
