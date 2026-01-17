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
  // CAPÍTULO 1: A ORIGEM
  '1': [
    { id: '1', sender: 'me', text: 'Olá! Eu sou o Nicolas. 👋', timestamp: '09:00', status: 'read' },
    { id: '2', sender: 'me', text: 'Muita gente acha que programar é só digitar código...', timestamp: '09:00', status: 'read' },
    { id: '3', sender: 'me', text: 'Mas para mim, é sobre resolver quebra-cabeças complexos. 🧩', timestamp: '09:01', status: 'read' },
    { id: '4', sender: 'me', text: 'Tenho 17 anos, sou focado em Laravel e Next.js, e obcecado por interfaces que parecem mágica.', timestamp: '09:01', status: 'read' }
  ],
  
  // CAPÍTULO 2: O ARSENAL (STACK)
  '2': [
    { id: 's1', sender: 'me', text: 'Não uso ferramentas só porque são "hype". Escolho o que resolve o problema. 🛠️', timestamp: '10:00', status: 'read' },
    { id: 's2', sender: 'me', text: 'No Front-end, minha escolha é Next.js + Tailwind + Framer Motion para experiências fluidas (como essa aqui).', timestamp: '10:01', status: 'read' },
    { id: 's3', sender: 'me', text: 'No Back-end, o Laravel é minha casa. Segurança, robustez e elegância.', timestamp: '10:02', status: 'read' },
    { id: 's4', sender: 'me', text: 'E claro, estou sempre explorando IA com Hugging Face. 🤖', timestamp: '10:03', status: 'read' }
  ],

  // CAPÍTULO 3: FREQUÊNCIA CERTA (PROJETO)
  '3': [
    { id: 'p1', sender: 'me', text: 'Sabe qual o maior problema das escolas hoje? A evasão. 📉', timestamp: '14:00', status: 'read' },
    { id: 'p2', sender: 'me', text: 'Criei o "Frequência Certa" para mudar isso.', timestamp: '14:01', status: 'read' },
    { id: 'p3', sender: 'me', text: 'É um PWA gamificado onde alunos ganham recompensas por presença. Não é só um app, é uma estratégia de engajamento.', timestamp: '14:02', status: 'read' },
    { 
      id: 'p4', 
      sender: 'me', 
      text: 'O código é open source. Quer dar uma olhada na arquitetura?', 
      link: { url: 'https://github.com/naicolas-br', label: 'Ver Repositório' },
      timestamp: '14:03', 
      status: 'read' 
    }
  ],

  // CAPÍTULO 4: CONTATO
  '4': [
    { id: 'c1', sender: 'me', text: 'Se você chegou até aqui, já sabe como eu penso.', timestamp: '16:00', status: 'read' },
    { id: 'c2', sender: 'me', text: 'Estou pronto para o próximo desafio. Bora conversar?', timestamp: '16:01', status: 'read' },
    { 
      id: 'c3', 
      sender: 'me', 
      text: 'Me chama no LinkedIn ou manda um "Oi" aqui mesmo.', 
      link: { url: 'https://linkedin.com/in/seu-linkedin', label: 'Acessar LinkedIn' },
      timestamp: '16:02', 
      status: 'read' 
    }
  ]
};