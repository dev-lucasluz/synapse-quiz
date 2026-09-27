"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Brain, BookOpen, LayoutDashboard, LogOut, Share2, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
  userName?: string;
  plan?: string;
}

export function Navbar({ userName, plan }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz Diário", icon: Brain },
    { href: "/notebook", label: "Caderno de Erros", icon: BookOpen },
    { href: "/referral", label: "Indicações", icon: Share2 },
    { href: "/pricing", label: "Planos", icon: Zap },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-teal-700 dark:text-teal-400">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white dark:bg-teal-600">
            <Brain size={18} />
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Synapse <span className="text-teal-700 dark:text-teal-400">Quiz</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950/70 dark:text-teal-400 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                <Icon size={14} className={isActive ? "text-teal-700 dark:text-teal-400" : "text-zinc-400 dark:text-zinc-500"} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {plan === "pro" && (
            <Link
              href="/pricing"
              className="hidden items-center gap-1 rounded-full bg-teal-700 px-2.5 py-0.5 text-[11px] font-semibold text-white hover:bg-teal-800 dark:bg-teal-600 md:flex"
            >
              <Zap size={10} /> PRO
            </Link>
          )}
          {plan === "free" && (
            <Link
              href="/pricing"
              className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 hover:border-zinc-300 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 md:flex"
            >
              Upgrade
            </Link>
          )}
          {userName && (
            <span className="hidden text-xs text-zinc-600 dark:text-zinc-400 md:block max-w-[120px] truncate">
              {userName}
            </span>
          )}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-label="Alternar tema"
            title={theme === "dark" ? "Alternar para tema claro" : "Alternar para tema escuro"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={handleLogout}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-red-900 dark:hover:bg-red-950/50 dark:hover:text-red-400"
            aria-label="Sair"
            title="Encerrar sessão"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex items-center justify-around border-t border-zinc-200 px-2 py-1 md:hidden dark:border-zinc-800">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors",
                isActive
                  ? "text-teal-700 font-semibold dark:text-teal-400"
                  : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              <Icon size={16} />
              <span>{label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
