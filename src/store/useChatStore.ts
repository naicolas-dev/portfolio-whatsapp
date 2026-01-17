import { create } from 'zustand';
import { Contact } from '@/data/contacts';

interface ChatState {
  activeContact: Contact | null;
  isMobileChatOpen: boolean; // Controla a visão no mobile
  setActiveContact: (contact: Contact) => void;
  closeMobileChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeContact: null, // Nenhum chat selecionado inicialmente
  isMobileChatOpen: false,
  
  setActiveContact: (contact) => set({ 
    activeContact: contact,
    isMobileChatOpen: true // No mobile, ao clicar, abre a tela de chat
  }),
  
  closeMobileChat: () => set({ 
    isMobileChatOpen: false 
  }),
}));