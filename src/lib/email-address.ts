/**
 * Normalização de endereços de e-mail.
 *
 * - `normalizeEmail`: forma usada no cadastro e no login (sem espaços, minúsculas).
 * - `canonicalEmail`: forma "de identidade". O Gmail ignora pontos e tudo depois do "+" no
 *   nome, então `no.me+x@gmail.com` e `nome@gmail.com` são a mesma caixa de entrada.
 *   Usada para impedir várias contas (e indicações falsas) com a mesma caixa do Gmail.
 *   Só aplicamos essa regra ao Gmail, onde ela é garantida.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function canonicalEmail(email: string): string {
  const normalized = normalizeEmail(email);
  const at = normalized.lastIndexOf("@");
  if (at < 1) return normalized;

  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);

  if (domain === "gmail.com" || domain === "googlemail.com") {
    const base = local.split("+")[0].replace(/\./g, "");
    return base ? `${base}@gmail.com` : normalized;
  }
  return normalized;
}
