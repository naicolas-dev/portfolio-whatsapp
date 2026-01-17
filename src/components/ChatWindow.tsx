"use client";

import { useChatStore } from "@/store/useChatStore";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator"; // <--- Importe aqui
import { MoreVertical, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ChatWindow() {
  const { activeContact, closeMobileChat, chats, isTyping } = useChatStore(); // <--- Pegue o isTyping
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const messages = activeContact ? (chats[activeContact.id] || []) : [];

  // Auto-scroll (atualizado para observar isTyping também)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact, isTyping]);

  if (!activeContact) return null;

  return (
    <div className="flex flex-col h-full w-full bg-whatsapp-chat-bg dark:bg-[#0b141a] relative">
      
      {/* HEADER */}
      <header className="bg-whatsapp-light dark:bg-whatsapp-dark-header px-4 py-2.5 flex justify-between items-center border-b dark:border-gray-800 z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={closeMobileChat} className="md:hidden text-gray-600 dark:text-gray-300 mr-1">
            ←
          </button>

          <div className="relative w-9 h-9 cursor-pointer">
            <Image 
                src={activeContact.avatar} 
                alt={activeContact.name} 
                fill 
                className="rounded-full object-cover" 
            />
          </div>
          <div className="flex flex-col justify-center cursor-pointer">
            <h2 className="font-medium text-gray-900 dark:text-gray-100 text-sm md:text-base leading-tight">
                {activeContact.name}
            </h2>
            {/* LÓGICA DO STATUS ABAIXO DO NOME */}
            <span className={`text-[11px] md:text-xs truncate ${isTyping ? 'text-whatsapp-teal dark:text-whatsapp-accent font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
                {isTyping ? 'digitando...' : `online hoje às ${activeContact.time}`}
            </span>
          </div>
        </div>

        {/* ... (Botões de ícones mantêm igual) ... */}
        <div className="flex items-center gap-4 text-whatsapp-teal dark:text-whatsapp-accent md:text-gray-500 md:dark:text-gray-400">
            <button className="hidden md:block"><Search size={20} /></button>
            <button className="hidden md:block"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* ÁREA DE MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10 space-y-2">
         <div className="absolute inset-0 bg-chat-pattern-light dark:bg-chat-pattern-dark opacity-40 pointer-events-none fixed" />
         
         <div className="relative z-10 flex flex-col justify-end min-h-full pb-2">
            {/* Aviso de Criptografia (Mantém igual) */}
            <div className="flex justify-center mb-6">
                <span className="bg-[#fff5c4] dark:bg-[#1f2c34] text-[#5e6c71] dark:text-[#8696a0] text-[10px] md:text-xs px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[90%]">
                    🔒 As mensagens são protegidas por criptografia de ponta-a-ponta (só que não).
                </span>
            </div>

            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* AQUI ENTRA O INDICADOR DE DIGITANDO */}
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
         </div>
      </div>

      <ChatInput />
    </div>
  );
}