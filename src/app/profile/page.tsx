"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { IdentityBadge } from "@/components/profile/identity-badge";
import { ProfileForm } from "@/components/profile/profile-form";
import { AvatarPicker } from "@/components/profile/avatar-picker";
import { PlanCard } from "@/components/profile/plan-card";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    referralCode: string;
    plan: string;
    avatarUrl?: string | null;
    college?: string | null;
    period?: string | null;
    targetSpecialty?: string | null;
  };
  stats: {
    streak: number;
    totalAnswered: number;
    accuracy: number;
  };
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
          <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
        </div>
        <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
      </main>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  async function handleUpdateAvatar(avatarUrl: string | null) {
    if (!data) return;

    // Atualização otimista local
    setData((prev) =>
      prev
        ? {
            ...prev,
            user: { ...prev.user, avatarUrl },
          }
        : null
    );

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl }),
      });

      if (res.ok) {
        const result = await res.json();
        setData((prev) =>
          prev
            ? {
                ...prev,
                user: { ...prev.user, ...result.user },
              }
            : null
        );
        // Notifica outros componentes da página sobre a atualização do perfil
        window.dispatchEvent(new CustomEvent("synapse:profile-updated", { detail: result.user }));
      } else {
        await fetchProfile(); // Reverte caso haja erro
      }
    } catch {
      await fetchProfile();
    }
  }

  async function handleSaveProfile(formData: {
    name: string;
    college: string;
    period: string;
    targetSpecialty: string;
  }) {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(errorJson.error || "Erro ao salvar dados do perfil.");
    }

    const result = await res.json();
    setData((prev) =>
      prev
        ? {
            ...prev,
            user: { ...prev.user, ...result.user },
          }
        : null
    );

    // Notifica navbar e componentes globais
    window.dispatchEvent(new CustomEvent("synapse:profile-updated", { detail: result.user }));
  }

  async function handlePlanChange(newPlan: "free" | "pro") {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: newPlan }),
    });

    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(errorJson.error || "Erro ao atualizar o plano.");
    }

    const result = await res.json();
    setData((prev) =>
      prev
        ? {
            ...prev,
            user: { ...prev.user, ...result.user },
          }
        : null
    );

    // Notifica navbar e componentes globais para atualizar os badges PRO instantaneamente
    window.dispatchEvent(new CustomEvent("synapse:profile-updated", { detail: result.user }));
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-16 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-zinc-400" />
          <h2 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
            Não foi possível carregar o perfil
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Verifique sua conexão ou tente recarregar a página.
          </p>
          <button
            onClick={() => fetchProfile()}
            className="mt-4 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-orange-950/20"
          >
            Tentar novamente
          </button>
        </main>
      </div>
    );
  }

  const { user, stats } = data;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar
        userName={user.name}
        plan={user.plan}
        avatarUrl={user.avatarUrl}
        college={user.college}
        period={user.period}
      />

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Link voltar para o Dashboard */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Voltar ao Dashboard</span>
          </Link>

          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Código de Indicação: <span className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">{user.referralCode}</span>
          </span>
        </div>

        {/* Título da Página */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Meu Perfil Médico
          </h1>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Gerencie sua identidade visual, informações acadêmicas e acompanhe sua constância de estudos.
          </p>
        </header>

        <div className="space-y-6">
          {/* Top Row: Crachá do Estudante + Plano PRO lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <IdentityBadge
              user={user}
              stats={stats}
              onEditAvatar={() => setIsAvatarPickerOpen(true)}
              className="h-full"
            />

            <PlanCard
              currentPlan={user.plan}
              onPlanChange={handlePlanChange}
              className="h-full"
            />
          </div>

          {/* Formulário Acadêmico */}
          <ProfileForm
            initialData={{
              name: user.name,
              college: user.college,
              period: user.period,
              targetSpecialty: user.targetSpecialty,
            }}
            onSave={handleSaveProfile}
          />
        </div>
      </main>

      {/* Modal Seletor de Foto e Avatar */}
      <AvatarPicker
        isOpen={isAvatarPickerOpen}
        onClose={() => setIsAvatarPickerOpen(false)}
        currentAvatarUrl={user.avatarUrl}
        userName={user.name}
        onSelect={handleUpdateAvatar}
      />
    </div>
  );
}
