"use client";

import { contacts } from "@/data/contacts";
import { useChatStore } from "@/store/useChatStore";
import { Search, MoreVertical, MessageSquarePlus, CircleDashed } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
export default function Sidebar() {
  const { activeContact, setActiveContact } = useChatStore();

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-whatsapp-dark-bg border-r dark:border-gray-700 w-full md:w-[400px] flex-shrink-0">
      
      {/* Header da Sidebar (Seu Perfil) */}
      <header className="h-[60px] px-4 flex items-center justify-between bg-whatsapp-light dark:bg-whatsapp-dark-header flex-shrink-0">
        <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          {/* Sua foto virá aqui */}
          <Image 
            src="https://github.com/naicolas-dev.png" 
            alt="Nicolas" 
            fill 
            className="object-cover"
          />
        </div>
        
        <div className="flex gap-6 text-gray-500 dark:text-gray-400">
            <button><CircleDashed size={24} /></button>
            <button><MessageSquarePlus size={24} /></button>
            <button><MoreVertical size={24} /></button>
        </div>
      </header>

      {/* Barra de Pesquisa */}
      <div className="p-2 bg-white dark:bg-whatsapp-dark-bg border-b dark:border-gray-800">
        <div className="flex items-center bg-whatsapp-light dark:bg-whatsapp-dark-header rounded-lg px-4 py-2 h-9">
          <Search size={18} className="text-gray-500 mr-4" />
          <input 
            type="text" 
            placeholder="Pesquisar ou começar uma nova conversa" 
            className="bg-transparent w-full text-sm outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Lista de Chats (Scrollável) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {contacts.map((contact) => (
          <div 
            key={contact.id}
            onClick={() => setActiveContact(contact)}
            className={cn(
              "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202c33] transition-colors relative",
              activeContact?.id === contact.id ? "bg-gray-200 dark:bg-[#2a3942]" : ""
            )}
          >
            {/* Avatar do Contato */}
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image 
                src={contact.avatar} 
                alt={contact.name} 
                fill 
                className="rounded-full object-cover"
              />
            </div>

            {/* Info do Contato */}
            <div className="flex-1 min-w-0 border-b dark:border-gray-800 pb-3 h-full flex flex-col justify-center">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-gray-900 dark:text-gray-100 font-normal text-[17px]">
                  {contact.name}
                </h3>
                <span className={`text-xs ${contact.unreadCount ? 'text-whatsapp-teal dark:text-whatsapp-accent' : 'text-gray-500'}`}>
                  {contact.time}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate pr-2">
                  {contact.lastMessage}
                </p>
                
                {/* Badge de Mensagens Não Lidas */}
                {contact.unreadCount && (
                  <span className="bg-whatsapp-teal dark:bg-whatsapp-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Easter Egg / Footer da lista */}
        <div className="p-8 text-center text-xs text-gray-400 flex flex-col items-center gap-2">
            <span className="flex items-center gap-1">🔒 Suas mensagens são protegidas por criptografia de ponta-a-ponta (só que não)</span>
        </div>
      </div>
    </aside>
  );
}