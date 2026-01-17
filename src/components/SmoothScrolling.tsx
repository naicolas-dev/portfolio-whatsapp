"use client";

import { ReactLenis } from "lenis/react";

interface SmoothScrollingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SmoothScrolling({ children, className }: SmoothScrollingProps) {
  return (
    <ReactLenis root={false} className={className} options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}