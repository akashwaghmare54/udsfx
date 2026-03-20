"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CurvedServices from "./CurvedServices";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const services = [
  { title: "Bride Entry", image: "/services/bride-entry.jpg" },
  { title: "Balloon Decoration", image: "/services/balloon.webp" },
  { title: "Birthday Setup", image: "/services/birthday.jpg" },
  { title: "Groom Entry", image: "/services/groom-entry.webp" },
  { title: "Baby Shower", image: "/services/baby-shower.webp" },
  { title: "Anniversary Decoration", image: "/services/anniversary.jpg" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 1.05]);

  const heroRef = useRef(null);

  // ✅ Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ GSAP only for desktop
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "center center",
        end: `+=${services.length * 350}`,
        scrub: true,
        pin: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-12"
      style={{ perspective: "1800px" }}
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <motion.div style={{ scale }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-4 sm:mb-6 text-[#D4AF37]">
              Creating Happy Moments
            </h1>
          </motion.div>

          <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-6 sm:mb-10 max-w-md mx-auto lg:mx-0">
            Balloon Decoration • Bride & Groom Entry • Birthday Setup
          </p>

          <div
            className="flex justify-center lg:justify-start"
            onClick={() => {
              const contact = document.getElementById("contact");
              if (!contact) return;

              gsap.to(window, {
                scrollTo: {
                  y: contact,
                  offsetY: 20,
                },
                duration: 1.5,
                ease: "power3.out",
              });
            }}
          >
            <MagneticButton>Book Decoration</MagneticButton>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full flex items-center justify-center mt-6 lg:mt-0">
          <CurvedServices services={services} />
        </div>
      </div>
    </section>
  );
}