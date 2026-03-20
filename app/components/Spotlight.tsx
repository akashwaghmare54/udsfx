"use client";

import { useState } from "react";

export default function Spotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function move(e: React.MouseEvent) {
    setPos({ x: e.clientX, y: e.clientY });
  }

  return (
    <div
      onMouseMove={move}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(
          circle at ${pos.x}px ${pos.y}px,
          rgba(255,255,255,0.15),
          transparent 200px
        )`
      }}
    />
  );
}