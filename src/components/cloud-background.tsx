"use client";

import React, { useEffect, useState } from "react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { useTheme } from "@/components/theme-provider";

export function CloudBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showClouds, setShowClouds] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Só inicia o WebGL depois do primeiro paint, para não bloquear o carregamento.
    const start = () => setShowClouds(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 pointer-events-none select-none overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#080813" : "#A0BDDB",
      }}
    >
      {/* Camada 1: Nuvens aceternity passando ao fundo com 50% de opacidade */}
      <div className="absolute inset-0 opacity-50">
        {showClouds && (
          <CloudShader
            className="w-full h-full min-h-0"
            speed={0.65}
            count={5}
            skyTopColor={isDark ? "#080813" : "#A0BDDB"}
            skyBottomColor={isDark ? "#05050d" : "#8AAECB"}
            cloudColor={isDark ? "#1c1c2e" : "#ffffff"}
          />
        )}
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
