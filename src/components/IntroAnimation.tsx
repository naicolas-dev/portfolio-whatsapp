"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Lock } from "lucide-react"; // Ícone de cadeado para o footer

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete(); // Avisa a página que acabou
      }
    });

    // Estado inicial
    gsap.set(containerRef.current, { zIndex: 50 });

    // Sequência de animação
    tl.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "out" }
    )
    .fromTo(titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.4"
    )
    .fromTo(footerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.3"
    )
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 1.5, // Fica na tela por 1.5s
      pointerEvents: "none"
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-white dark:bg-[#111b21] flex flex-col items-center justify-center z-50"
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {/* Ícone do WhatsApp (SVG Simples) */}
        <div ref={logoRef} className="w-20 h-20 bg-whatsapp-teal rounded-full flex items-center justify-center text-white">
             {/* Você pode trocar por uma imagem real do logo depois */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
        </div>
        <h1 ref={titleRef} className="text-gray-500 dark:text-gray-300 font-medium text-lg tracking-wide mt-4">
          Portfólio de Naicolas
        </h1>
      </div>

      <div ref={footerRef} className="pb-10 flex flex-col items-center gap-2">
        <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">de</span>
        <div className="flex items-center gap-1.5 text-whatsapp-teal dark:text-whatsapp-accent font-bold tracking-widest text-sm">
             NICOLAS ALVES
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-[10px] mt-2">
            <Lock size={10} /> Protegido com criptografia de ponta-a-ponta (só que não)
        </div>
      </div>
    </div>
  );
}