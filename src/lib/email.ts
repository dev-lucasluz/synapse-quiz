import nodemailer, { type Transporter } from "nodemailer";

/**
 * Envio de e-mail via SMTP (hoje: conta Gmail com "senha de app").
 * O provedor é escolhido só por variáveis de ambiente, então trocar por outro
 * SMTP (ex.: Resend SMTP com domínio próprio) não exige mudar nenhuma rota.
 *
 *   SMTP_HOST (padrão smtp.gmail.com) · SMTP_PORT (padrão 465)
 *   SMTP_USER · SMTP_PASS · EMAIL_FROM (padrão "Synapse Quiz <SMTP_USER>")
 *
 * Sem SMTP_USER/SMTP_PASS, em desenvolvimento o e-mail é apenas impresso no console.
 */

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendMail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  const tx = getTransporter();
  if (!tx) {
    if (process.env.NODE_ENV === "production") {
      console.error("[email] SMTP_USER/SMTP_PASS não configurados; e-mail não enviado.");
      return false;
    }
    console.log(`\n[email:dev] Para: ${to}\nAssunto: ${subject}\n${text}\n`);
    return true;
  }

  try {
    const from = process.env.EMAIL_FROM || `Synapse Quiz <${process.env.SMTP_USER}>`;
    await tx.sendMail({ from, to, subject, html, text });
    return true;
  } catch (error) {
    console.error("[email] Falha ao enviar:", error);
    return false;
  }
}

function layout(title: string, name: string, body: string, buttonLabel: string, link: string, footer: string): string {
  return `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b">
<div style="max-width:480px;margin:0 auto;padding:24px">
  <div style="background:#fff;border-radius:16px;padding:28px;border:1px solid #e4e4e7">
    <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:1px;color:#ea580c">SYNAPSE QUIZ</p>
    <h1 style="margin:0 0 16px;font-size:20px">${escapeHtml(title)}</h1>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.5">Olá, ${escapeHtml(name)}!</p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.5">${body}</p>
    <p style="margin:0 0 20px"><a href="${link}" style="display:inline-block;background:#ea580c;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:12px">${escapeHtml(buttonLabel)}</a></p>
    <p style="margin:0 0 6px;font-size:12px;color:#71717a;line-height:1.5">Se o botão não funcionar, copie e cole este endereço no navegador:<br><span style="word-break:break-all">${link}</span></p>
    <p style="margin:12px 0 0;font-size:12px;color:#71717a;line-height:1.5">${footer}</p>
  </div>
</div></body></html>`;
}

export async function sendVerificationEmail(to: string, name: string, token: string): Promise<boolean> {
  const link = `${getAppUrl()}/verify-email?token=${encodeURIComponent(token)}`;
  const html = layout(
    "Confirme seu e-mail",
    name,
    "Confirme seu e-mail para ativar o bônus de cota por indicação e proteger sua conta. O link vale por 24 horas.",
    "Confirmar e-mail",
    link,
    "Se você não criou uma conta no Synapse Quiz, ignore esta mensagem."
  );
  const text = `Olá, ${name}!\n\nConfirme seu e-mail (link válido por 24 horas):\n${link}\n\nSe você não criou uma conta no Synapse Quiz, ignore esta mensagem.`;
  return sendMail(to, "Confirme seu e-mail — Synapse Quiz", html, text);
}

export async function sendPasswordResetEmail(to: string, name: string, token: string): Promise<boolean> {
  const link = `${getAppUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const html = layout(
    "Redefinir senha",
    name,
    "Recebemos um pedido para redefinir a senha da sua conta. O link vale por 30 minutos e só pode ser usado uma vez.",
    "Redefinir senha",
    link,
    "Se você não pediu isso, ignore esta mensagem: sua senha continua a mesma."
  );
  const text = `Olá, ${name}!\n\nPara redefinir sua senha (link válido por 30 minutos):\n${link}\n\nSe você não pediu isso, ignore esta mensagem.`;
  return sendMail(to, "Redefinir senha — Synapse Quiz", html, text);
}
