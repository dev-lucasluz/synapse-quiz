"use client";

import { useState, useRef } from "react";
import { MEDICAL_AVATARS, compressImage } from "@/lib/avatars";
import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import {
  Upload,
  Check,
  X,
  Camera,
  Trash2,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarPickerProps {
  currentAvatarUrl?: string | null;
  userName?: string | null;
  onSelect: (avatarUrl: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarPicker({
  currentAvatarUrl,
  userName,
  onSelect,
  isOpen,
  onClose,
}: AvatarPickerProps) {
  const [activeTab, setActiveTab] = useState<"medical" | "upload">("medical");
  const [previewCustom, setPreviewCustom] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const compressedDataUrl = await compressImage(file, 256);
      setPreviewCustom(compressedDataUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao processar a imagem.";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleConfirmCustom() {
    if (previewCustom) {
      onSelect(previewCustom);
      onClose();
    }
  }

  function handleSelectMedical(avatarId: string) {
    onSelect(avatarId);
    onClose();
  }

  function handleRemoveAvatar() {
    onSelect(null);
    setPreviewCustom(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Cabeçalho do modal */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-orange-700 dark:bg-amber-950 dark:text-amber-400">
              <Camera size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                Foto e Identidade Visual
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Escolha um avatar médico ou envie sua própria foto
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Abas */}
        <div className="mt-4 flex gap-1.5 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800/80">
          <button
            type="button"
            onClick={() => setActiveTab("medical")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all",
              activeTab === "medical"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            <Sparkles size={13} className="text-orange-600 dark:text-amber-400" />
            <span>Avatares Médicos</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all",
              activeTab === "upload"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            <Upload size={13} className="text-orange-600 dark:text-amber-400" />
            <span>Enviar Foto</span>
          </button>
        </div>

        {/* Conteúdo da aba: Avatares Médicos */}
        {activeTab === "medical" && (
          <div className="mt-4">
            <p className="mb-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Selecione um ícone temático para o seu crachá:
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {MEDICAL_AVATARS.map((avatar) => {
                const isSelected = currentAvatarUrl === avatar.id;
                const Icon = avatar.icon;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleSelectMedical(avatar.id)}
                    className={cn(
                      "group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all hover:scale-105",
                      isSelected
                        ? "border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/20 dark:border-amber-400 dark:bg-amber-950/40"
                        : "border-zinc-200/80 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:border-zinc-700"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl shadow-xs",
                        avatar.bgColor
                      )}
                    >
                      <Icon size={20} className={avatar.iconColor} />
                    </div>
                    <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300 text-center leading-tight truncate w-full">
                      {avatar.label}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-white shadow-2xs">
                        <Check size={10} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Conteúdo da aba: Upload Próprio */}
        {activeTab === "upload" && (
          <div className="mt-4 flex flex-col items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Preview do avatar com a imagem carregada ou atual */}
            <div className="relative mb-3">
              <AvatarRenderer
                avatarUrl={previewCustom || currentAvatarUrl}
                name={userName}
                size="xl"
                className="ring-4 ring-zinc-100 dark:ring-zinc-800 shadow-md"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-transform hover:scale-110 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                title="Escolher arquivo"
              >
                <Camera size={13} />
              </button>
            </div>

            {errorMessage && (
              <p className="mb-2 text-center text-xs text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            )}

            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mb-4">
              Formatos suportados: PNG, JPG ou WebP. A foto é redimensionada e otimizada automaticamente.
            </p>

            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <ImageIcon size={14} />
                <span>{isProcessing ? "Processando..." : "Escolher do Dispositivo"}</span>
              </button>

              {previewCustom && (
                <button
                  type="button"
                  onClick={handleConfirmCustom}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-orange-950/20 transition-all"
                >
                  <Check size={14} />
                  <span>Aplicar</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Rodapé: Remover foto / voltar para inicial */}
        {currentAvatarUrl && (
          <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              Deseja remover a foto atual?
            </span>
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 size={12} />
              <span>Remover foto</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
