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
  const { setTyping, setSpeaking, markMessageAsShown } = useChatStore();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    if (fullHistory) {
        setVisibleMessages(fullHistory.filter(m => m.shown));
    }
    setTyping(false);
    setSpeaking(false);

    return () => { isMounted.current = false; };
  }, [chatId]);

  useEffect(() => {
    if (!fullHistory) return;
    
    setVisibleMessages(prev => {
        const missingMessages = fullHistory.filter(
            msg => msg.shown && !prev.some(p => p.id === msg.id)
        );

        if (missingMessages.length === 0) return prev;

        return [...prev, ...missingMessages];
    });
  }, [fullHistory]); 

  useEffect(() => {
    if (!fullHistory || fullHistory.length === 0) return;

    const nextMsg = fullHistory.find(m => !m.shown);

    if (!nextMsg) {
        setTyping(false);
        setSpeaking(false);
        return;
    }

    setSpeaking(true); 

    const isMe = nextMsg.sender === 'me';
    let timeoutId: NodeJS.Timeout;

    const playSequence = () => {
        if (!isMounted.current) return;

        setVisibleMessages(prev => {
            if (prev.find(m => m.id === nextMsg.id)) return prev;
            return [...prev, nextMsg];
        });

        if (isMe) playMessageSound();

        const readingPause = isMe 
            ? 500 + (nextMsg.text?.length || 0) * 8
            : 50; 
            
        timeoutId = setTimeout(() => {
            if (isMounted.current) {
                markMessageAsShown(chatId, nextMsg.id);
            }
        }, readingPause);
    };

    const typingTime = isMe 
        ? 300 + (nextMsg.text?.length || 0) * 10 
        : 50;

    if (isMe) setTyping(true);

    timeoutId = setTimeout(() => {
        setTyping(false);
        playSequence();
    }, typingTime);

    return () => {
        clearTimeout(timeoutId);
    };

  }, [fullHistory, chatId, markMessageAsShown, setTyping, setSpeaking]);

  return { visibleMessages };
}