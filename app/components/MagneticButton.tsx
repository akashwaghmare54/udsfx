"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = `translate(0px,0px)`;
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="px-6 py-3 bg-[#D4AF37] text-black px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-[#b8962e] cursor-pointerbg-gradient-to-r from-[#D4AF37] to-[#f5d76e] text-black px-6 py-3 rounded-lg transition-all duration-300 hover:from-[#b8962e] hover:to-[#e6c65c] hover:scale-105 cursor-pointer"
    >
      {children}
    </motion.button>
  );
}