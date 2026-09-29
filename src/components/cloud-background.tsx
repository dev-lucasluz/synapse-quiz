"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

/**
 * Fundo de céu com nuvens leves: imagens pré-renderizadas que flutuam devagar via CSS
 * (transform, animado pelo compositor do navegador, sem JavaScript e sem WebGL).
 * Substitui o antigo shader de nuvens, que travava a página em celulares e sem GPU.
 * A animação é desligada para quem prefere movimento reduzido (veja globals.css).
 */
const CLOUDS = [
  { src: "/images/sky/cloud-1.webp", top: "4%", width: "64vw", duration: 190, delay: -60, opacity: 0.55 },
  { src: "/images/sky/cloud-2.webp", top: "26%", width: "46vw", duration: 260, delay: -170, opacity: 0.5 },
  { src: "/images/sky/cloud-3.webp", top: "50%", width: "72vw", duration: 320, delay: -100, opacity: 0.45 },
  { src: "/images/sky/cloud-2.webp", top: "72%", width: "42vw", duration: 230, delay: -30, opacity: 0.4 },
];

export function CloudBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : false;
  const cloudColor = isDark ? "#1c1c2e" : "#ffffff";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 pointer-events-none select-none overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#080813" : "#A0BDDB",
      }}
    >
      {/* Camada 1: nuvens flutuando ao fundo */}
      <div className="absolute inset-0">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="sky-cloud"
            style={{
              top: c.top,
              width: c.width,
              opacity: c.opacity,
              backgroundColor: cloudColor,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
              WebkitMaskImage: `url(${c.src})`,
              maskImage: `url(${c.src})`,
            }}
          />
        ))}
      </div>

      {/* Camada 2: Gradiente difuso e vinheta de iluminação das imagens de referência */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 85% 65% at 50% 20%, rgba(25, 25, 55, 0.35) 0%, rgba(8, 8, 19, 0.75) 100%)`
            : `radial-gradient(ellipse 85% 65% at 50% 20%, rgba(255, 255, 255, 0.20) 0%, rgba(145, 175, 205, 0.35) 100%)`,
        }}
      />

      {/* Camada 3: Textura fosca / film grain suave por cima das nuvens */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23noise)' opacity='0.75'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
