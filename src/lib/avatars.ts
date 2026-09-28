import {
  Stethoscope,
  HeartPulse,
  Brain,
  Microscope,
  Activity,
  Syringe,
  Pill,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface MedicalAvatar {
  id: string;
  label: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

export const MEDICAL_AVATARS: MedicalAvatar[] = [
  {
    id: "avatar:doctor-m",
    label: "Médico Clínico",
    icon: Stethoscope,
    bgColor: "bg-orange-600 dark:bg-orange-500",
    iconColor: "text-white",
  },
  {
    id: "avatar:doctor-f",
    label: "Médica Clínica",
    icon: HeartPulse,
    bgColor: "bg-amber-600 dark:bg-amber-500",
    iconColor: "text-white",
  },
  {
    id: "avatar:brain",
    label: "Neuro & Sinapse",
    icon: Brain,
    bgColor: "bg-indigo-600 dark:bg-indigo-500",
    iconColor: "text-white",
  },
  {
    id: "avatar:microscope",
    label: "Patologia & Lab",
    icon: Microscope,
    bgColor: "bg-cyan-700 dark:bg-cyan-600",
    iconColor: "text-white",
  },
  {
    id: "avatar:heart",
    label: "Cardio & Plantão",
    icon: Activity,
    bgColor: "bg-rose-600 dark:bg-rose-500",
    iconColor: "text-white",
  },
  {
    id: "avatar:syringe",
    label: "Cirurgia & Anestesia",
    icon: Syringe,
    bgColor: "bg-emerald-700 dark:bg-emerald-600",
    iconColor: "text-white",
  },
  {
    id: "avatar:pill",
    label: "Farmaco & Terapêutica",
    icon: Pill,
    bgColor: "bg-amber-600 dark:bg-amber-500",
    iconColor: "text-white",
  },
  {
    id: "avatar:sparkles",
    label: "Residência & Revalida",
    icon: Sparkles,
    bgColor: "bg-violet-600 dark:bg-violet-500",
    iconColor: "text-white",
  },
];

export function getMedicalAvatar(id?: string | null): MedicalAvatar | undefined {
  if (!id) return undefined;
  return MEDICAL_AVATARS.find((a) => a.id === id);
}

/**
 * Comprime e recorta centralizadamente qualquer imagem no navegador
 * para uma resolução nítida de 256x256 em formato JPEG (~20KB).
 */
export function compressImage(file: File, maxSize = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("O arquivo selecionado não é uma imagem válida."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Falha ao ler o arquivo de imagem."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Falha ao carregar a imagem."));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const width = img.width;
        const height = img.height;

        // Recorte centralizado quadrado
        const minDim = Math.min(width, height);
        const startX = (width - minDim) / 2;
        const startY = (height - minDim) / 2;

        canvas.width = maxSize;
        canvas.height = maxSize;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível processar a imagem no navegador."));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, maxSize, maxSize);

        // Exporta como JPEG otimizado qualidade 0.82
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
