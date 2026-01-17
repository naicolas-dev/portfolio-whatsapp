"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/data/chatData";
import { Check, CheckCheck, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const isVisitor = message.sender === 'visitor';
  const isCTA = !!message.link;

  // --- 1. CURSOR AWARENESS (Física Magnética Refinada) ---
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mola mais "pesada" e responsiva (Luxury Feel)
  const mouseX = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 250, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXVal = event.clientX - rect.left;
      const mouseYVal = event.clientY - rect.top;
      
      // Movimento sutil (12px max)
      const xPct = (mouseXVal / width - 0.5) * 12; 
      const yPct = (mouseYVal / height - 0.5) * 12;
      
      x.set(xPct);
      y.set(yPct);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Efeito Parallax interno (Opcional: O texto move um pouco menos que o balão)
  const textX = useTransform(mouseX, [ -10, 10 ], [ -2, 2 ]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      
      // --- 2. ENTRADA CINEMÁTICA (Custom Bezier) ---
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(5px)" }} // Começa levemente borrado
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.8, // Mais lento e elegante
        delay: index * 0.1, // Stagger não-linear pode ser feito no pai, aqui linear serve
        ease: [0.25, 1, 0.5, 1] // A "Curva Awwwards" (Soft Out)
      }}
      
      className={cn(
        "flex w-full mb-2 relative z-10 origin-bottom group", 
        isVisitor ? "justify-end" : "justify-start"
      )}
    >
       <div className={cn(
          "relative max-w-[85%] md:max-w-[60%] px-4 py-3 rounded-2xl text-[15px] leading-[22px] shadow-sm transition-all duration-500",
          // Glow no CTA
          isCTA ? "hover:shadow-[0_10px_30px_-10px_rgba(0,168,132,0.3)] ring-1 ring-transparent hover:ring-wa-teal/30 cursor-pointer" : "",
          isVisitor 
            ? "bg-[#d9fdd3] dark:bg-[#005c4b] rounded-tr-sm text-[#111b21] dark:text-[#e9edef]" 
            : "bg-white dark:bg-[#202c33] rounded-tl-sm text-[#111b21] dark:text-[#e9edef]"     
        )}>
            {/* SVG Tail ... (Mantenha o SVG igual ao anterior) ... */}
            <span className={cn(
                "absolute top-0 w-[8px] h-[13px]",
                isVisitor 
                    ? "-right-[8px] text-[#d9fdd3] dark:text-[#005c4b] fill-current" 
                    : "-left-[8px] text-white dark:text-[#202c33] fill-current -scale-x-100"
            )}>
                <svg viewBox="0 0 8 13" width="8" height="13" className="block w-full h-full">
                    <path opacity="0.13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"/>
                    <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"/>
                </svg>
            </span>

            {/* Texto com Parallax Interno Sutil */}
            <motion.div style={{ x: textX }} className="pr-7 pb-1 whitespace-pre-wrap break-words">
              {message.text}
              
              {message.link && (
                <a 
                  href={message.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 block p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 hover:bg-black/10 transition-colors group/link"
                >
                   <span className="text-xs uppercase tracking-widest opacity-60 mb-1 block">Acessar Projeto</span>
                   <div className="flex items-center gap-2 text-[#008069] dark:text-[#53bdeb] font-bold">
                     {message.link.label} 
                     <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                   </div>
                </a>
              )}
            </motion.div>

            {/* Hora */}
            <div className="absolute bottom-1 right-2 flex items-center gap-1 select-none opacity-50 text-[10px]">
              <span>{message.timestamp}</span>
              {isVisitor && <CheckCheck size={14} className="text-[#53bdeb]" />}
            </div>
       </div>
    </motion.div>
  );
}