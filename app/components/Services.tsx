"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const services = [
    { title: "Balloon Decoration", image: "/services/balloon.webp" },
    { title: "Bride Entry", image: "/services/bride-entry.jpg" },
    { title: "Groom Entry", image: "/services/groom-entry.webp" },
    { title: "Birthday Setup", image: "/services/birthday.jpg" },
    { title: "Anniversary Decoration", image: "/services/anniversary.jpg" },
    { title: "Proposal Setup", image: "/services/proposal.jpg" },
    { title: "Baby Shower", image: "/services/baby-shower.webp" },
    { title: "Wedding Setup", image: "/services/wedding.webp" },
    { title: "Engagement Setup", image: "/services/engagement.webp" },
    { title: "Newborn Welcome", image: "/services/newborn.webp" },
]

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768
            if (isMobile) return

            const scrollWidth = scrollRef.current!.scrollWidth
            const viewport = window.innerWidth
            const scrollDistance = scrollWidth - viewport

            gsap.to(scrollRef.current, {
                x: -(scrollWidth - viewport + 40),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${scrollDistance + viewport / 2}`,
                    scrub: true,
                    pin: true,
                },
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="py-16 px-6 md:px-12"
            id="services"
        >
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-[#D4AF37] text-5xl md:text-6xl font-semibold">
                    Our Services
                </h2>
                <p className="text-neutral-400 mt-4">
                    Explore the experiences we craft for your special moments.
                </p>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto md:overflow-visible"
            >
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="min-w-[220px] h-[280px] rounded-2xl overflow-hidden 
                        bg-white/10 backdrop-blur-xl border border-white/10 
                        shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    >
                        {/* Image */}
                        <div className="w-full h-[80%] overflow-hidden">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                            />
                        </div>

                        {/* Title */}
                        <div className="h-[20%] flex items-center justify-center px-2">
                            <p className="text-white text-sm md:text-base text-center font-medium">
                                {service.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}