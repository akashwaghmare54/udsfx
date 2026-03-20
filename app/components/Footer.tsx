"use client";

import { Instagram, Facebook, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer className="relative py-6 px-4 sm:px-6 lg:px-12">
        <div
          className="
            w-full
            flex flex-col-reverse lg:flex-row
            items-center justify-between
            gap-4

            rounded-2xl
            border border-white/20
            bg-white/5
            backdrop-blur-xl
            px-6 sm:px-8 py-5
            shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          "
        >
          {/* Footer Text */}
          <p className="text-sm text-white/70 tracking-wide text-center lg:text-left">
            © 2026 Happy Moment Creator. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Facebook size={18} />
            </a>

            <a
              href="#"
              className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* ================= WHATSAPP FLOAT BUTTON ================= */}
      <a
        href="https://wa.me/919823494017?text=Hi%20I%20want%20to%20book%20a%20service"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] group"
      >
        {/* Glow / Pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-ping"></span>

        {/* Button */}
        <div
          className="
            relative
            bg-[#25D366] hover:bg-[#1ebe5d]
            p-4 rounded-full
            shadow-lg

            flex items-center justify-center

            transition-all duration-300
            group-hover:scale-110
          "
        >
          <FaWhatsapp size={26} className="text-white" />
        </div>
      </a>
    </>
  );
}