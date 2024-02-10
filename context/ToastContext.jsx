"use client";
import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiCheck } from "react-icons/hi2";
import { HiExclamation, HiX } from "react-icons/hi";
import { RiMessage3Line } from "react-icons/ri";
import NewMessageToast from "@/components/Toast/NewMessageToast";
import SuccessToast from "@/components/Toast/SuccessToast";
import FailureToast from "@/components/Toast/FailureToast";
import InfoToast from "@/components/Toast/InfoToast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info", position = "TC") => {
    setToast({ message, type, position });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const ToastContainer = () => {
  const { toast, closeToast } = useToast();
  const toastStyle = toast && getStyle(toast.position);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={toastStyle}
        >
          <div className="flex shadow-md w-96 justify-between items-start rounded-lg bg-white">
            <div className="flex items-center">{getToast(toast)}</div>
            <button onClick={closeToast}>
              <HiXMark />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const getStyle = (position) => {
  switch (position) {
    case "BL":
      return {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
      };
    case "BR":
      return {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      };
    case "TL":
      return {
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 9999,
      };
    case "TR":
      return {
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
      };
    case "TC":
      return {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        top: "20px",
        zIndex: 9999,
      };

    default:
      return {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      };
  }
};

const getToast = (toast) => {
  switch (toast.type) {
    case "info":
      return (
        <>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
        </>
      );
    case "success":
      return (
        <>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
        </>
      );
    case "failure":
      return <FailureToast message={toast.message} />;
    case "newmessage":
      return <NewMessageToast message={toast.message} />;
    default:
      return <NewMessageToast message={toast.message} />;
  }
};
