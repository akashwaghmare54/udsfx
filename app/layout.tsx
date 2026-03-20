import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ReactNode } from "react";

import AnimatedCursor from "./components/AnimatedCursor";
import SmoothScroll from "./SmoothScroll";
import Spotlight from "./components/Spotlight";
import GoldenCursor from "./components/GoldenCursor";

import { Fredoka, Poppins } from "next/font/google";
import MouseGlow from "./components/MouseGlow";
import FluidSimulation from "./components/FluidSimulation";
import Sparkles from "./components/Sparkles";

/* Fonts */

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Happy Moment Creator | Premium Decorations",
  description:
    "Balloon decoration, birthday setups, bride & groom entry and premium party decoration services.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${poppins.variable} dark`}
    >
      <body className="bg-black text-white">

        {/* 🔥 MAIN BACKGROUND */}
        <FluidSimulation />
        <Sparkles />

        {/* UI */}
        <Header />

        {/* Effects */}
        <AnimatedCursor />
        <GoldenCursor />
        <Spotlight />
        <MouseGlow />

        <SmoothScroll>
          {children}
        </SmoothScroll>

        <Footer />

      </body>

    </html>
  );
}