"use client"

import { useEffect, useRef } from "react"
import ParallaxGallery from "./ParallaxGallery"
import Image from "next/image"

import LightGallery from "lightgallery/react"
import lgZoom from "lightgallery/plugins/zoom"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgVideo from "lightgallery/plugins/video"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"
import "lightgallery/css/lg-video.css"

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { type: "image", src: "/images/g1.webp" },
  { type: "video", src: "/videos/v1.mp4" },
  { type: "image", src: "/images/g2.webp" },
  { type: "video", src: "/videos/v2.mp4" },
  { type: "image", src: "/images/g3.webp" },
  { type: "video", src: "/videos/v3.mp4" },
]

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      // 👉 Optional: disable on mobile for better UX
      if (isMobile) return

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // 👉 locks for one scroll
        pin: true,
        scrub: false, // no animation
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12"
      id="gallery"
    >
      <div className="text-center mb-10">
        <h2 className="text-[#D4AF37] text-5xl md:text-6xl font-semibold">
          Our Work
        </h2>
        <p className="text-neutral-400 mt-4">
          Images & videos from our setups.
        </p>
      </div>

      <LightGallery
        speed={500}
        plugins={[lgZoom, lgVideo]}
        download={false}
        elementClassNames="
    grid
    grid-cols-2
    sm:grid-cols-3
    lg:grid-cols-5
    gap-4 md:gap-6
  "
      >
        {galleryItems.map((item, i) => {
          const videoProps =
            item.type === "video"
              ? {
                "data-video": JSON.stringify({
                  source: [{ src: item.src, type: "video/mp4" }],
                  attributes: {
                    controls: true,
                    preload: "metadata",
                  },
                }),
              }
              : {}

          return (
            <a
              key={i}
              href={item.type === "image" ? item.src : undefined}
              {...videoProps}
              className="block"
            >
              <ParallaxGallery>
                <div className="group relative overflow-hidden rounded-2xl w-full h-[220px] sm:h-[260px] lg:h-[320px]">

                  {/* Frame */}
                  <div className="absolute inset-0 border border-white/10 rounded-2xl z-10 pointer-events-none" />

                  {/* IMAGE */}
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt="gallery"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                  )}

                  {/* Play Icon */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="bg-white/80 text-black rounded-full p-3 text-xl">
                        ▶
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
              </ParallaxGallery>
            </a>
          )
        })}
      </LightGallery>

    </section>
  )
}