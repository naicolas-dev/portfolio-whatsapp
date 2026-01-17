export interface Message {
  id: string;
  sender: 'me' | 'visitor';
  text?: string;
  image?: string;
  link?: { url: string; label: string };
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export const chatData: Record<string, Message[]> = {
  // 1. SOBRE MIM (NICOLAS)
  '1': [
    {
      id: '1',
      sender: 'me',
      text: 'Fala! Eu sou o Nicolas Viana 👋',
      timestamp: '09:30',
      status: 'read'
    },
    {
      id: '2',
      sender: 'me',
      text: 'Tenho 17 anos e sou estudante do Técnico em Desenvolvimento de Sistemas na Proz Educação.',
      timestamp: '09:31',
      status: 'read'
    },
    {
      id: '3',
      sender: 'me',
      text: 'Sou apaixonado por Back-end (PHP/Laravel), mas também me aventuro forte no Front com Next.js e Tailwind.',
      timestamp: '09:31',
      status: 'read'
    },
    {
        id: '4',
        sender: 'me',
        text: 'Atualmente buscando minha primeira oportunidade de estágio para transformar café em código! ☕💻',
        timestamp: '09:32',
        status: 'read'
      }
  ],
  
  // 2. PROJETO DESTAQUE (FREQUÊNCIA CERTA)
  '2': [
    {
      id: 'p1',
      sender: 'me',
      text: 'Esse é o meu xodó: o "Frequência Certa" 🏫',
      timestamp: '10:00',
      status: 'read'
    },
    {
      id: 'p2',
      sender: 'me',
      text: 'É um sistema PWA de gestão escolar focado em resolver o problema da evasão e facilitar a chamada.',
      timestamp: '10:01',
      status: 'read'
    },
    {
        id: 'p3',
        sender: 'me',
        text: 'Tecnologias: Laravel (API), Filament (Admin), PWA features e Gamificação para engajar os alunos.',
        timestamp: '10:02',
        status: 'read'
    },
    {
        id: 'p4',
        sender: 'me',
        text: 'Dá uma olhada no repo: https://github.com/naicolas-dev', // Link placeholder
        timestamp: '10:03',
        status: 'read'
    }
  ],

  // 3. STACK TÉCNICA
  '3': [
      {
        id: 's1',
        sender: 'me',
        text: 'Aqui está meu arsenal técnico 🛠️',
        timestamp: '08:00',
        status: 'read'
      },
      {
        id: 's2',
        sender: 'me',
        text: '🔹 *Back-end:* PHP 8, Laravel, FilamentPHP, MySQL\n🔹 *Front-end:* React, Next.js, Tailwind CSS, Alpine.js\n🔹 *Tools:* Git, Docker, Insomnia',
        timestamp: '08:01',
        status: 'read'
      },
      {
        id: 's3',
        sender: 'me',
        text: 'Também tenho experiência integrando IAs (Hugging Face API) em aplicações web.',
        timestamp: '08:02',
        status: 'read'
      }
  ],

  // 4. CONTATO
  '4': [
      {
        id: 'c1',
        sender: 'me',
        text: 'Curtiu o portfólio? Bora bater um papo!',
        timestamp: '11:00',
        status: 'read'
      },
      {
        id: 'c2',
        sender: 'me',
        text: 'Você pode me encontrar no LinkedIn ou ver meus códigos no GitHub.',
        timestamp: '11:01',
        status: 'read'
      }
  ]
};