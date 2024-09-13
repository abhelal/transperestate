"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ErrorMessage({ message }) {
  return (
    <div className="h-6">
      {message && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <span className="text-xs italic text-red-500">{message}</span>
        </motion.div>
      )}
    </div>
  );
}
