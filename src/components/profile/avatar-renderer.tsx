"use client";

import { getMedicalAvatar } from "@/lib/avatars";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarRendererProps {
  avatarUrl?: string | null;
  name?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  iconClassName?: string;
}

export function AvatarRenderer({
  avatarUrl,
  name,
  size = "md",
  className,
  iconClassName,
}: AvatarRendererProps) {
  const sizeClasses = {
    xs: "h-6 w-6 text-[10px] rounded-lg",
    sm: "h-8 w-8 text-xs rounded-xl",
    md: "h-9 w-9 text-xs rounded-xl",
    lg: "h-14 w-14 text-base rounded-2xl",
    xl: "h-20 w-20 text-xl rounded-2xl",
  }[size];

  const iconSizes = {
    xs: 12,
    sm: 15,
    md: 16,
    lg: 24,
    xl: 34,
  }[size];

  // Caso 1: Avatar médico pré-definido (ex: "avatar:brain")
  if (avatarUrl && avatarUrl.startsWith("avatar:")) {
    const medical = getMedicalAvatar(avatarUrl);
    if (medical) {
      const Icon = medical.icon;
      return (
        <div
          className={cn(
            "flex shrink-0 items-center justify-center shadow-2xs",
            sizeClasses,
            medical.bgColor,
            className
          )}
        >
          <Icon size={iconSizes} className={cn(medical.iconColor, iconClassName)} />
        </div>
      );
    }
  }

  // Caso 2: Imagem própria (base64 data URL ou URL remota)
  if (avatarUrl && (avatarUrl.startsWith("data:image/") || avatarUrl.startsWith("http"))) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden shadow-2xs border border-zinc-200/80 dark:border-zinc-700/80",
          sizeClasses,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={name || "Foto de perfil"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Caso 3: Fallback padrão com inicial do nome ou ícone genérico
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shadow-2xs",
        sizeClasses,
        className
      )}
    >
      {name && name.trim().length > 0 ? (
        name.trim().charAt(0).toUpperCase()
      ) : (
        <User size={iconSizes} className={iconClassName} />
      )}
    </div>
  );
}
