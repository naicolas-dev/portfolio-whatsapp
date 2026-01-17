"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/data/chatData";
import { Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion"; // Certifique-se de ter framer-motion instalado

interface MessageBubbleProps {
  message: Message;
  index: number; // Precisamos do index para o delay em cascata
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const isVisitor = message.sender === 'visitor';

  return (
    <motion.div
      // A Mágica do Motion:
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08, // Cada mensagem espera um pouquinho mais que a anterior (efeito dominó)
        ease: [0.25, 0.46, 0.45, 0.94], // Curva suave
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className={cn(
        "flex w-full mb-1 relative z-10 origin-bottom", // z-10 para ficar acima do spotlight
        isVisitor ? "justify-end" : "justify-start"
      )}
    >
      {/* ... (Mantenha o conteúdo interno do balão IDENTICO ao que já fizemos com o SVG e cores) ... */}
       <div className={cn(
          "relative max-w-[85%] md:max-w-[60%] px-2 py-1.5 rounded-lg text-[14.2px] leading-[19px] shadow-sm",
          isVisitor 
            ? "bg-[#d9fdd3] dark:bg-[#005c4b] rounded-tr-none text-[#111b21] dark:text-[#e9edef]" 
            : "bg-white dark:bg-[#202c33] rounded-tl-none text-[#111b21] dark:text-[#e9edef]"     
        )}>
            {/* SVG Tail */}
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
            </div>

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