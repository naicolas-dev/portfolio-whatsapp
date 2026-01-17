export interface Message {
  id: string;
  sender: 'me' | 'visitor'; // 'me' = Nicolas (verde), 'visitor' = Usuário (branco)
  text?: string;
  image?: string; // Opcional, para prints de projetos
  link?: { url: string; label: string }; // Opcional, para botões de ação
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

// Mapeia o ID do contato (definido em contacts.ts) para uma lista de mensagens
export const chatData: Record<string, Message[]> = {
  // ID 1: Sobre Mim
  '1': [
    {
      id: '1',
      sender: 'me',
      text: 'Opa! Tudo bem? Eu sou o Nicolas 👋',
      timestamp: '09:30',
      status: 'read'
    },
    {
      id: '2',
      sender: 'me',
      text: 'Sou Desenvolvedor Full Stack, tenho 17 anos e sou apaixonado por transformar café em código limpo (e resolver uns bugs no caminho 😅).',
      timestamp: '09:31',
      status: 'read'
    },
    {
      id: '3',
      sender: 'me',
      text: 'Atualmente estou focado no ecossistema PHP (Laravel/Filament) e no universo JS (Next.js/React).',
      timestamp: '09:31',
      status: 'read'
    },
    {
      id: '4',
      sender: 'me',
      text: 'Dá uma olhada no meu currículo ou me chama pra um café virtual! ☕',
      timestamp: '09:32',
      status: 'read'
    }
  ],
  
  // ID 2: Projetos
  '2': [
    {
      id: 'p1',
      sender: 'me',
      text: 'Aqui estão alguns dos trabalhos que me orgulho de ter feito. 👇',
      timestamp: '10:00',
      status: 'read'
    },
    {
      id: 'p2',
      sender: 'me',
      text: 'Esse é o "Frequência Certa". Um sistema PWA para gestão escolar com gamificação.',
      timestamp: '10:01',
      status: 'read'
    },
    // Aqui no futuro vamos adicionar imagem
    {
        id: 'p3',
        sender: 'me',
        text: 'Ele resolve o problema de chamadas manuais e engaja os alunos.',
        timestamp: '10:01',
        status: 'read'
    }
  ]
};