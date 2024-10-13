"use client";

import React, { useEffect, useState, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function Notification() {
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);

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

  return (
    <div ref={notificationRef}>
      <button onClick={() => setShowNotification(!showNotification)} className="relative flex w-10 h-10 items-center justify-center">
        <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        <BellIcon className="w-6 h-6" />
      </button>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 right-4 top-20 shadow-md w-80 bg-white rounded-lg p-4"
          >
            <div>
              <p className="text-lg font-bold">Notification</p>
              <p className="text-sm text-gray-500">You have no new notification</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
