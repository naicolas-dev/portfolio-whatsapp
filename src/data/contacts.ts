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
    name: 'Nicolas Viana', // Seu "Perfil" principal
    avatar: 'https://github.com/naicolas-dev.png',
    lastMessage: '📸 Foto', // Simulando que mandou uma mídia
    time: '09:30',
    unreadCount: 1,
    type: 'about'
  },
  {
    id: '2',
    name: 'Frequência Certa 🎓', // Destaque para o TCC
    avatar: 'https://ui-avatars.com/api/?name=F+C&background=008069&color=fff',
    lastMessage: 'Novo commit no repositório! 🚀',
    time: 'Ontem',
    unreadCount: 3,
    type: 'projects'
  },
  {
    id: '3',
    name: 'Stack & Tech',
    avatar: 'https://ui-avatars.com/api/?name=JS+PHP&background=3b82f6&color=fff',
    lastMessage: 'Laravel, Next.js, Filament...',
    time: 'Segunda',
    type: 'stack'
  },
  {
    id: '4',
    name: 'Contato Profissional',
    avatar: 'https://ui-avatars.com/api/?name=C+T&background=25d366&color=fff',
    lastMessage: 'Vamos agendar uma reunião?',
    time: '15/01',
    type: 'contact'
  },
];