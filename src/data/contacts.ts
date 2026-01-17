export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  type: 'about' | 'projects' | 'stack' | 'experience' | 'contact';
  prompt: string;
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: '01. Sobre Mim',
    avatar: 'https://github.com/naicolas-dev.png',
    lastMessage: 'Me conheça melhor.',
    time: 'Hoje',
    unreadCount: 1,
    type: 'about',
    prompt: 'Olá Nicolas! Me conte mais sobre você.'
  },
  {
    id: '2',
    name: '02. Stack',
    avatar: 'https://ui-avatars.com/api/?name=JS+TS&background=0b141a&color=fff&font-size=0.4',
    lastMessage: 'Meu arsenal de Dev.',
    time: 'Hoje',
    type: 'stack',
    prompt: 'Quais são as tecnologias que você usa?'
  },
  {
    id: '3',
    name: '03. Projetos',
    avatar: 'https://ui-avatars.com/api/?name=FC&background=008069&color=fff',
    lastMessage: 'Meus projetos.',
    time: 'Hoje',
    unreadCount: 3,
    type: 'projects',
    prompt: 'Me fale sobre seus projetos.'
  },
  {
    id: '4',
    name: '04. Contato',
    avatar: 'https://ui-avatars.com/api/?name=HI&background=25d366&color=fff',
    lastMessage: 'Vamos construir algo juntos?',
    time: 'Hoje',
    type: 'contact',
    prompt: 'Como posso entrar em contato com você?'
  },
];