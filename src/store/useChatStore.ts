import { create } from 'zustand';
import { Contact } from '@/data/contacts';
import { chatData, Message } from '@/data/chatData';

interface ChatState {
  activeContact: Contact | null;
  isMobileChatOpen: boolean;
  chats: Record<string, Message[]>;
  isTyping: boolean; // <--- NOVO
  
  setActiveContact: (contact: Contact) => void;
  closeMobileChat: () => void;
  sendMessage: (contactId: string, text: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  activeContact: null,
  isMobileChatOpen: false,
  chats: chatData,
  isTyping: false, // <--- Começa falso

  setActiveContact: (contact) => set({ 
    activeContact: contact,
    isMobileChatOpen: true,
    isTyping: false // Reseta ao trocar de chat
  }),
  
  closeMobileChat: () => set({ 
    isMobileChatOpen: false 
  }),

  sendMessage: (contactId, text) => {
    // 1. Adiciona a mensagem do visitante
    set((state) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'visitor',
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      return {
        chats: {
          ...state.chats,
          [contactId]: [...(state.chats[contactId] || []), newMessage]
        }
      };
    });

    // 2. Simula o "Nicolas Digitando..." após 1 segundo
    setTimeout(() => {
        set({ isTyping: true });

        // 3. Envia a resposta automática após mais 2 segundos digitando
        setTimeout(() => {
            const state = get();
            const automaticResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'me', // Nicolas respondendo
                text: "Obrigado pela mensagem! 😉\nComo isso é apenas um portfólio interativo, eu (o Nicolas real) não estou vendo isso agora.\n\nMas clique na aba 'Contato' para falar comigo de verdade!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'read'
            };

            set({
                isTyping: false, // Para de digitar
                chats: {
                    ...state.chats,
                    [contactId]: [...(state.chats[contactId] || []), automaticResponse]
                }
            });
        }, 1000); // Tempo fingindo que digita

    }, 1000); // Delay inicial de "leitura"
  },
}));