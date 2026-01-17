"use client";

import { useChatStore } from "@/store/useChatStore";
import Sidebar from "@/components/Sidebar";
import AppNavigation from "@/components/AppNavigation"; // <--- Importe
import ChatWindow from "@/components/ChatWindow";
import IntroAnimation from "@/components/IntroAnimation";
import { useEffect, useState } from "react";

export default function Home() {
  const { activeContact, isMobileChatOpen } = useChatStore();
  const [mounted, setMounted] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="flex h-screen w-screen bg-[#d1d7db] dark:bg-[#0c1317] xl:py-5 xl:px-[5%] relative overflow-hidden">
      
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* CONTAINER PRINCIPAL */}
      <div className="flex w-full h-full bg-white dark:bg-whatsapp-dark-bg xl:rounded-lg overflow-hidden shadow-lg xl:max-w-[1600px] mx-auto">
        
        {/* COLUNA DA ESQUERDA (Nav + Sidebar) */}
        {/* No mobile: se o chat estiver aberto, esconde tudo. Se não, mostra. */}
        <div className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
            
            {/* 1. Barra de Ícones (App Navigation) - Só aparece no Desktop */}
            <AppNavigation />

            {/* 2. Lista de Contatos (Sidebar) */}
            <Sidebar />
        </div>

        {/* COLUNA DA DIREITA (Chat) */}
        <div className={`
            flex-1 h-full bg-whatsapp-chat-bg dark:bg-[#0b141a] relative
            ${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-col border-l dark:border-gray-700/50
        `}>
          {activeContact ? (
             <ChatWindow />
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#f0f2f5] dark:bg-[#222e35] border-b-[6px] border-whatsapp-teal">
              {/* Imagem de Placeholder (Tente achar a do "Notebook" do WhatsApp Web) */}
              <div className="relative w-[300px] h-[200px] mb-8 opacity-90">
                 {/* Você pode usar uma div ou SVG aqui se não tiver imagem */}
              </div>
              <h1 className="text-3xl font-light text-[#41525d] dark:text-[#e9edef] mt-4">Portfólio Web</h1>
              <p className="text-[#8696a0] mt-4 text-sm text-center px-6 leading-6">
                Envie e receba mensagens para ver meus projetos, skills e experiência.<br/>
                O design é inspirado no WhatsApp Web para facilitar sua navegação.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#8696a0] text-xs">
                 🔒 Protegido com criptografia de ponta-a-ponta
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}