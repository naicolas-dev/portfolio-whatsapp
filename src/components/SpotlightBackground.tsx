"use client";

import { useEffect, useRef, useState } from "react";

export default function SpotlightBackground() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => setOpacity(0);

  return (
    <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* 1. O Spotlight: Uma luz suave que segue o mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 168, 132, 0.08), transparent 80%)`,
        }}
      />
      
      {/* 2. Texture Grain: O segredo dos sites Awwwards (Noise Overlay) */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{ 
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" 
        }}
      ></div>
    </div>
  );
}