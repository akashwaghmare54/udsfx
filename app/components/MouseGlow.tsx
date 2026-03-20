"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `
          radial-gradient(circle,
          rgba(212,175,55,0.35) 0%,
          rgba(212,175,55,0.15) 25%,
          rgba(212,175,55,0.05) 40%,
          rgba(0,0,0,0) 70%)
        `,
          filter: "blur(80px)",
        }}
      />

      <div
        className="absolute w-[1000px] h-[1000px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.15), transparent 60%)",
          filter: "blur(120px)",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
        }}
      />
    </div>
  );
}