export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  type: 'about' | 'projects' | 'stack' | 'experience' | 'contact';
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Sobre Mim',
    avatar: 'https://ui-avatars.com/api/?name=Nicolas+Viana&background=008069&color=fff', // Placeholder temporário
    lastMessage: 'Oi, eu sou o Nicolas 👋',
    time: '09:30',
    unreadCount: 1,
    type: 'about'
  },
  {
    id: '2',
    name: 'Projetos',
    avatar: 'https://ui-avatars.com/api/?name=P+J&background=ffa500&color=fff',
    lastMessage: 'Confira meu último trabalho...',
    time: 'Ontem',
    unreadCount: 3,
    type: 'projects'
  },
  {
    id: '3',
    name: 'Stack & Skills',
    avatar: 'https://ui-avatars.com/api/?name=S+T&background=007bff&color=fff',
    lastMessage: 'Laravel, Next.js, Filament...',
    time: 'Segunda',
    type: 'stack'
  },
  {
    id: '4',
    name: 'Experiência',
    avatar: 'https://ui-avatars.com/api/?name=E+X&background=6f42c1&color=fff',
    lastMessage: 'Minha jornada profissional 🚀',
    time: 'Dom',
    type: 'experience'
  },
    {
    id: '5',
    name: 'Contato',
    avatar: 'https://ui-avatars.com/api/?name=C+T&background=25d366&color=fff',
    lastMessage: 'Vamos trabalhar juntos?',
    time: '15/01',
    type: 'contact'
  },
];