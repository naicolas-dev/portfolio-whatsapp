"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete()
    });

    // 1. Digitação de código (Terminal effect)
    tl.to(textRef.current, {
      duration: 1.5,
      text: {
        value: "> nicolas.exe initializing...\n> loading modules...\n> establishing secure connection...",
        delimiter: ""
      },
      ease: "none",
    })
    // 2. Barra de progresso expandindo
    .to(progressRef.current, {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut"
    })
    // 3. "Explosão" para o branco (ou escuro)
    .to(container.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power4.in",
        delay: 0.2
    });

  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-green-500">
       <div className="w-[300px]">
           <div ref={textRef} className="text-xs mb-4 h-[60px] whitespace-pre-line opacity-80"></div>
           
           <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
               <div ref={progressRef} className="h-full bg-green-500 w-0"></div>
           </div>
       </div>
    </div>
  );
}