import { create } from 'zustand';
import { Contact } from '@/data/contacts';
import { chatData, Message } from '@/data/chatData';

// --- FUNÇÕES DE ÁUDIO ---
const playSentSound = () => {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/sent.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Áudio bloqueado pelo navegador:", e));
  }
};

const playReceivedSound = () => {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Áudio bloqueado pelo navegador:", e));
  }
};

interface ChatState {
  activeContact: Contact | null;
  isMobileChatOpen: boolean;
  chats: Record<string, Message[]>;
  isTyping: boolean;
  
  // ADICIONE ESTA LINHA:
  setTyping: (status: boolean) => void;

  setActiveContact: (contact: Contact) => void;
  closeMobileChat: () => void;
  sendMessage: (contactId: string, text: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  activeContact: null,
  isMobileChatOpen: false,
  chats: chatData,
  isTyping: false,

  // IMPLEMENTE A FUNÇÃO AQUI:
  setTyping: (status) => set({ isTyping: status }),

  setActiveContact: (contact) => set({ 
    activeContact: contact,
    isMobileChatOpen: true,
    isTyping: false 
  }),
  
  closeMobileChat: () => set({ 
    isMobileChatOpen: false 
  }),

  sendMessage: (contactId, text) => {
    playSentSound(); 

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

    // Mantive a lógica original, mas agora usando a action setTyping interna se precisar
    setTimeout(() => {
        set({ isTyping: true });

        setTimeout(() => {
            const state = get();
            playReceivedSound();

            const automaticResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'me',
                text: "Obrigado pela mensagem! 😉\nComo isso é apenas um portfólio interativo, eu (o Nicolas real) não estou vendo isso agora.\n\nMas clique na aba 'Contato' para falar comigo de verdade!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'read'
            };

            set({
                isTyping: false,
                chats: {
                    ...state.chats,
                    [contactId]: [...(state.chats[contactId] || []), automaticResponse]
                }
            });
        }, 1000); 

    }, 1000); 
  },
}));