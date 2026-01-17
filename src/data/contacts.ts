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
    name: '01. Sobre Mim',
    avatar: 'https://github.com/naicolas-dev.png',
    lastMessage: 'Me conheça melhor.',
    time: '09:00',
    unreadCount: 1,
    type: 'about'
  },
  {
    id: '2',
    name: '02. Stack', // Era "Stack"
    avatar: 'https://ui-avatars.com/api/?name=JS+TS&background=0b141a&color=fff&font-size=0.4',
    lastMessage: 'Meu arsenal de Dev.',
    time: 'Ontem',
    type: 'stack'
  },
  {
    id: '3',
    name: '03. Projetos', // Era "Projetos" (Frequência Certa)
    avatar: 'https://ui-avatars.com/api/?name=FC&background=008069&color=fff',
    lastMessage: 'Meus projetos.',
    time: 'Segunda',
    unreadCount: 3,
    type: 'projects'
  },
  {
    id: '4',
    name: '04. Contato', // Era "Contato"
    avatar: 'https://ui-avatars.com/api/?name=HI&background=25d366&color=fff',
    lastMessage: 'Vamos construir algo juntos?',
    time: '15/01',
    type: 'contact'
  },
];