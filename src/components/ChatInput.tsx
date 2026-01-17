import { Mic, Paperclip, Send, Smile } from "lucide-react";

export default function ChatInput() {
  return (
    <footer className="bg-whatsapp-light dark:bg-whatsapp-dark-header px-4 py-2 flex items-center gap-2 md:gap-4 flex-shrink-0 z-20">
      
      {/* Botões de Mídia (Desktop) */}
      <div className="flex gap-2 text-gray-500 dark:text-gray-400">
        <button className="hidden md:block p-2 hover:bg-black/5 rounded-full transition"><Smile size={24} /></button>
        <button className="p-2 hover:bg-black/5 rounded-full transition"><Paperclip size={24} /></button>
      </div>

      {/* Input Field */}
      <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg px-4 py-2 flex items-center">
        <input 
            type="text" 
            placeholder="Digite uma mensagem" 
            className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-100 placeholder:text-gray-500"
        />
      </div>

      {/* Botão Mic/Send */}
      <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-black/5 rounded-full transition">
        <Mic size={24} />
      </button>
    </footer>
  );
}