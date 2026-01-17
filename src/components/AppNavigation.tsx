"use client";

import { MessageSquareText, CircleDashed, Users, MessageCircle, Settings, Moon, Sun, Archive } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AppNavigation() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. Ao carregar, verifica a preferência salva ou do sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 2. Função de alternar
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="hidden md:flex flex-col justify-between w-[64px] bg-[#f0f2f5] dark:bg-[#202c33] border-r border-wa-border-light dark:border-wa-border-dark h-full py-3 items-center z-20 flex-shrink-0 transition-colors duration-300">
      
      {/* Top Icons */}
      <div className="flex flex-col gap-5 items-center w-full">
        {/* Ícone de Chat (Ativo) */}
        <div className="relative group cursor-pointer" title="Conversas">
            <div className="bg-[#dcf8c6] dark:bg-[#374248] p-2.5 rounded-full transition-colors">
               <MessageSquareText size={20} className="text-[#008069] dark:text-[#d1d7db]" fill="currentColor" />
            </div>
            <span className="absolute -top-1 -right-1 bg-[#25d366] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#202c33]">1</span>
        </div>

        <button title="Status" className="text-[#54656f] dark:text-[#aebac1] hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-colors">
            <CircleDashed size={24} />
        </button>

        <button title="Canais" className="text-[#54656f] dark:text-[#aebac1] hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-colors">
            <MessageCircle size={24} />
        </button>

        <button title="Comunidades" className="text-[#54656f] dark:text-[#aebac1] hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-colors">
            <Users size={24} />
        </button>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-5 items-center w-full mb-2">
        
        {/* BOTÃO DE TEMA (TOGGLE) */}
        <button 
            onClick={toggleTheme}
            title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            className="text-[#54656f] dark:text-[#aebac1] hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-all duration-300 rotate-0 hover:rotate-12"
        >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <button title="Configurações" className="text-[#54656f] dark:text-[#aebac1] hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-full transition-colors">
            <Settings size={24} />
        </button>
        
        {/* Avatar Pequeno (Perfil) */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition ring-2 ring-transparent hover:ring-[#008069] p-[1px]">
             <Image 
                src="https://github.com/naicolas-dev.png" 
                alt="Profile" 
                fill 
                className="object-cover rounded-full"
             />
        </div>
      </div>
    </div>
  );
}