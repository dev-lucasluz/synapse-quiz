"use client";

import { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Building2, GraduationCap, Stethoscope, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileFormProps {
  initialData: {
    name: string;
    college?: string | null;
    period?: string | null;
    targetSpecialty?: string | null;
  };
  onSave: (data: {
    name: string;
    college: string;
    period: string;
    targetSpecialty: string;
  }) => Promise<void>;
}

const BRAZILIAN_MED_SCHOOLS = [
  "Universidade de São Paulo (USP)",
  "USP Ribeirão Preto (FMRP)",
  "Universidade Federal de São Paulo (UNIFESP)",
  "Universidade Estadual de Campinas (UNICAMP)",
  "Universidade Federal do Rio de Janeiro (UFRJ)",
  "Universidade Federal de Minas Gerais (UFMG)",
  "Universidade Federal do Rio Grande do Sul (UFRGS)",
  "Universidade do Estado do Rio de Janeiro (UERJ)",
  "Universidade Federal do Paraná (UFPR)",
  "Universidade de Brasília (UnB)",
  "Universidade Federal de Santa Catarina (UFSC)",
  "Universidade Federal da Bahia (UFBA)",
  "Universidade Federal de Pernambuco (UFPE)",
  "Universidade Federal do Ceará (UFC)",
  "Universidade Federal de Goiás (UFG)",
  "Faculdade de Ciências Médicas da Santa Casa de SP",
  "Pontifícia Universidade Católica (PUC)",
  "Universidade Federal Fluminense (UFF)",
  "Universidade Estadual Paulista (UNESP)",
  "Universidade Federal de Pelotas (UFPel)",
  "Universidade Federal de Uberlândia (UFU)",
  "Universidade Federal de Juiz de Fora (UFJF)",
];

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [college, setCollege] = useState(initialData.college || "");
  const [period, setPeriod] = useState(initialData.period || "");
  const [targetSpecialty, setTargetSpecialty] = useState(initialData.targetSpecialty || "");

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (name.trim().length < 2) {
      setError("O nome deve ter no mínimo 2 caracteres.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        college: college.trim(),
        period: period.trim(),
        targetSpecialty: targetSpecialty.trim(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao salvar os dados.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
          Dados Acadêmicos e Profissionais
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Suas informações serão utilizadas para o Ranking entre faculdades e períodos.
        </p>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center gap-2 rounded-xl bg-teal-50 p-3 text-xs font-medium text-teal-800 dark:bg-teal-950/40 dark:text-teal-300">
          <CheckCircle2 size={15} className="shrink-0" />
          <span>Perfil atualizado com sucesso! As alterações já estão ativas.</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Nome Completo */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Nome Completo</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-teal-600 focus:bg-white focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-teal-500 dark:focus:bg-zinc-900 transition-colors"
          />
        </div>

        {/* Faculdade de Medicina com Datalist */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Building2 size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Faculdade de Medicina</span>
            </span>
          </label>
          <input
            type="text"
            list="med-schools-list"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Ex: Universidade de São Paulo (USP)"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-teal-600 focus:bg-white focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-teal-500 dark:focus:bg-zinc-900 transition-colors"
          />
          <datalist id="med-schools-list">
            {BRAZILIAN_MED_SCHOOLS.map((school) => (
              <option key={school} value={school} />
            ))}
          </datalist>
          <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            Você pode selecionar uma sugestão da lista ou digitar livremente o nome da sua universidade.
          </p>
        </div>

        {/* Período Acadêmico */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <GraduationCap size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Período Acadêmico</span>
            </span>
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-teal-600 focus:bg-white focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-50 dark:focus:border-teal-500 dark:focus:bg-zinc-900 transition-colors"
          >
            <option value="">Selecione seu período atual...</option>

            <optgroup label="Ciclo Básico (1º ao 4º Período)">
              <option value="1º Período">1º Período (1º Ano)</option>
              <option value="2º Período">2º Período (1º Ano)</option>
              <option value="3º Período">3º Período (2º Ano)</option>
              <option value="4º Período">4º Período (2º Ano)</option>
            </optgroup>

            <optgroup label="Ciclo Clínico (5º ao 8º Período)">
              <option value="5º Período">5º Período (3º Ano)</option>
              <option value="6º Período">6º Período (3º Ano)</option>
              <option value="7º Período">7º Período (4º Ano)</option>
              <option value="8º Período">8º Período (4º Ano)</option>
            </optgroup>

            <optgroup label="Internato Médico (9º ao 12º Período)">
              <option value="9º Período">9º Período (Internato - 5º Ano)</option>
              <option value="10º Período">10º Período (Internato - 5º Ano)</option>
              <option value="11º Período">11º Período (Internato - 6º Ano)</option>
              <option value="12º Período">12º Período (Internato - 6º Ano)</option>
            </optgroup>

            <optgroup label="Pós-Graduação & Mercado">
              <option value="Formado / Residência">Formado / Médico Residente</option>
              <option value="Preparatório Revalida">Médico Formado no Exterior (Revalida)</option>
            </optgroup>
          </select>
        </div>

        {/* Especialidade Pretendida (Opcional) */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Stethoscope size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Especialidade dos Sonhos (Opcional)</span>
            </span>
          </label>
          <input
            type="text"
            value={targetSpecialty}
            onChange={(e) => setTargetSpecialty(e.target.value)}
            placeholder="Ex: Cardiologia, Cirurgia Geral, Pediatria, Neurologia..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-teal-600 focus:bg-white focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-teal-500 dark:focus:bg-zinc-900 transition-colors"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <button
          type="submit"
          disabled={saving}
          className={cn(
            "flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-teal-800 active:scale-98 dark:bg-teal-600 dark:hover:bg-teal-500",
            saving && "opacity-75 cursor-not-allowed"
          )}
        >
          <Save size={14} />
          <span>{saving ? "Salvando alterações..." : "Salvar Alterações"}</span>
        </button>
      </div>
    </form>
  );
}
