import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { IMAGE_CREDITS } from "@/lib/image-credits";

export const metadata: Metadata = {
  title: "Créditos das imagens | Synapse Quiz",
  description:
    "Autores e licenças das imagens clínicas usadas nas questões do Synapse Quiz (Wikimedia Commons e acervos livres).",
};

export default function CreditosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 font-heading">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeft size={14} /> Voltar
      </Link>

      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        Créditos das imagens
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        As imagens clínicas das questões vêm de acervos de licença livre, principalmente o Wikimedia
        Commons, sob domínio público, CC0, CC BY ou CC BY-SA. Elas foram redimensionadas e comprimidas
        para uso na plataforma; nenhuma outra alteração de conteúdo foi feita. Agradecemos aos autores.
      </p>

      <ul className="mt-6 divide-y divide-zinc-200/80 rounded-2xl border border-zinc-200/80 bg-white/80 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60">
        {IMAGE_CREDITS.map((c) => (
          <li key={c.file} className="flex items-start gap-3 p-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.file}
              alt=""
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-lg border border-zinc-200 object-cover dark:border-zinc-700"
            />
            <div className="min-w-0 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">{c.title}</p>
              <p>
                Autor: {c.author} ·{" "}
                {c.licenseUrl ? (
                  <a
                    href={c.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-amber-700 underline dark:text-amber-400"
                  >
                    {c.license}
                  </a>
                ) : (
                  <span className="font-semibold">{c.license}</span>
                )}
              </p>
              <a
                href={c.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-500 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Página original <ExternalLink size={11} />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
