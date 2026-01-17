"use client";

import { useChatStore } from "@/store/useChatStore";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";

export default function ChatInput() {
  const [text, setText] = useState("");
  const { activeContact, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!text.trim() || !activeContact) return;
    
    sendMessage(activeContact.id, text);
    setText(""); // Limpa o input
    
    // Aqui no futuro podemos adicionar som de envio
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <footer className="bg-whatsapp-light dark:bg-whatsapp-dark-header px-4 py-2 flex items-center gap-2 md:gap-4 flex-shrink-0 z-20 min-h-[62px]">
      
      <div className="flex gap-2 text-gray-500 dark:text-gray-400">
        <button className="hidden md:block p-2 hover:bg-black/5 rounded-full transition"><Smile size={24} /></button>
        <button className="p-2 hover:bg-black/5 rounded-full transition"><Paperclip size={24} /></button>
      </div>

      <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg px-4 py-2 flex items-center">
        <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem" 
            className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder:text-gray-500"
        />
      </div>

      <button 
        onClick={handleSend}
        className="p-2 text-gray-500 dark:text-gray-400 hover:bg-black/5 rounded-full transition"
      >
        {/* Se tiver texto mostra Send, senão Mic */}
        {text.trim() ? <Send size={24} /> : <Mic size={24} />}
      </button>
    </footer>
  );
}