"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { PiBellSimpleThin } from "react-icons/pi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { GoRead } from "react-icons/go";
import { Tooltip } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import clientApi from "@/libs/clientApi";
import socket from "@/libs/socket";
import { throttle } from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const notificationBoxRef = useRef(null);
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [countUnread, setCountUnread] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToast();

  // Handle click outside the notification panel to close it
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

  // Fetch notifications whenever the page changes
  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  // Fetch notifications from the server
  const fetchNotifications = async (page) => {
    try {
      const response = await clientApi.get(`/notification?page=${page}&limit=5`);
      const data = response.data;
      setNotifications((prev) => [...prev, ...data.notifications]);
      setCountUnread(data.unread);
      setHasMore(data.notifications.length > 0); // Update hasMore based on the response
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      if (notificationBoxRef.current && hasMore) {
        const { scrollTop, scrollHeight, clientHeight } = notificationBoxRef.current;
        const threshold = 0.8; // 80% threshold
        if (scrollTop + clientHeight >= scrollHeight * threshold) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 200), // Throttle the scroll event to run once every 200ms
    [hasMore]
  );

  useEffect(() => {
    const notificationBox = notificationBoxRef.current;
    if (notificationBox) {
      notificationBox.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (notificationBox) {
        notificationBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, [showNotification, handleScroll]);

  useEffect(() => {
    const handleNewNotification = (notification) => {
      showToast(notification.message, "info", "TR");
      setNotifications((prev) => [notification, ...prev]);
      setCountUnread((prev) => prev + 1);
    };
    socket.on("newNotification", handleNewNotification);
    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, []);

  const markAsRead = async (notificationId) => {
    await clientApi.put(`/notification/${notificationId}/read`);
    setCountUnread((prev) => prev - 1);
    setNotifications((prev) =>
      prev.map((notification) => (notification.notificationId === notificationId ? { ...notification, status: "read" } : notification))
    );
  };

  const markAsUnread = async (notificationId) => {
    await clientApi.put(`/notification/${notificationId}/unread`);
    setCountUnread((prev) => prev + 1);
    setNotifications((prev) =>
      prev.map((notification) => (notification.notificationId === notificationId ? { ...notification, status: "unread" } : notification))
    );
  };

  const viewEvent = async (notification) => {
    if (notification.status === "unread") {
      await markAsRead(notification.notificationId);
    }
    setShowNotification(false);
    router.push(notification.href);
  };

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
              <div className="divide-y" ref={notificationBoxRef} style={{ maxHeight: "300px", overflowY: "auto" }}>
                {notifications.map((notification, index) => (
                  <div key={index} className="relative w-full">
                    <button
                      onClick={() => viewEvent(notification)}
                      key={index}
                      className={`w-full h-20 flex items-center gap-3 text-start p-3 hover:bg-gray-100 duration-300 ${
                        notification.status === "read" ? "bg-white" : "bg-green-50"
                      }`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full shrink-0">
                        <PiBellSimpleThin className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-wrap truncate">{notification.message}</p>
                        <div className="text-xs text-secondary-400 text-start">
                          {moment(notification.createdAt).calendar(null, {
                            sameDay: "[Today] LT",
                            lastDay: "[Yesterday] LT",
                            lastWeek: "DD MMM YYYY LT",
                            sameElse: "DD MMM YYYY LT",
                          })}
                        </div>
                      </div>
                    </button>
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
