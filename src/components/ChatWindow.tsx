"use client";

import { useChatStore } from "@/store/useChatStore";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { MoreVertical, Search, ArrowLeft } from "lucide-react"; // Adicionei ArrowLeft
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ChatWindow() {
  const { activeContact, closeMobileChat, chats, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const messages = activeContact ? (chats[activeContact.id] || []) : [];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact, isTyping]);

  if (!activeContact) return null;

  return (
    // Fundo base do chat (Bege claro no light, Escuro profundo no dark)
    <div className="flex flex-col h-full w-full bg-[#efeae2] dark:bg-[#0b141a] relative">
      
      {/* HEADER */}
      <header className="bg-wa-light-bg dark:bg-wa-dark-header h-[60px] px-4 flex justify-between items-center border-b border-wa-border-light dark:border-wa-border-dark z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          
          {/* Botão Voltar (Apenas Mobile) */}
          <button 
            onClick={closeMobileChat} 
            className="md:hidden text-wa-panel-header-icon dark:text-[#8696a0] mr-1"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Avatar */}
          <div className="relative w-[40px] h-[40px] cursor-pointer">
            <Image 
                src={activeContact.avatar} 
                alt={activeContact.name} 
                fill 
                className="rounded-full object-cover" 
            />
          </div>
          
          {/* Info do Contato */}
          <div className="flex flex-col justify-center cursor-pointer">
            <h2 className="font-normal text-wa-primary dark:text-[#e9edef] text-[16px] leading-tight">
                {activeContact.name}
            </h2>
            <span className={`text-[13px] leading-4 truncate ${isTyping ? 'text-[#00a884] font-medium' : 'text-wa-secondary dark:text-[#8696a0]'}`}>
                {isTyping ? 'digitando...' : `visto por último hoje às ${activeContact.time}`}
            </span>
          </div>
        </div>

        {/* Ícones Top Right */}
        <div className="flex items-center gap-3 text-wa-panel-header-icon dark:text-[#aebac1]">
            <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition"><Search size={22} strokeWidth={1.5}/></button>
            <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition"><MoreVertical size={22} strokeWidth={1.5}/></button>
        </div>
      </header>

      {/* ÁREA DE MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10 space-y-2">
         
         {/* BACKGROUND PATTERN (CSS Variables) */}
         <div className="absolute inset-0 pointer-events-none fixed opacity-[0.4] dark:opacity-[0.06] bg-[image:var(--bg-doodle-light)] dark:bg-[image:var(--bg-doodle-dark)] bg-[size:400px] bg-repeat" />
         
         <div className="relative z-10 flex flex-col justify-end min-h-full pb-2">
            {/* Aviso de Criptografia */}
            <div className="flex justify-center mb-6">
                <span className="bg-[#fff5c4] dark:bg-[#1f2c34] text-[#5e6c71] dark:text-[#8696a0] text-[10px] md:text-xs px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[90%]">
                    🔒 As mensagens são protegidas por criptografia de ponta-a-ponta (só que não).
                </span>
            </div>

            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Indicador de Digitando */}
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
         </div>
      </div>

      <ChatInput />
    </div>
  );
}