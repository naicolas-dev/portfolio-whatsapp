"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Mic, Plus } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { activeContact, sendMessage, isSpeaking, chats } = useChatStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const prevContactId = useRef<string | null>(null);

  useEffect(() => {
    if (!activeContact) return;

    if (prevContactId.current !== activeContact.id) {
        const currentChat = chats[activeContact.id] || [];
        const hasMessages = currentChat.length > 0;

        if (!hasMessages && activeContact.prompt) {
          setMessage(activeContact.prompt);
        } else {
          setMessage(""); 
        }

        prevContactId.current = activeContact.id;
    }

    if (!isSpeaking) {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }

  }, [activeContact, chats, isSpeaking]); 

  const handleSend = () => {
    if (message.trim()) {
      if (activeContact) {
        sendMessage(activeContact.id, message);
        setMessage(""); 
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const isBlocked = isSpeaking; 

  return (
    <footer className="bg-[#f0f2f5] dark:bg-[#202c33] px-4 py-3 flex items-center gap-3 relative z-20 shrink-0">
      <button 
        className="text-[#54656f] dark:text-[#8696a0] hover:text-gray-600 transition disabled:opacity-50" 
        disabled={isBlocked}
      >
        <Plus size={24} />
      </button>

      <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg flex items-center border border-transparent focus-within:border-none">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isBlocked ? "Nicolas está digitando..." : "Mensagem"}
          disabled={isBlocked}
          className="w-full bg-transparent px-4 py-3 text-[15px] text-[#111b21] dark:text-[#d1d7db] placeholder:text-[#8696a0] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        />
      </div>

      {message.trim() ? (
        <button 
          onClick={handleSend}
          disabled={isBlocked}
          className="p-2 rounded-full text-[#00a884] hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
        >
          <Send size={24} />
        </button>
      ) : (
        <button className="text-[#54656f] dark:text-[#8696a0] disabled:opacity-50">
           <Mic size={24} />
        </button>
      )}
    </footer>
  );
}