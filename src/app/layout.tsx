import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

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
      <body className="bg-wa-light-bg dark:bg-wa-dark-bg text-wa-primary dark:text-[#e9edef] overflow-hidden h-screen w-screen">
        <SmoothScrolling>
            {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}