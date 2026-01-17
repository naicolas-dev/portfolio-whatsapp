"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/data/chatData";
import { Check, CheckCheck, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const isVisitor = message.sender === 'visitor';
  const isCTA = !!message.link; // Se tiver link, tratamos como Call to Action

  // --- FÍSICA MAGNÉTICA (Magnetic Hover Effect) ---
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Configuração da mola (Spring) para o movimento do mouse ser suave
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXVal = event.clientX - rect.left;
      const mouseYVal = event.clientY - rect.top;
      
      // Move apenas 10px na direção do mouse para ser sutil
      const xPct = (mouseXVal / width - 0.5) * 10; 
      const yPct = (mouseYVal / height - 0.5) * 10;
      
      x.set(xPct);
      y.set(yPct);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      // --- ANIMAÇÃO DE ENTRADA (Liquid Stagger) ---
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 90, 
        damping: 12,
        delay: index * 0.05 // Efeito dominó (stagger)
      }}
      className={cn(
        "flex w-full mb-1 relative z-10 origin-bottom group", 
        isVisitor ? "justify-end" : "justify-start"
      )}
    >
       <div className={cn(
          "relative max-w-[85%] md:max-w-[60%] px-3 py-2 rounded-xl text-[14.2px] leading-[19px] shadow-sm transition-shadow duration-300",
          // Destaque para Links (CTA)
          isCTA ? "hover:shadow-md ring-2 ring-transparent hover:ring-wa-teal/20 cursor-pointer" : "",
          
          // Cores (Dark Mode Friendly)
          isVisitor 
            ? "bg-[#d9fdd3] dark:bg-[#005c4b] rounded-tr-none text-[#111b21] dark:text-[#e9edef]" 
            : "bg-white dark:bg-[#202c33] rounded-tl-none text-[#111b21] dark:text-[#e9edef]"     
        )}>
            {/* SVG Tail (O "biquinho" perfeito) */}
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

            <div className="pr-7 pb-1 whitespace-pre-wrap break-words">
              {message.text}
              
              {/* Renderização do Link (CTA) */}
              {message.link && (
                <a 
                  href={message.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 text-[#008069] dark:text-[#53bdeb] font-bold hover:underline"
                >
                   {message.link.label} <ArrowRight size={14} />
                </a>
              )}
            </div>

            {/* Hora e Status */}
            <div className="absolute bottom-1 right-2 flex items-center gap-1 select-none">
              <span className="text-[11px] text-[rgba(17,27,33,0.5)] dark:text-[rgba(255,255,255,0.6)]">
                {message.timestamp}
              </span>
              
              {isVisitor && (
                <div className={cn(
                    "text-[15px]",
                    message.status === 'read' ? "text-[#53bdeb]" : "text-[rgba(17,27,33,0.5)] dark:text-[rgba(255,255,255,0.6)]"
                )}>
                  {message.status === 'read' ? <CheckCheck size={15} /> : <Check size={15} />}
                </div>
              )}
            </div>
       </div>
    </motion.div>
  );
}