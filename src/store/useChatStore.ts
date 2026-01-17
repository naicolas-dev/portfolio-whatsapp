import { create } from 'zustand';
import { Contact } from '@/data/contacts';
import { chatData as initialScripts, Message } from '@/data/chatData'; 

const playSentSound = () => {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/sent.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Áudio bloqueado:", e));
  }
};

const AUTO_RESPONSES = [
  "Interessante! 🤔 Mas como sou apenas um site portfólio, minha capacidade de conversa real é limitada.",
  "Estou programado apenas para apresentar o trabalho do Nicolas. Se quiser falar com ele de verdade, use o link no final ou o LinkedIn!",
  "Sério, eu sou só um monte de `if/else` e React renderizando na tela. Não consigo entender o que você diz! 😅",
  "Ok, você venceu pela persistência! 🏆 Mas agora vou voltar ao modo estático. Fui!"
];

interface ChatState {
  activeContact: Contact | null;
  isMobileChatOpen: boolean;
  chats: Record<string, Message[]>;
  interactionCounts: Record<string, number>;
  isTyping: boolean;
  isSpeaking: boolean; 
  
  setTyping: (status: boolean) => void;
  setSpeaking: (status: boolean) => void;

  setActiveContact: (contact: Contact) => void;
  closeMobileChat: () => void;
  sendMessage: (contactId: string, text: string) => void;
  markMessageAsShown: (contactId: string, messageId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  activeContact: null,
  isMobileChatOpen: false,
  chats: {},
  interactionCounts: {},
  isTyping: false,
  isSpeaking: false,

  setTyping: (status) => set({ isTyping: status }),
  setSpeaking: (status) => set({ isSpeaking: status }),

  setActiveContact: (contact) => set({ 
    activeContact: contact,
    isMobileChatOpen: true,
    isTyping: false,
    isSpeaking: false 
  }),
  
  closeMobileChat: () => set({ 
    isMobileChatOpen: false 
  }),

  markMessageAsShown: (contactId, messageId) => set((state) => {
    const chat = state.chats[contactId];
    if (!chat) return state;

    const newChat = chat.map(msg => 
        msg.id === messageId ? { ...msg, shown: true } : msg
    );

    return {
        chats: { ...state.chats, [contactId]: newChat }
    };
  }),

  sendMessage: (contactId, text) => {
    playSentSound(); 

    set((state) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'visitor',
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        shown: true
      };

      const currentHistory = state.chats[contactId] || [];
      const isFirstMessage = currentHistory.length === 0;
      
      let newHistory = [...currentHistory, newMessage];
      let newCounts = { ...state.interactionCounts };

      if (isFirstMessage) {
        const script = initialScripts[contactId] || [];
        newHistory = [...newHistory, ...script];
      } 
      else {
        const currentCount = newCounts[contactId] || 0;

        if (currentCount < AUTO_RESPONSES.length) {
            const responseText = AUTO_RESPONSES[currentCount];
            
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'me',
                text: responseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'read',
                shown: false
            };

            newHistory.push(botResponse);

            newCounts[contactId] = currentCount + 1;
        }
      }

      return {
        chats: {
          ...state.chats,
          [contactId]: newHistory
        },
        interactionCounts: newCounts
      };
    });
  },
}));