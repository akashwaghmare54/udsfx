"use client";

import { motion } from "framer-motion";

export default function GradientBlob() {
  return (
    <motion.div
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -50, 50, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-96 h-96 blur-3xl rounded-full"
    />
  );
}