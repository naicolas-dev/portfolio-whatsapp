"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function ConceptScreen({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    const tl = gsap.timeline({ onComplete });

    tl.to(content.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
    })
      .to(
        container.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.2"
      );
  };

  useGSAP(
    () => {
      gsap.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] bg-[#0b141a] text-[#e9edef] flex flex-col justify-between p-8 md:p-16 overflow-hidden"
      aria-label="Portfolio concept screen"
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      <div ref={content} className="flex flex-col h-full justify-between relative z-10 max-w-5xl mx-auto w-full">
        <header className="flex flex-col gap-2 reveal-text">
          <h1 className="text-xl md:text-2xl font-mono text-[#00a884] tracking-widest uppercase">
            Nicolas Viana Alves
          </h1>

          <p className="text-sm md:text-base text-gray-400 font-light tracking-wide">
            Full-Stack Developer
          </p>

          <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-2xl">
            Portfólios estão cada vez mais parecidos: excesso de efeitos, pouca clareza e pouco conteúdo real.
            Eu fui na direção oposta.
          </p>
        </header>

        <main className="flex flex-col gap-8 my-auto">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tighter reveal-text">
            Não é só<br />
            <span className="text-[#00a884]">um portfólio.</span>
          </h2>

          <div className="flex flex-col gap-4 max-w-2xl reveal-text mt-4">
            <p className="text-lg md:text-2xl leading-relaxed text-gray-300 font-light">
              É uma conversa guiada — simples, direta e feita para você entender como eu penso e o que eu construo.
            </p>

            <p className="text-sm md:text-base text-gray-500 border-l-2 border-[#00a884] pl-4 italic">
              Eu reinterpretei a interface mais usada do Brasil para contar minha história sem enrolação.
              Cada contato é um capítulo. Cada mensagem entrega contexto, decisões e resultado.
            </p>

            <div className="mt-2 text-sm md:text-base text-gray-400 leading-relaxed">
              <span className="text-gray-300 font-medium">Stack (resumo):</span>{" "}
              Laravel • PHP 8+ • APIs REST • MySQL • Auth (Sanctum) • React/Next.js • TypeScript • Tailwind •
              Framer Motion • PWA • Firebase • Docker • Git
            </div>
          </div>
        </main>

        <footer className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 reveal-text">
          
          <div className="flex gap-4">
            <a
              href="https://github.com/naicolas-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0b141a] hover:bg-[#00a884] hover:border-[#00a884] transition-all duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/nicolas-viana-alves-40614228a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0b141a] hover:bg-[#00a884] hover:border-[#00a884] transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>

            <a
              href="mailto:naicolas.dev@gmail.com"
              aria-label="Email"
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0b141a] hover:bg-[#00a884] hover:border-[#00a884] transition-all duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>

          <button
            onClick={handleStart}
            className="group flex items-center gap-4 bg-[#00a884] hover:bg-[#008f6f] text-[#0b141a] px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,168,132,0.3)] hover:shadow-[0_0_30px_rgba(0,168,132,0.5)]"
          >
            <span>Começar a conversa</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>
      </div>
    </div>
  );
}