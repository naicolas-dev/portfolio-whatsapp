import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicolas | Full Stack Developer",
  description: "Portfólio interativo estilo WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-whatsapp-light dark:bg-whatsapp-dark-bg text-gray-900 dark:text-gray-100 overflow-hidden h-screen w-screen">
        {/* O overflow-hidden aqui é vital porque o app se comporta como uma "janela" e não um site longo com scroll na janela inteira */}
        {children}
      </body>
    </html>
  );
}