"use client";

import { useChatStore } from "@/store/useChatStore";
import { useChatDirector } from "@/hooks/useChatDirector"; // Hook do Diretor
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SpotlightBackground from "./SpotlightBackground"; // O fundo "Awwwards"
import { MoreVertical, Search, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWindow() {
  const { activeContact, closeMobileChat, chats, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 1. Pega o "Roteiro" completo do capítulo atual
  const fullScript = activeContact ? (chats[activeContact.id] || []) : [];

  // 2. O "Diretor" controla quais mensagens aparecem e quando (Narrativa)
  // Se você ainda não criou o hook, ele vai retornar todas. Se criou, vai fazer o timing.
  const { visibleMessages } = useChatDirector(fullScript, activeContact?.id || '');

  // Auto-scroll sempre que uma nova mensagem entra em cena
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping, activeContact]);

  if (!activeContact) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#efeae2] dark:bg-[#0b141a] relative group overflow-hidden">
      
      {/* 1. ATMOSFERA (Fundo Interativo) */}
      <SpotlightBackground />

      {/* 2. HEADER */}
      <header className="bg-wa-light-bg dark:bg-wa-dark-header h-[60px] px-4 flex justify-between items-center border-b border-wa-border-light dark:border-wa-border-dark z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={closeMobileChat} 
            className="md:hidden text-wa-panel-header-icon dark:text-[#8696a0] mr-1"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="relative w-[40px] h-[40px] cursor-pointer">
            <Image 
                src={activeContact.avatar} 
                alt={activeContact.name} 
                fill 
                className="rounded-full object-cover" 
            />
          </div>
          
          <div className="flex flex-col justify-center cursor-pointer">
            <h2 className="font-normal text-wa-primary dark:text-[#e9edef] text-[16px] leading-tight">
                {activeContact.name}
            </h2>
            <span className={`text-[13px] leading-4 truncate ${isTyping ? 'text-[#00a884] font-medium' : 'text-wa-secondary dark:text-[#8696a0]'}`}>
                {isTyping ? 'digitando...' : `visto por último hoje às ${activeContact.time}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-wa-panel-header-icon dark:text-[#aebac1]">
            <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition"><Search size={22} strokeWidth={1.5}/></button>
            <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition"><MoreVertical size={22} strokeWidth={1.5}/></button>
        </div>
      </header>

      {/* 3. PALCO DA NARRATIVA */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10 space-y-2">
         
         {/* Background Pattern Estático (Fallback para o Spotlight) */}
         <div className="absolute inset-0 pointer-events-none fixed opacity-[0.4] dark:opacity-[0.06] bg-[image:var(--bg-doodle-light)] dark:bg-[image:var(--bg-doodle-dark)] bg-[size:400px] bg-repeat" />
         
         <div className="relative z-10 flex flex-col justify-end min-h-full pb-2">
            <div className="flex justify-center mb-6">
                <span className="bg-[#fff5c4] dark:bg-[#1f2c34] text-[#5e6c71] dark:text-[#8696a0] text-[10px] md:text-xs px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[90%]">
                    🔒 As mensagens são protegidas por criptografia de ponta-a-ponta.
                </span>
            </div>

            {/* Renderiza as mensagens controladas pelo Diretor */}
            <AnimatePresence mode="popLayout">
                {visibleMessages.map((msg, idx) => (
                    <MessageBubble key={msg.id} message={msg} index={idx} />
                ))}
            </AnimatePresence>

            {/* Indicador de Digitando (Suspense) */}
            {isTyping && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                >
                    <TypingIndicator />
                </motion.div>
            )}
            
            <div ref={messagesEndRef} />
         </div>
      </div>

      <ChatInput />
    </div>
  );
}