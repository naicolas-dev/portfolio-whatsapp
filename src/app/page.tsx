"use client";

import { useChatStore } from "@/store/useChatStore";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { useEffect, useState } from "react";

export default function Home() {
  const { activeContact, isMobileChatOpen } = useChatStore();
  
  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-[#0c1317] xl:py-5 xl:px-20">
      {/* LAYOUT CONTAINER */}
      <div className="flex w-full h-full bg-white dark:bg-whatsapp-dark-bg xl:rounded-lg overflow-hidden shadow-lg xl:min-w-[1000px]">
        
        {/* SIDEBAR */}
        <div className={`${isMobileChatOpen ? 'hidden' : 'flex'} md:flex w-full md:w-auto h-full`}>
            <Sidebar />
        </div>

        {/* CHAT AREA */}
        <div className={`
            flex-1 h-full bg-whatsapp-chat-bg dark:bg-[#0b141a] relative
            ${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-col
        `}>
          
          {activeContact ? (
             /* CHAT ATIVO: O componente ChatWindow cuida de tudo (Header, Lista, Input) */
             <ChatWindow />
          ) : (
             /* ESTADO VAZIO (Apenas Desktop): Mantivemos aqui pois é específico da Home */
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-whatsapp-light dark:bg-whatsapp-dark-header border-b-[6px] border-whatsapp-teal">
              {/* Se quiser adicionar uma imagem de "Notebook" ou "Conectado" aqui, fica legal */}
              <h1 className="text-3xl font-light text-gray-600 dark:text-gray-200 mt-8">Portfólio Web</h1>
              <p className="text-gray-500 mt-4 text-sm text-center px-6">
                Envie e receba mensagens para explorar meu trabalho.<br/>
                Selecione uma conversa ao lado para começar.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}