"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/data/chatData";
import { Check, CheckCheck } from "lucide-react"; // Ícones de check
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex w-full mb-2",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[85%] md:max-w-[60%] px-3 py-2 rounded-lg text-sm md:text-[15px] shadow-sm",
          // Cores baseadas no Sender
          isMe 
            ? "bg-whatsapp-message-out dark:bg-whatsapp-dark-message-out rounded-tr-none text-gray-900 dark:text-gray-100" 
            : "bg-white dark:bg-whatsapp-dark-message-in rounded-tl-none text-gray-900 dark:text-gray-100"
        )}
      >
        {/* O Triângulo (Tail) do Balão */}
        <span className={cn(
            "absolute top-0 w-3 h-3",
            isMe 
                ? "-right-2 bg-whatsapp-message-out dark:bg-whatsapp-dark-message-out [clip-path:polygon(0_0,100%_0,0_100%)]" 
                : "-left-2 bg-white dark:bg-whatsapp-dark-message-in [clip-path:polygon(0_0,100%_0,100%_100%)]"
        )} />

        {/* Conteúdo da Mensagem */}
        <div className="pr-6 leading-relaxed">
          {message.text}
        </div>

        {/* Timestamp e Status */}
        <div className="absolute bottom-1 right-2 flex items-center gap-1">
          <span className="text-[10px] text-gray-500 dark:text-gray-400 opacity-80">
            {message.timestamp}
          </span>
          
          {/* Só mostra checks se for mensagem MINHA */}
          {isMe && (
            <div className={cn(
                "text-[15px]",
                message.status === 'read' ? "text-[#53bdeb]" : "text-gray-500"
            )}>
              {message.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}