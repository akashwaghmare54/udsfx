"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
     initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 viewport={{ once: true }}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    />
  );
}