# Nicolas Viana Alves - Portfolio (Conversational Interface)

Uma aplicação web imersiva que reinterpreta a interface de mensageria instantânea como um dispositivo de narrativa não-linear. Este projeto vai além de um clone visual, implementando um motor de orquestração de diálogos, física de interação e animações de alta performance para criar uma experiência de "Storytelling Guiado".

O objetivo técnico foi demonstrar domínio sobre renderização no lado do cliente, gerenciamento de estado complexo e otimização de performance em interfaces ricas em movimento.

## Visão Geral da Arquitetura

O projeto foi construído sobre a premissa de que um portfólio não deve ser apenas informativo, mas experiencial. A arquitetura foi desenhada para suportar três pilares principais:

1.  **Narrativa Controlada (The Director Engine):** Um algoritmo personalizado que calcula o tempo de leitura e digitação para simular uma conversa humana natural.
2.  **Feedback Sensorial:** Uso de física de mola (Spring Physics) e manipulação direta do DOM para criar interfaces que reagem à proximidade do cursor (Magnetic UI).
3.  **Performance Visual:** Orquestração de animações pesadas utilizando GSAP para timelines complexas e Framer Motion para interações baseadas em estado, mantendo 60fps constantes.

## Preview

<img src="public/screenshot/image.png" alt="Page Preview"

## Stack Tecnológica

A escolha das tecnologias priorizou a performance de renderização e a tipagem estrita.

![Next.js](https://img.shields.io/badge/next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react_19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)

* **Core:** React 19 (RC), Next.js 16 (App Router), TypeScript.
* **Estilização:** Tailwind CSS v4.
* **Gerenciamento de Estado:** Zustand (pela arquitetura atômica e performance superior ao Context API em atualizações frequentes).
* **Motion & Animação:**
    * **GSAP (GreenSock):** Utilizado para a sequência de boot e transições de layout (Concept Screen).
    * **Framer Motion:** Utilizado para animações de lista (Stagger), física de elementos e micro-interações.
    * **Lenis:** Implementação de smooth scrolling para normalização da experiência de rolagem.
* **Áudio:** Manipulação nativa de HTML5 Audio API.

## Funcionalidades Chave e Implementação

### 1. The Director Engine (Hook Personalizado)
Localizado em `src/hooks/useChatDirector.ts`.
Ao contrário de interfaces de chat estáticas, este projeto utiliza um hook personalizado que atua como um "diretor de cena".
* Calcula dinamicamente o tempo de "digitação" baseado no comprimento da string da mensagem (algoritmo humanizado: tempo base + delay por caractere).
* Gerencia o estado de "Typing Indicator" de forma assíncrona.
* Impede o fluxo de mensagens de atropelar a leitura do usuário, inserindo pausas dramáticas calculadas.

### 2. Concept Screen & Boot Sequence
Localizado em `src/components/ConceptScreen.tsx`.
Uma camada de introdução que utiliza `GSAP Timeline` para orquestrar uma sequência de entrada complexa. A animação manipula propriedades de `clip-path` e `transform` para criar um efeito de revelação de "cortina", garantindo que a aplicação principal seja carregada em segundo plano antes da interação do usuário.

### 3. Magnetic & Fluid UI
Localizado em `src/components/MessageBubble.tsx`.
Implementação de `useSpring` e `useMotionValue` do Framer Motion para criar elementos que possuem "massa" e "resistência". Os balões de mensagem reagem à posição do mouse, criando um efeito de paralaxe sutil e feedback tátil sem comprometer a thread principal do navegador.

## Instalação e Execução

O projeto requer Node.js versão 18 ou superior.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/naicolas-br/portfolio-whatsapp.git](https://github.com/naicolas-br/portfolio-whatsapp.git)
    ```

2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

4.  Acesse a aplicação em `http://localhost:3000`.

## Estrutura do Projeto

* `src/app`: Rotas e layouts do Next.js (App Router).
* `src/components`: Componentes React modulares.
* `src/hooks`: Lógica de negócio reutilizável (incluindo o motor de chat).
* `src/store`: Gerenciamento de estado global via Zustand.
* `src/data`: Camada de dados estáticos simulando uma API de backend.

## Licença

Este projeto é desenvolvido para fins de portfólio e estudo. O código é aberto sob a licença MIT.

---
**Desenvolvido por Nicolas Viana Alves**