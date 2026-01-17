import { useState, useEffect, useRef } from 'react';
import { Message } from '@/data/chatData';
import { useChatStore } from '@/store/useChatStore';

const playMessageSound = () => {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/notification.mp3'); 
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }
};

export function useChatDirector(fullHistory: Message[], chatId: string) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const { setTyping } = useChatStore(); 
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setVisibleMessages([]); 
    
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const playNextMessage = () => {
      if (!isMounted.current || currentIndex >= fullHistory.length) {
        setTyping(false);
        return;
      }

      const msg = fullHistory[currentIndex];
      const isMe = msg.sender === 'me';

      if (isMe) {
        setTyping(true);
      
        const typingTime = 800 + (msg.text?.length || 0) * 30;
        
        timeoutId = setTimeout(() => {
          if (!isMounted.current) return;
          
          setTyping(false);
          setVisibleMessages(prev => [...prev, msg]);
          
          playMessageSound(); 

          currentIndex++;
          
          const readingPause = 1000 + (msg.text?.length || 0) * 20;
          timeoutId = setTimeout(playNextMessage, readingPause);

        }, typingTime);

      } else {
        setVisibleMessages(prev => [...prev, msg]);
        currentIndex++;
        timeoutId = setTimeout(playNextMessage, 500);
      }
    };

    timeoutId = setTimeout(playNextMessage, 600);

    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);
      setTyping(false);
    };
  }, [chatId, fullHistory, setTyping]);

  return { visibleMessages };
}