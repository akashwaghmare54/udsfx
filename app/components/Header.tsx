"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Maximize, Minimize, Menu, X } from "lucide-react";
import Link from "next/link"

const menuItems = [
  { name: "Home", link: "hero" },
  { name: "About", link: "about" },
  { name: "Services", link: "services" },
  { name: "Gallery", link: "gallery" },
  { name: "Contact", link: "contact" },
];

export default function Header() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) =>
        document.getElementById(item.link)
      );
      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) setActive(section.id);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };


  // Framer Motion variants
  const menuVariants: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 0.7,
      transition: { staggerChildren: 0.1, delayChildren: 0.1, type: "spring" as const },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300 } },
  };

  return (
    <>
      {/* TOP HEADER ROW */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 lg:px-10 py-4 md:py-6">        {/* LOGO */}
        <Link href="#hero">
          <img
            src="/hmc-logo.png"
            alt="HMC Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain brightness-110 cursor-pointer"
          />
        </Link>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-6 mr-[1%]">
          {/* Fullscreen icon */}
          {/* <button
            onClick={toggleFullScreen}
            className="text-white hover:text-yellow-400 transition"
          >
            {isFullScreen ? (
              <Minimize size={24} strokeWidth={2.5} />
            ) : (
              <Maximize size={24} strokeWidth={2.5} />
            )}
          </button> */}

          {/* Hamburger icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-yellow-400 transition"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </header>

      {/* LEFT SIDE VERTICAL NAV (Original) */}
      <nav className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 pr-6 ml-[-1.2%]">
        <ul className="flex flex-col items-center gap-4">
          {menuItems.map((item, index) => (
            <li key={item.name} className="flex flex-col items-center">
              <motion.a
                href={`#${item.link}`}
                whileHover={{ scale: 1.1 }}
                className={`
                  block
                  whitespace-nowrap
                  text-xs
                  tracking-widest
                  -rotate-90
                  transition
                  ${active === item.link
                    ? "text-yellow-400"
                    : "text-white/60 hover:text-yellow-400"}
                `}
              >
                {item.name}
              </motion.a>

              {/* LIGHT DIVIDER */}
              {index !== menuItems.length - 1 && (
                <span className="w-[1px] h-10 bg-gradient-to-b from-transparent via-yellow-500/40 to-transparent mt-8 mb-4"></span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* FULLSCREEN SLIDE-IN MENU */}
      {menuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="fixed inset-0 z-[55] bg-black backdrop-blur-xl flex items-center justify-center overflow-hidden"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 text-white text-3xl hover:text-yellow-400 transition"
          >
            ✕
          </button>


          {/* MENU ITEMS */}
          <ul className="flex flex-col items-center gap-10">
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl text-white tracking-widest"
              >
                <a
                  href={`#${item.link}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-yellow-400 transition-all py-2 px-4"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}


    </>
  );
}