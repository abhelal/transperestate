"use client";

import React, { useEffect, useState, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { PiBellSimpleThin } from "react-icons/pi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { GoRead } from "react-icons/go";
import { Tooltip } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import clientApi from "@/libs/clientApi";
import Link from "next/link";
import socket from "@/libs/socket";

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await clientApi.get("/notification");
      setNotifications(res.data.notifications);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => {
        return [notification, ...prev];
      });
    });
  }, []);

  const markAsRead = async (notificationId) => {
    await clientApi.put(`/notification/${notificationId}/read`);
    const updatedNotifications = notifications.map((notification) => {
      if (notification.notificationId === notificationId) {
        return { ...notification, status: "read" };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  const markAsUnread = async (notificationId) => {
    await clientApi.put(`/notification/${notificationId}/unread`);
    const updatedNotifications = notifications.map((notification) => {
      if (notification.notificationId === notificationId) {
        return { ...notification, status: "unread" };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  const countUnread = notifications.filter((notification) => notification.status === "unread").length;

  return (
    <div ref={notificationRef}>
      <button onClick={() => setShowNotification(!showNotification)} className="relative flex w-10 h-10 items-center justify-center">
        {countUnread > 0 && <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
        <BellIcon className="w-6 h-6" />
      </button>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 right-4 top-20 shadow-md w-96 bg-white rounded-lg py-4"
          >
            <div>
              <div className="flex w-full items-center gap-2 px-4 border-b pb-3">
                <div>
                  <BellIcon className="w-6 h-6 mx-auto text-gray-500" />
                </div>
                <p className="text-md font-semibold">{`Notification (${countUnread})`}</p>
              </div>
              <div className="divide-y">
                {notifications.map((notification, index) => (
                  <div key={index} className="relative w-full">
                    <Link
                      href={notification.href}
                      key={index}
                      className={`w-full h-16 flex items-center gap-3 text-start p-3 hover:bg-gray-100 duration-300 ${
                        notification.status === "read" ? "bg-white" : "bg-green-50"
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full shrink-0">
                        <PiBellSimpleThin className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="text-sm text-wrap">{notification.message}</p>
                    </Link>
                    <div className="absolute top-3 right-3">
                      {notification.status === "unread" ? (
                        <Tooltip content="Mark as Read" placement="left">
                          <button
                            onClick={() => markAsRead(notification.notificationId)}
                            className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full"
                          >
                            <IoMailUnreadOutline className="w-4 h-4 text-green-500" />
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Mark as Unread" placement="left">
                          <button
                            onClick={() => markAsUnread(notification.notificationId)}
                            className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full"
                          >
                            <GoRead className="w-4 h-4 text-green-500" />
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && <p className="p-4">No notifications</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
