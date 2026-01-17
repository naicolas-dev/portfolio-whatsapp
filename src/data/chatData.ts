export interface Message {
  id: string;
  sender: 'me' | 'visitor';
  text?: string;
  image?: string;
  link?: { url: string; label: string };
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  shown?: boolean;
}

export const chatData: Record<string, Message[]> = {

  // CAPÍTULO 1: A ORIGEM
  '1': [
    { id: '1', sender: 'me', text: 'Olá! Eu me chamo Nicolas. 👋', timestamp: '09:00', status: 'read' },
    { id: '2', sender: 'me', text: 'Muita gente acha que programar é só digitar código, rolar o mouse e encarar letras coloridas...', timestamp: '09:00', status: 'read' },
    { id: '3', sender: 'me', text: 'Mas para mim, é sobre resolver problemas complexos, como se fosse um grande quebra-cabeças 🧩', timestamp: '09:01', status: 'read' },
    { id: '4', sender: 'me', text: 'Tenho 17 anos, sou focado em Laravel e Next.js, e obcecado por interfaces que entregam uma experiência imersiva digital.', timestamp: '09:02', status: 'read' }
  ],
  
  // CAPÍTULO 2: O ARSENAL (STACK)
  '2': [
    { id: 's1', sender: 'me', text: 'Não uso ferramentas só porque são "hype". Escolho o que resolve o problema com estilo e fluidez. 🛠️', timestamp: '10:00', status: 'read' },
    { id: 's2', sender: 'me', text: 'No Front-end, minha escolha é Next.js + Tailwind + Framer Motion para experiências imersivas e animadas (como essa).', timestamp: '10:01', status: 'read' },
    { id: 's3', sender: 'me', text: 'No Back-end, o Laravel é minha casa. Segurança, robustez e elegância.', timestamp: '10:02', status: 'read' },
    { id: 's4', sender: 'me', text: 'Trabalho com Laravel, React/Next.js, APIs, bancos de dados, autenticação, PWA, Firebase, Docker e Git — mas meu foco nunca foi a stack em si, e sim construir produtos rápidos, escaláveis e com UX que dá vontade de usar. ', timestamp: '10:03', status: 'read' },
    { id: 's5', sender: 'me', text: 'E claro, estou sempre explorando novas ferramentas e tecnologias como as LLMs 🤖. ', timestamp: '10:03', status: 'read' }
  ],

  // CAPÍTULO 3: PROJETOS
'3': [
  {
    id: 'p1',
    sender: 'me',
    text: 'Projetos, para mim, não são só código — são respostas para problemas reais.',
    timestamp: '14:00',
    status: 'read'
  },
  {
    id: 'p2',
    sender: 'me',
    text: 'Vou te mostrar alguns dos que mais representam como eu penso e construo software.',
    timestamp: '14:01',
    status: 'read'
  },

  // ───────── PROJETO ÂNCORA ─────────
  {
    id: 'p3',
    sender: 'me',
    text: '🎓 *Frequência Certa* nasceu para resolver um problema sério: evasão escolar.',
    timestamp: '14:02',
    status: 'read'
  },
  {
    id: 'p4',
    sender: 'me',
    text: 'É um PWA gamificado onde alunos acompanham presença em tempo real e evitam reprovação — inclusive em programas como o Pé-de-Meia.',
    timestamp: '14:03',
    status: 'read'
  },
  {
    id: 'p5',
    sender: 'me',
    text: 'Stack: Laravel 12, PHP 8.2, Tailwind, Alpine.js e arquitetura pensada para escala.',
    timestamp: '14:04',
    status: 'read'
  },
  {
    id: 'p6',
    sender: 'me',
    text: 'Quer ver como isso foi arquitetado por dentro?',
    link: {
      url: 'https://github.com/naicolas-dev/frequencia-certa',
      label: 'Ver Frequência Certa'
    },
    timestamp: '14:05',
    status: 'read'
  },

  // ───────── SEGUNDO PROJETO ─────────
  {
    id: 'p7',
    sender: 'me',
    text: '💸 Também criei um *Dashboard Financeiro* focado em dados em tempo real.',
    timestamp: '14:06',
    status: 'read'
  },
  {
    id: 'p8',
    sender: 'me',
    text: 'Uma SPA em React com Firebase, onde cada alteração reflete instantaneamente na UI.',
    timestamp: '14:07',
    status: 'read'
  },
  {
    id: 'p9',
    sender: 'me',
    text: 'O foco aqui foi UX fluida, gráficos claros e arquitetura simples.',
    timestamp: '14:08',
    status: 'read'
  },
  {
    id: 'p10',
    sender: 'me',
    link: {
      url: 'https://github.com/naicolas-dev/dashboard-financeiro-irt',
      label: 'Ver Dashboard Financeiro'
    },
    text: 'Código disponível aqui 👇',
    timestamp: '14:09',
    status: 'read'
  },

  // ───────── FECHAMENTO ─────────
  {
    id: 'p11',
    sender: 'me',
    text: 'Além desses, já construí APIs, sistemas Kanban, dashboards e soluções corporativas.',
    timestamp: '14:10',
    status: 'read'
  },
  {
    id: 'p12',
    sender: 'me',
    text: 'Prefiro te mostrar tudo organizado em um só lugar.',
    link: {
      url: 'https://github.com/naicolas-dev?tab=repositories',
      label: 'Ver todos os projetos no GitHub'
    },
    timestamp: '14:11',
    status: 'read'
  }
]
,

  // CAPÍTULO 4: CONTATO
  '4': [
    { 
      id: 'c1', 
      sender: 'me', 
      text: 'Se você chegou até aqui, já sabe como eu penso e o que posso construir.', 
      timestamp: '16:00', 
      status: 'read' 
    },
    { 
      id: 'c2', 
      sender: 'me', 
      text: 'Estou pronto para transformar café em código no seu time. Vamos conversar? ☕', 
      timestamp: '16:01', 
      status: 'read' 
    },
    
    // GITHUB
    { 
      id: 'c3', 
      sender: 'me', 
      text: 'Explore meus códigos e contribuições:', 
      link: { url: 'https://github.com/naicolas-dev', label: 'Acessar GitHub' },
      timestamp: '16:02', 
      status: 'read' 
    },

    // LINKEDIN
    { 
      id: 'c4', 
      sender: 'me', 
      text: 'Conecte-se comigo profissionalmente:', 
      link: { url: 'https://www.linkedin.com/in/nicolas-viana-alves-40614228a/', label: 'Acessar LinkedIn' },
      timestamp: '16:03', 
      status: 'read' 
    },

    // EMAIL
    { 
      id: 'c5', 
      sender: 'me', 
      text: 'Ou se preferir, manda um email direto:', 
      link: { url: 'mailto:naicolas.dev@gmail.com', label: 'Enviar Email' },
      timestamp: '16:04', 
      status: 'read' 
    }
  ]
};