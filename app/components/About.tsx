"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {

    const sectionRef = useRef<HTMLDivElement | null>(null)
    const stepsRef = useRef<Array<HTMLDivElement | null>>([])
    const linesRef = useRef<Array<SVGLineElement | null>>([])

    const [isMobile, setIsMobile] = useState(false)

    // ✅ Handle responsive detection properly
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // ✅ GSAP Animation
    useEffect(() => {
        const ctx = gsap.context(() => {

            const isMobileView = window.innerWidth < 1024

            // ✅ Kill all ScrollTriggers on mobile
            if (isMobileView) {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill())
                return
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: true,
                    pin: true,
                }
            })

            // Line setup
            linesRef.current.forEach((line) => {
                if (!line) return
                const length = line.getTotalLength()

                gsap.set(line, {
                    strokeDasharray: length,
                    strokeDashoffset: length
                })
            })

            // Steps animation
            stepsRef.current.forEach((step, i) => {

                if (!step || i === 0) return

                tl.fromTo(
                    step,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    },
                    i * 0.5
                )

                const line = linesRef.current[i - 1]

                if (line) {
                    tl.to(
                        line,
                        {
                            strokeDashoffset: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        },
                        i * 0.5
                    )
                }

            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const steps = [
        {
            title: "Contact Us",
            desc: "Tell us about your event and requirements."
        },
        {
            title: "Choose Decoration",
            desc: "Select the theme and decoration style you love."
        },
        {
            title: "We Setup",
            desc: "Our team prepares and installs everything perfectly."
        },
        {
            title: "Celebrate",
            desc: "Enjoy your special moment with your loved ones."
        }
    ]

    return (

        <section
            ref={sectionRef}
            className="
                relative 
                lg:min-h-screen 
                flex items-start lg:items-center
                py-16 sm:py-24 lg:py-32 
                px-4 sm:px-6 lg:px-12
            "
            id="about"
        >

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-4 sm:px-6 items-center">

                {/* LEFT COLUMN */}
                <div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#D4AF37] mb-6 leading-tight">
                        Creating Beautiful <br /> Celebrations
                    </h2>

                    <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                        Happy Moment Creator transforms ordinary spaces into
                        unforgettable celebration experiences. From elegant
                        balloon decorations to grand bride entries, we design
                        every setup with creativity and attention to detail.
                    </p>

                    <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                        Our goal is to make your special moments stress-free
                        and magical so you can focus on enjoying your
                        celebration.
                    </p>

                </div>

                {/* RIGHT COLUMN */}
                <div className="grid grid-cols-1 sm:grid-cols-[60px_1fr] gap-8 sm:gap-12 items-start">

                    {/* Heading */}
                    <div className="flex sm:flex-col items-center justify-center">

                        <h3
                            className="
                                text-xl sm:text-2xl lg:text-3xl
                                tracking-[0.3em] sm:tracking-[0.45em]
                                sm:-rotate-90
                                whitespace-nowrap
                                text-[#D4AF37]
                                font-semibold
                                text-center
                                lg:mt-12
                                drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]
                            "
                        >
                            HOW IT WORKS
                        </h3>

                    </div>

                    {/* Steps */}
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                        {/* SVG LINES */}
                        <svg
                            className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 400 220"
                        >

                            <line
                                ref={(el) => { linesRef.current[0] = el }}
                                x1="90" y1="50" x2="310" y2="50"
                                stroke="#D4AF37"
                                strokeWidth="2"
                            />

                            <line
                                ref={(el) => { linesRef.current[1] = el }}
                                x1="310" y1="50" x2="90" y2="170"
                                stroke="#D4AF37"
                                strokeWidth="2"
                            />

                            <line
                                ref={(el) => { linesRef.current[2] = el }}
                                x1="90" y1="170" x2="310" y2="170"
                                stroke="#D4AF37"
                                strokeWidth="2"
                            />

                        </svg>

                        {steps.map((step, i) => (

                            <div
                                key={i}
                                ref={(el) => { stepsRef.current[i] = el }}
                                className="
                                    p-4 sm:p-6
                                    rounded-2xl
                                    bg-white/5
                                    border border-white/10
                                    backdrop-blur-xl
                                    transition
                                    hover:bg-white/10
                                "
                                style={{
                                    opacity: isMobile ? 1 : (i === 0 ? 1 : 0),
                                    transform: isMobile ? "none" : undefined
                                }}
                            >

                                <div
                                    className="
                                        w-9 h-9 sm:w-10 sm:h-10 mb-3
                                        rounded-full
                                        bg-[#D4AF37]/10
                                        border border-[#D4AF37]/40
                                        flex items-center justify-center
                                        text-sm font-semibold
                                        text-[#D4AF37]
                                    "
                                >
                                    {i + 1}
                                </div>

                                <h4 className="text-base sm:text-lg font-semibold mb-1">
                                    {step.title}
                                </h4>

                                <p className="text-xs sm:text-sm text-white/70">
                                    {step.desc}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    )
}