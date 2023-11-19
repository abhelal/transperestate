"use client";

import React from "react";
import Image from "next/image";
import image404 from "../public/images/404.svg";
import { motion, AnimatePresence } from "framer-motion";

const Custom404 = () => {
  return (
    <div className="h-auto flex justify-center items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 20, y: -100 }}
          animate={{
            opacity: 1,
            y: [0, -50, 0, 50, 0], // Move up, then down, then up, then down
            x: [0, -50, 0, 50, 0], // Move left, then right, then left, then right
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Image className="max-w-5xl h-screen object-fill" src={image404} alt="404 not found" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Custom404;
