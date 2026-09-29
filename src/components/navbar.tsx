"use client";

import { SynapseMark, SynapseWordmark } from "@/components/brand-logo";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  Sun,
  Moon,
  Brain,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Share2,
  Zap,
  Target,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Trophy,
} from "lucide-react";
import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
  userName?: string;
  plan?: string;
  avatarUrl?: string | null;
  college?: string | null;
  period?: string | null;
}

export function Navbar({ userName, plan, avatarUrl, college, period }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Estado local para reatividade imediata sem necessidade de F5
  const [currentName, setCurrentName] = useState(userName);
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);
  const [currentCollege, setCurrentCollege] = useState(college);
  const [currentPeriod, setCurrentPeriod] = useState(period);
  const [currentPlan, setCurrentPlan] = useState(plan);

  useEffect(() => {
    setCurrentName(userName);
  }, [userName]);

  useEffect(() => {
    setCurrentAvatar(avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    setCurrentCollege(college);
  }, [college]);

  useEffect(() => {
    setCurrentPeriod(period);
  }, [period]);

  useEffect(() => {
    setCurrentPlan(plan);
  }, [plan]);

  // Listener para atualização instantânea quando o perfil é salvo em /profile
  useEffect(() => {
    function handleProfileUpdated(e: Event) {
      const customEvent = e as CustomEvent<{
        name?: string;
        avatarUrl?: string | null;
        college?: string | null;
        period?: string | null;
        plan?: string;
      }>;
      if (customEvent.detail) {
        if (customEvent.detail.name) setCurrentName(customEvent.detail.name);
        if (customEvent.detail.avatarUrl !== undefined) setCurrentAvatar(customEvent.detail.avatarUrl);
        if (customEvent.detail.college !== undefined) setCurrentCollege(customEvent.detail.college);
        if (customEvent.detail.period !== undefined) setCurrentPeriod(customEvent.detail.period);
        if (customEvent.detail.plan !== undefined) setCurrentPlan(customEvent.detail.plan);
      }
    }

    window.addEventListener("synapse:profile-updated", handleProfileUpdated);
    return () => {
      window.removeEventListener("synapse:profile-updated", handleProfileUpdated);
    };
  }, []);

  // Busca dados de perfil automaticamente caso não tenham sido passados por props
  useEffect(() => {
    if (!userName && !avatarUrl) {
      fetch("/api/auth/me")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) {
            setCurrentName(data.user.name);
            setCurrentAvatar(data.user.avatarUrl);
            setCurrentCollege(data.user.college);
            setCurrentPeriod(data.user.period);
            setCurrentPlan(data.user.plan);
          }
        })
        .catch(() => {});
    }
  }, [userName, avatarUrl]);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("has-sidebar");
    try {
      const saved = localStorage.getItem("synapse_sidebar_collapsed") === "true";
      setIsCollapsed(saved);
      if (saved) {
        document.documentElement.classList.add("sidebar-collapsed");
      } else {
        document.documentElement.classList.remove("sidebar-collapsed");
      }
    } catch {
      // ignore localStorage errors
    }

    return () => {
      document.body.classList.remove("has-sidebar");
    };
  }, []);

  function toggleCollapse() {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("synapse_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      if (next) {
        document.documentElement.classList.add("sidebar-collapsed");
      } else {
        document.documentElement.classList.remove("sidebar-collapsed");
      }
      return next;
    });
  }

  function expandSidebar() {
    setIsCollapsed(false);
    try {
      localStorage.setItem("synapse_sidebar_collapsed", "false");
    } catch {
      // ignore
    }
    document.documentElement.classList.remove("sidebar-collapsed");
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", shortLabel: "Dash", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz Diário", shortLabel: "Quiz", icon: Brain },
    { href: "/ranking", label: "Ranking", shortLabel: "Ranking", icon: Trophy },
    { href: "/notebook", label: "Caderno", shortLabel: "Caderno", icon: BookOpen },
    { href: "/simulation", label: "Simulado", shortLabel: "Simulado", icon: Target, isPro: true },
    { href: "/profile", label: "Meu Perfil", shortLabel: "Perfil", icon: User },
    { href: "/referral", label: "Indicações", shortLabel: "Indicar", icon: Share2 },
    { href: "/pricing", label: "Plano PRO", shortLabel: "PRO", icon: Zap, badge: "Em Breve" },
  ];

  const mobileNavLinks = [
    { href: "/dashboard", label: "Dashboard", shortLabel: "Dash", icon: LayoutDashboard },
    { href: "/quiz", label: "Quiz Diário", shortLabel: "Quiz", icon: Brain },
    { href: "/ranking", label: "Ranking", shortLabel: "Ranking", icon: Trophy },
    { href: "/notebook", label: "Caderno", shortLabel: "Caderno", icon: BookOpen },
    { href: "/simulation", label: "Simulado", shortLabel: "Simulado", icon: Target, isPro: true },
    { href: "/profile", label: "Meu Perfil", shortLabel: "Perfil", icon: User },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          DESKTOP: Collapsible Left Lateral Sidebar
         ═══════════════════════════════════════════════════════════════════════ */}
      <aside
        onClick={() => {
          if (mounted && isCollapsed) {
            expandSidebar();
          }
        }}
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 hidden flex-col border-r border-zinc-200 bg-white select-none dark:border-zinc-800 dark:bg-zinc-900 md:flex",
          "transition-[width] duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[width] transform-gpu",
          mounted && isCollapsed ? "w-[68px] cursor-pointer" : "w-60"
        )}
      >
        {/* ── Top Header / Brand ───────────────────────────────────────────── */}
        <div className="relative flex h-14 shrink-0 items-center border-b border-zinc-100 px-3.5 dark:border-zinc-800/80">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-2.5 font-bold text-orange-600 dark:text-amber-400"
            title="Synapse Quiz"
          >
            <SynapseMark className="h-8 w-auto shrink-0 transition-transform hover:scale-105" />
            <span
              className={cn(
                "whitespace-nowrap text-sm font-semibold tracking-tight text-zinc-900 transition-all duration-200 dark:text-zinc-50 overflow-hidden",
                mounted && isCollapsed
                  ? "max-w-0 opacity-0 pointer-events-none"
                  : "max-w-[140px] opacity-100"
              )}
            >
              <SynapseWordmark className="h-[18px] w-auto" />
            </span>
          </Link>

          {/* Botão de alternar recolher/expandir montado na borda lateral (top-7, -right-3) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
            className="absolute -right-3 top-7 z-50 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md border border-zinc-200/90 bg-white text-zinc-500 shadow-xs transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
            title={mounted && isCollapsed ? "Expandir barra lateral" : "Recolher menu lateral"}
            aria-label={mounted && isCollapsed ? "Expandir barra lateral" : "Recolher menu lateral"}
          >
            {mounted && isCollapsed ? (
              <PanelLeftOpen size={13} />
            ) : (
              <PanelLeftClose size={13} />
            )}
          </button>
        </div>

        {/* ── Minimalist Theme Selector (Between Brand and Dashboard) ────── */}
        <div className="relative flex h-11 shrink-0 items-center border-b border-zinc-100 px-3.5 dark:border-zinc-800/60 overflow-hidden">
          {/* Botão de tema recolhido (ícone único centralizado) */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
              mounted && isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              title={theme === "dark" ? "Alternar para tema claro" : "Alternar para tema escuro"}
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
            </button>
          </div>

          {/* Seletor de tema expandido (Tema + Claro/Escuro pills) */}
          <div
            className={cn(
              "flex w-full items-center justify-between transition-opacity duration-200",
              mounted && isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-200 whitespace-nowrap">
              Tema
            </span>
            <div className="inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-100/90 p-0.5 dark:border-zinc-700/60 dark:bg-zinc-800/80 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (theme === "dark") toggleTheme();
                }}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors duration-150",
                  theme !== "dark"
                    ? "bg-white font-semibold text-zinc-800 shadow-2xs dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-white"
                )}
                title="Ativar tema claro"
              >
                <Sun size={11} className={theme !== "dark" ? "text-amber-500" : ""} />
                <span>Claro</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (theme !== "dark") toggleTheme();
                }}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors duration-150",
                  theme === "dark"
                    ? "bg-zinc-700 font-semibold text-zinc-100 shadow-2xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-white"
                )}
                title="Ativar tema escuro"
              >
                <Moon size={11} className={theme === "dark" ? "text-amber-400" : ""} />
                <span>Escuro</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Navigation Links ─────────────────────────────────────────────── */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3.5 py-3">
          {navLinks.map(({ href, label, icon: Icon, isPro, badge }) => {
            const isActive = pathname === href;

            return (
              <div key={href} className="group relative">
                <Link
                  href={href}
                  className={cn(
                    "flex h-10 w-full items-center rounded-xl border text-xs font-medium transition-colors duration-150 px-2.5 overflow-hidden",
                    isActive
                      ? "border-amber-200 bg-amber-50/90 font-semibold text-amber-900 shadow-2xs ring-1 ring-amber-500/15 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300"
                      : "border-zinc-200/70 bg-white/50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50/80 hover:text-zinc-900 dark:border-zinc-800/80 dark:bg-zinc-900/30 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                  )}
                  title={mounted && isCollapsed ? label : undefined}
                >
                  <Icon
                    size={17}
                    className={cn(
                      "shrink-0 transition-transform duration-150 group-hover:scale-105",
                      isActive
                        ? "text-orange-600 dark:text-amber-400"
                        : "text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-300 dark:group-hover:text-white"
                    )}
                  />

                  {/* Label com animação suave de max-width e opacidade */}
                  <span
                    className={cn(
                      "truncate whitespace-nowrap transition-all duration-200",
                      mounted && isCollapsed
                        ? "max-w-0 opacity-0 overflow-hidden pointer-events-none ml-0"
                        : "max-w-[125px] opacity-100 ml-2.5"
                    )}
                  >
                    {label}
                  </span>

                  {/* Badges laterais com fade suave */}
                  <div
                    className={cn(
                      "ml-auto flex items-center shrink-0 transition-opacity duration-200",
                      mounted && isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}
                  >
                    {isPro && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        PRO
                      </span>
                    )}
                    {badge && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                        {badge}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Floating tooltip when collapsed */}
                {mounted && isCollapsed && (
                  <div className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 hidden -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white shadow-xl group-hover:flex dark:bg-zinc-100 dark:text-zinc-900">
                    <span>{label}</span>
                    {isPro && (
                      <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-300 dark:text-amber-700">
                        PRO
                      </span>
                    )}
                    {badge && (
                      <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-300 dark:text-amber-700">
                        {badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Bottom Section / Profile & Logout ────────────────────────────── */}
        <div className="relative shrink-0 border-t border-zinc-100 p-2.5 dark:border-zinc-800/80 overflow-hidden">
          {/* Visual recolhido: Avatar centralizado + Botão de logout compacto */}
          <div
            className={cn(
              "flex flex-col items-center gap-2 transition-opacity duration-200",
              mounted && isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-x-2.5 top-2.5"
            )}
          >
            {/* User avatar with hover tooltip */}
            <div className="group relative">
              <Link
                href="/profile"
                onClick={(e) => e.stopPropagation()}
                className="block transition-transform hover:scale-105"
                title={currentName || "Meu Perfil"}
              >
                <AvatarRenderer
                  avatarUrl={currentAvatar}
                  name={currentName}
                  size="md"
                />
              </Link>
              <div className="pointer-events-none absolute top-1/2 left-full z-50 ml-3 hidden -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white shadow-xl group-hover:flex dark:bg-zinc-100 dark:text-zinc-900">
                <span>{currentName || "Estudante"}</span>
                <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-300 dark:text-amber-700">
                  {plan === "pro" ? "PRO" : "Free"}
                </span>
              </div>
            </div>

            {/* Logout icon button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-red-950/50 dark:hover:text-red-400"
              title="Encerrar sessão"
              aria-label="Sair"
            >
              <LogOut size={15} />
            </button>
          </div>

          {/* Visual expandido: Card completo de perfil + Botão largo de logout */}
          <div
            className={cn(
              "space-y-2 transition-opacity duration-200",
              mounted && isCollapsed ? "opacity-0 pointer-events-none absolute inset-x-2.5 top-2.5" : "opacity-100"
            )}
          >
            {/* User profile card */}
            <Link
              href="/profile"
              className="flex items-center justify-between rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-2.5 dark:border-zinc-800/80 dark:bg-zinc-800/60 overflow-hidden hover:border-zinc-300 hover:bg-zinc-100/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80 transition-colors"
              title="Acessar Meu Perfil"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <AvatarRenderer
                  avatarUrl={currentAvatar}
                  name={currentName}
                  size="sm"
                />
                <div className="min-w-0 overflow-hidden">
                  <p className="max-w-[105px] truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {currentName || "Estudante"}
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-300 truncate max-w-[105px]">
                    {currentCollege || currentPeriod
                      ? `${currentCollege || ""}${currentCollege && currentPeriod ? " • " : ""}${currentPeriod || ""}`
                      : currentPlan === "pro"
                      ? "Assinante PRO"
                      : "Plano Gratuito"}
                  </p>
                </div>
              </div>
              {currentPlan === "pro" ? (
                <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  PRO
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[10px] font-medium text-orange-600 hover:bg-amber-50 dark:border-amber-900 dark:bg-zinc-900 dark:text-amber-400">
                  Perfil
                </span>
              )}
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/80 bg-white py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700/80 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-red-900 dark:hover:bg-red-950/50 dark:hover:text-red-400"
              title="Encerrar sessão"
              aria-label="Sair"
            >
              <LogOut size={13} className="shrink-0" />
              <span className="whitespace-nowrap">Encerrar sessão</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE: Top Header Bar
         ═══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200/80 bg-white/90 px-4 py-2.5 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/90 md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-orange-600 dark:text-amber-400">
          <SynapseMark className="h-7 w-auto shrink-0" />
          <SynapseWordmark className="h-4 w-auto text-zinc-900 dark:text-zinc-50" />
        </Link>

        <div className="flex items-center gap-2">
          {/* Avatar no mobile apontando para o perfil */}
          <Link
            href="/profile"
            className="flex items-center transition-transform hover:scale-105"
            title="Meu Perfil"
          >
            <AvatarRenderer
              avatarUrl={currentAvatar}
              name={currentName}
              size="xs"
            />
          </Link>
          {currentPlan === "pro" ? (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              PRO
            </span>
          ) : (
            <Link
              href="/pricing"
              className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700 hover:text-orange-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              Upgrade
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} />}
          </button>
          <button
            onClick={handleLogout}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            aria-label="Sair"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE: Floating Island Dock (Apple / Google Style)
         ═══════════════════════════════════════════════════════════════════════ */}
      <nav className="fixed inset-x-3 bottom-[max(0.625rem,env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-md items-center justify-between rounded-2xl border border-zinc-200/90 bg-white/90 p-1.5 shadow-xl shadow-zinc-950/5 backdrop-blur-xl md:hidden dark:border-zinc-800/90 dark:bg-zinc-900/90 dark:shadow-black/40">
        {mobileNavLinks.map(({ href, label, shortLabel, icon: Icon, isPro }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-all duration-150",
                isActive
                  ? "border border-amber-200/80 bg-amber-50/90 font-semibold text-amber-900 shadow-2xs ring-1 ring-amber-500/15 dark:border-amber-800/70 dark:bg-amber-950/60 dark:text-amber-300"
                  : "border border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              )}
            >
              <div className="relative">
                <Icon size={17} />
                {isPro && (
                  <span className="absolute -top-0.5 -right-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 ring-1 ring-white dark:bg-amber-400 dark:ring-zinc-900" />
                )}
              </div>
              <span className="max-w-[48px] truncate text-center text-[10px] leading-tight">
                {shortLabel || label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
