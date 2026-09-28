"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = size === "sm" ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-xl";
  const iconSize = size === "sm" ? 14 : 16;

  if (!mounted) {
    return (
      <div
        className={cn(
          "shrink-0 border border-zinc-200/60 bg-white/40 dark:border-zinc-800/60 dark:bg-zinc-900/40",
          sizeClasses,
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={cn(
        "flex shrink-0 items-center justify-center transition-all duration-200 select-none",
        "border border-zinc-200/90 bg-white/90 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-900",
        "dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white",
        "shadow-2xs active:scale-95",
        sizeClasses,
        className
      )}
      title={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
      aria-label={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
    >
      {isDark ? (
        <Sun size={iconSize} className="text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon size={iconSize} className="text-zinc-700 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
