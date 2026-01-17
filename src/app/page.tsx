"use client";

import { useChatStore } from "@/store/useChatStore";
import Sidebar from "@/components/Sidebar";
import AppNavigation from "@/components/AppNavigation";
import ChatWindow from "@/components/ChatWindow";
import ConceptScreen from "@/components/ConceptScreen";
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
        <ConceptScreen onComplete={() => setIntroFinished(true)} />
      )}

      <div className="flex w-full h-full bg-white dark:bg-whatsapp-dark-bg xl:rounded-lg overflow-hidden shadow-lg xl:max-w-[1600px] mx-auto">
         
         <div className={`${isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
            <AppNavigation />
            <Sidebar />
         </div>
         <div className={`
            flex-1 h-full bg-whatsapp-chat-bg dark:bg-[#0b141a] relative 
            ${isMobileChatOpen ? 'flex' : 'hidden'} md:flex flex-col border-l dark:border-gray-700/50
         `}>
          {activeContact ? (
             <ChatWindow />
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#f0f2f5] dark:bg-[#222e35] border-b-[6px] border-whatsapp-teal select-none">
              <div className="text-center max-w-md px-6">
                  <h1 className="text-3xl font-light text-[#41525d] dark:text-[#e9edef] mt-4">
                    Portfólio Web
                  </h1>
                  <p className="text-[#8696a0] mt-4 text-sm leading-6">
                    Selecione um capítulo ao lado para começar a explorar minha jornada, stack e projetos.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-2 text-[#8696a0] text-xs">
                     🔒 Protegido com criptografia de ponta-a-ponta
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}