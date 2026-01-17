import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Vamos controlar o dark mode manualmente ou via sistema
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          // Light Mode
          teal: "#008069",
          light: "#f0f2f5", // Fundo geral
          "chat-bg": "#efeae2", // Fundo do chat com doodles (vamos adicionar a imagem depois)
          "message-out": "#dcf8c6", // Balão verde (enviado)
          "message-in": "#ffffff", // Balão branco (recebido)
          
          // Dark Mode (Cores oficiais do WA Dark)
          "dark-bg": "#111b21", // Fundo geral escuro
          "dark-header": "#202c33", // Sidebar/Header
          "dark-message-out": "#005c4b", // Balão verde escuro
          "dark-message-in": "#202c33", // Balão cinza escuro
          "accent": "#00a884", // O verde brilhante de botões/ícones no dark
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'], // WhatsApp usa fontes do sistema, mas Helvetica é a base
      },
      backgroundImage: {
        'chat-pattern-light': "url('/assets/whatsapp-bg-light.png')", // Vamos adicionar depois
        'chat-pattern-dark': "url('/assets/whatsapp-bg-dark.png')",
      }
    },
  },
  plugins: [],
};
export default config;