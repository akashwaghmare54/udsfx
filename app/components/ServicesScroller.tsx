"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

const services = [
    "Balloon Decoration",
    "Bride Entry",
    "Groom Entry",
    "Birthday Setup",
    "Anniversary Decoration",
    "Proposal Setup",
    "Baby Shower"
]

export default function ServicesScroller() {
    const containerRef = useRef<HTMLDivElement>(null)

    const handleWheel = (e: React.WheelEvent) => {
        const isMobile = window.innerWidth < 768

        // Disable on mobile
        if (isMobile) return

        if (containerRef.current) {
            e.preventDefault() // IMPORTANT
            containerRef.current.scrollLeft += e.deltaY
        }
    }

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel}
            className="flex gap-6 overflow-x-auto px-6 md:px-10 scrollbar-hide"
        >
            {services.map((service, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="min-w-[220px] h-[140px] glass rounded-2xl flex items-center justify-center text-base md:text-lg font-semibold"
                >
                    {service}
                </motion.div>
            ))}
        </div>
    )
}