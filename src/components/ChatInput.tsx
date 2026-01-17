"use client";

import { useChatStore } from "@/store/useChatStore";
import { Mic, Plus, Smile, Send } from "lucide-react"; // Importe o Plus
import { useState } from "react";

export default function ChatInput() {
  const [text, setText] = useState("");
  const { activeContact, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!text.trim() || !activeContact) return;
    sendMessage(activeContact.id, text);
    setText("");
  };

  return (
    <footer className="bg-wa-light-bg dark:bg-wa-dark-header px-4 py-2 flex items-center gap-2 flex-shrink-0 min-h-[62px] z-20">
      
      {/* Botão + (A esquerda) */}
      <button className="text-wa-panel-header-icon dark:text-[#8696a0] p-1 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition">
        <Plus size={26} strokeWidth={1.5} />
      </button>

      {/* Conteúdo Central (Emoji + Input) */}
      <div className="flex-1 bg-white dark:bg-wa-dark-input rounded-lg px-2 py-1.5 flex items-center shadow-sm">
        
        {/* Emoji Button (Dentro do pill ou colado nele) */}
        <button className="text-wa-panel-header-icon dark:text-[#8696a0] p-1 mx-1 hover:opacity-80 transition">
            <Smile size={24} strokeWidth={1.5} />
        </button>

        <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite uma mensagem" 
            className="w-full bg-transparent outline-none text-[15px] text-wa-primary dark:text-[#d1d7db] placeholder:text-wa-secondary dark:placeholder:text-[#8696a0] px-2 h-[26px]"
        />
      </div>

      {/* Mic / Send (A direita) */}
      <button 
        onClick={handleSend}
        className="text-wa-panel-header-icon dark:text-[#8696a0] p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition"
      >
        {text.trim() ? <Send size={24} /> : <Mic size={24} />}
      </button>
    </footer>
  );
}