"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Service {
  title: string
  image: string
}

export default function CurvedServices({ services }: { services: Service[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const radius = 500

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  useEffect(() => {
    // ❌ Disable GSAP on mobile
    if (isMobile) return

    const ctx = gsap.context(() => {
      const totalCards = cardsRef.current.length
      if (!totalCards) return

      gsap.set(cardsRef.current, {
        x: 0,
        y: 0,
        scale: 0.8,
        opacity: 0,
        position: "absolute",
      })

      const visibleCards = 3
      const visibleRange = visibleCards / totalCards / 2

      const updateCards = (progress: number) => {
        const adjustedProgress = (progress + 0.2) % 1

        cardsRef.current.forEach((card, i) => {
          if (!card) return

          const cardTargetProgress = i / totalCards
          let diff = adjustedProgress - cardTargetProgress

          if (diff > 0.5) diff -= 1
          if (diff < -0.5) diff += 1

          if (Math.abs(diff) > visibleRange) {
            gsap.set(card, {
              opacity: 0,
              scale: 0.8,
            })
            return
          }

          const t = gsap.utils.mapRange(
            -visibleRange,
            visibleRange,
            -1,
            1,
            diff
          )

          const angle = t * (Math.PI / 3.5)
          const x = radius * Math.sin(angle)
          const y = -radius * Math.cos(angle) + 450
          const rotate = angle * (180 / Math.PI)
          const scale = 1.1 - Math.abs(t) * 0.2

          gsap.set(card, {
            x,
            y,
            rotate,
            scale,
            opacity: 1,
            zIndex: 1000 + Math.round(100 * scale),
          })
        })
      }

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: `+=${totalCards * 300}`,
        scrub: 2,
        onUpdate: (self) => {
          updateCards(self.progress)
        },
      })

      updateCards(0)
      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile])

  // ✅ MOBILE LAYOUT
  if (isMobile) {
    return (
      <div className="w-full overflow-x-auto flex gap-4 px-4 py-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="min-w-[200px] h-[260px] rounded-2xl overflow-hidden 
            bg-white/10 backdrop-blur-xl border border-white/10 
            shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="relative w-full h-[80%]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <div className="h-[20%] flex items-center justify-center px-2">
              <p className="text-white text-sm text-center">
                {service.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ✅ DESKTOP (UNCHANGED)
  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-visible relative z-[999]"
    >
      {services.map((service, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el
          }}
          className="absolute w-[200px] h-[280px] rounded-2xl overflow-hidden 
          bg-white/10 backdrop-blur-xl border border-white/10 
          shadow-[0_10px_30px_rgba(0,0,0,0.3)] 
          cursor-pointer group"
        >
          <div className="relative w-full h-[80%] overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="h-[20%] flex items-center justify-center px-2">
            <p className="text-white text-sm font-medium text-center">
              {service.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}