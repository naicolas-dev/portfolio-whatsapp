"use client";

import { useChatStore } from "@/store/useChatStore";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import IntroAnimation from "@/components/IntroAnimation"; // <--- Import
import { useEffect, useState } from "react";

export default function Home() {
  const { activeContact, isMobileChatOpen } = useChatStore();
  const [mounted, setMounted] = useState(false);
  
  // Estado para controlar se a intro já acabou
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-[#0c1317] xl:py-5 xl:px-20 relative overflow-hidden">
      
      {/* Exibe a Intro se não tiver acabado ainda */}
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* ... RESTO DO SEU CÓDIGO (Sidebar, Chat, etc) ... */}
      {/* Mantenha o conteúdo anterior aqui dentro */}
      <div className="flex w-full h-full bg-white dark:bg-whatsapp-dark-bg xl:rounded-lg overflow-hidden shadow-lg xl:min-w-[1000px]">
         {/* ... (Sidebar e ChatWindow iguais ao anterior) ... */}
         <div className={`${isMobileChatOpen ? 'hidden' : 'flex'} md:flex w-full md:w-auto h-full`}>
            <Sidebar />
        </div>

        <div className={`
            flex-1 h-full bg-whatsapp-chat-bg dark:bg-[#0b141a] relative
            ${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-col
        `}>
          {activeContact ? (
             <ChatWindow />
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-whatsapp-light dark:bg-whatsapp-dark-header border-b-[6px] border-whatsapp-teal">
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