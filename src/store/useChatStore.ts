import { create } from 'zustand';
import { Contact } from '@/data/contacts';
import { chatData, Message } from '@/data/chatData';

interface ChatState {
  activeContact: Contact | null;
  isMobileChatOpen: boolean;
  // Agora guardamos o histórico de TODAS as conversas aqui
  chats: Record<string, Message[]>; 
  
  setActiveContact: (contact: Contact) => void;
  closeMobileChat: () => void;
  sendMessage: (contactId: string, text: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeContact: null,
  isMobileChatOpen: false,
  chats: chatData, // Carrega os dados iniciais do arquivo estático

  setActiveContact: (contact) => set({ 
    activeContact: contact,
    isMobileChatOpen: true 
  }),
  
  closeMobileChat: () => set({ 
    isMobileChatOpen: false 
  }),

  sendMessage: (contactId, text) => set((state) => {
    const newMessage: Message = {
      id: Date.now().toString(), // ID único baseado no tempo
      sender: 'visitor', // Visitante sempre é quem envia pelo input
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' // Começa como enviado (um check cinza)
    };

    return {
      chats: {
        ...state.chats,
        [contactId]: [...(state.chats[contactId] || []), newMessage]
      }
    };
  }),
}));