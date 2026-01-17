"use client";

import { contacts } from "@/data/contacts";
import { useChatStore } from "@/store/useChatStore";
import { Search, Plus, MoreVertical, ListFilter } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Sidebar() {
  const { activeContact, setActiveContact } = useChatStore();

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-wa-dark-bg border-r border-wa-border-light dark:border-wa-border-dark w-full md:w-[400px] flex-shrink-0">
      
      <header className="h-[60px] px-4 flex items-center justify-between bg-wa-light-bg dark:bg-wa-dark-header flex-shrink-0">
        <h1 className="text-xl font-bold text-[#41525d] dark:text-[#d1d7db]">Conversas</h1>
        
        <div className="flex gap-2.5 text-wa-panel-header-icon dark:text-[#aebac1]">
            <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition"><Plus size={22} strokeWidth={2} /></button>
            <button className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition"><MoreVertical size={22} strokeWidth={2} /></button>
        </div>
      </header>

      <div className="flex flex-col bg-white dark:bg-wa-dark-bg border-b border-wa-border-light dark:border-wa-border-dark pb-2">
        <div className="px-3 py-2">
          <div className="flex items-center bg-wa-light-bg dark:bg-wa-dark-header rounded-lg px-4 h-[35px] transition-all focus-within:shadow-sm">
            <Search size={18} className="text-wa-secondary dark:text-[#8696a0] mr-6" />
            <input 
              type="text" 
              placeholder="Pesquisar" 
              className="bg-transparent w-full text-[14px] outline-none text-wa-primary dark:text-[#d1d7db] placeholder:text-wa-secondary"
            />
          </div>
        </div>

        <div className="px-3 flex gap-2 items-center overflow-x-auto no-scrollbar">
           {['Tudo', 'Não lidas', 'Favoritas', 'Grupos'].map((filter, index) => (
               <button 
                  key={filter}
                  className={cn(
                      "px-3 py-1 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap",
                      index === 0 
                          ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-[#008069] dark:text-[#e9edef]" // Ativo
                          : "bg-wa-light-bg dark:bg-wa-dark-header text-wa-secondary dark:text-[#8696a0] hover:bg-[#e7e9eb] dark:hover:bg-[#2a3942]" // Inativo
                  )}
               >
                  {filter}
               </button>
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-wa-dark-bg">
        {contacts.map((contact) => (
          <motion.div 
            key={contact.id}
            onClick={() => setActiveContact(contact)}
            whileHover={{ scale: 1.02, x: 4, backgroundColor: "rgba(0,0,0,0.02)" }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
              "flex items-center px-3 py-2.5 cursor-pointer transition-colors relative group", 
              activeContact?.id === contact.id 
                ? "bg-wa-light-bg dark:bg-wa-dark-header" 
                : "hover:bg-[#f5f6f6] dark:hover:bg-[#202c33]"
            )}
          >
            <div className="relative w-[49px] h-[49px] flex-shrink-0 mr-3">
              <Image src={contact.avatar} alt={contact.name} fill className="rounded-full object-cover" />
            </div>

            <div className={cn(
                "flex-1 min-w-0 h-full flex flex-col justify-center border-indent-light border-indent-dark",
                "group-last:after:hidden" 
            )}>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-wa-primary dark:text-[#e9edef] font-normal text-[17px] leading-5">
                  {contact.name}
                </h3>
                <span className={cn(
                    "text-[12px] leading-3",
                    contact.unreadCount ? "text-[#1fa855] dark:text-[#00a884] font-medium" : "text-wa-secondary dark:text-[#8696a0]"
                )}>
                  {contact.time}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-wa-secondary dark:text-[#8696a0] text-[13px] leading-4 truncate pr-2 max-w-[90%]">
                  {contact.lastMessage}
                </p>
                
                {contact.unreadCount && (
                  <span className="bg-[#25d366] dark:bg-[#00a884] text-white text-[10px] font-bold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </aside>
  );
}