"use client";

import { useEffect, useRef } from "react";

export default function Sparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // 🔹 Ambient sparkles
    for (let i = 0; i < 60; i++) {
      particles.push({
        type: "ambient",
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.8 + 0.3,
        opacity: Math.random(),
      });
    }

    // 🔥 CLICK BURST
    const createBurst = (x: number, y: number) => {
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
          type: "burst",
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1.5,
          opacity: 1,
          life: 60,
        });
      }
    };

    window.addEventListener("click", (e) => {
      createBurst(e.clientX, e.clientY);
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // 🌟 AMBIENT FLOATING
        if (p.type === "ambient") {
          p.y -= p.speedY;
          p.opacity -= 0.002;

          if (p.y < -20 || p.opacity <= 0) {
            p.x = Math.random() * canvas.width;
            p.y = canvas.height + 50;
            p.opacity = Math.random();
          }
        }

        // 💥 BURST PARTICLES
        if (p.type === "burst") {
          p.x += p.vx;
          p.y += p.vy;

          // slow down (friction)
          p.vx *= 0.96;
          p.vy *= 0.96;

          p.opacity *= 0.96;
          p.life--;

          if (p.life <= 0 || p.opacity <= 0.02) {
            particles.splice(index, 1);
            return;
          }
        }

        // ✨ GLOW RENDER
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 5
        );

        gradient.addColorStop(0, `rgba(255,215,120,${p.opacity})`);
        gradient.addColorStop(1, `rgba(255,215,120,0)`);

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
}