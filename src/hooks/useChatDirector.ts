import { useState, useEffect, useRef } from 'react';
import { Message } from '@/data/chatData';
import { useChatStore } from '@/store/useChatStore';

export function useChatDirector(fullHistory: Message[], chatId: string) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const { setTyping } = useChatStore(); // Vamos precisar expor o setTyping na store ou usar local
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setVisibleMessages([]); // Reseta ao mudar de chat (Capítulo)
    
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const playNextMessage = () => {
      if (!isMounted.current || currentIndex >= fullHistory.length) {
        setTyping(false);
        return;
      }

      const msg = fullHistory[currentIndex];
      const isMe = msg.sender === 'me'; // Nicolas falando

      if (isMe) {
        // MOMENTO DRAMÁTICO: Nicolas está digitando...
        setTyping(true);
        
        // Calcula tempo de digitação baseado no tamanho do texto (Humanize)
        // Mínimo 1s, + 30ms por caractere
        const typingTime = 800 + (msg.text?.length || 0) * 30;
        
        timeoutId = setTimeout(() => {
          if (!isMounted.current) return;
          
          setTyping(false);
          setVisibleMessages(prev => [...prev, msg]);
          
          // Tocar som aqui (opcional)
          // playMessageSound();

          currentIndex++;
          // Pausa para o usuário ler antes da próxima
          const readingPause = 1000 + (msg.text?.length || 0) * 20;
          timeoutId = setTimeout(playNextMessage, readingPause);

        }, typingTime);

      } else {
        // Mensagem do visitante ou sistema (aparece instantâneo)
        setVisibleMessages(prev => [...prev, msg]);
        currentIndex++;
        timeoutId = setTimeout(playNextMessage, 500);
      }
    };

    // Pequeno delay inicial para dar "ar" ao entrar no capítulo
    timeoutId = setTimeout(playNextMessage, 600);

    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);
      setTyping(false);
    };
  }, [chatId, fullHistory, setTyping]);

  return { visibleMessages };
}