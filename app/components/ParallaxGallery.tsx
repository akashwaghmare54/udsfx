"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ParallaxGallery({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative w-full h-full"  // ✅ THIS IS CRITICAL
    >
      {children}
    </motion.div>
  )
}