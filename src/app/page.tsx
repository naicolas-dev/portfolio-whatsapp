"use client";

import { useChatStore } from "@/store/useChatStore";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const { activeContact, isMobileChatOpen, closeMobileChat } = useChatStore();
  
  // Hidration fix (para evitar erro de renderização inicial server/client no zustand)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-[#0c1317] xl:py-5 xl:px-20">
      {/* LAYOUT CONTAINER
         No mobile: tela cheia.
         No desktop (XL): vira um "card" flutuante centralizado com sombra, igual WhatsApp Web/Desktop App.
       */}
      <div className="flex w-full h-full bg-white dark:bg-whatsapp-dark-bg xl:rounded-lg overflow-hidden shadow-lg xl:min-w-[1000px]">
        
        {/* SIDEBAR:
            - Desktop: Sempre visível (hidden apenas se for lógica complexa, mas aqui deixamos flex)
            - Mobile: Escondida se o chat estiver aberto
         */}
        <div className={`${isMobileChatOpen ? 'hidden' : 'flex'} md:flex w-full md:w-auto h-full`}>
            <Sidebar />
        </div>

        {/* CHAT AREA (Placeholder por enquanto):
            - Desktop: Sempre visível
            - Mobile: Visível apenas se isMobileChatOpen for true
         */}
        <div className={`
            flex-1 h-full bg-whatsapp-chat-bg dark:bg-[#0b141a] relative
            ${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-col
        `}>
          {/* Fundo com Pattern */}
          <div className="absolute inset-0 opacity-40 bg-chat-pattern-light dark:bg-chat-pattern-dark pointer-events-none" />

          {activeContact ? (
             /* CHAT ATIVO */
            <div className="relative z-10 flex flex-col h-full">
              {/* Header Temporário do Chat */}
              <header className="bg-whatsapp-light dark:bg-whatsapp-dark-header p-4 flex items-center gap-4 border-b dark:border-gray-800">
                <button onClick={closeMobileChat} className="md:hidden text-gray-600 dark:text-gray-300">
                  ← Voltar
                </button>
                <div className="font-bold text-gray-800 dark:text-white">
                    {activeContact.name}
                </div>
              </header>
              
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Aqui vai entrar o componente de mensagens para: {activeContact.name}</p>
              </div>
            </div>
          ) : (
             /* ESTADO VAZIO (Apenas Desktop) */
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-whatsapp-light dark:bg-whatsapp-dark-header border-b-[6px] border-whatsapp-teal">
              <h1 className="text-3xl font-light text-gray-600 dark:text-gray-200 mt-8">Portfólio Web</h1>
              <p className="text-gray-500 mt-4 text-sm">Envie e receba mensagens para explorar meu trabalho.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}