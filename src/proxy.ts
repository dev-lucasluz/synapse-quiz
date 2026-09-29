import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";
import { prefersMarkdown } from "@/lib/content-negotiation";

// Rotas que requerem autenticação para usuários de navegador (HTML)
const PROTECTED_ROUTES = ["/dashboard", "/quiz", "/notebook", "/referral", "/simulation", "/admin"];

// Rotas só para visitantes (redireciona autenticados para dashboard)
const AUTH_ROUTES = ["/login", "/register"];

// Extensões de arquivos estáticos a ignorar
const STATIC_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".css",
  ".js",
  ".map",
  ".webmanifest",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept");

  // Ignorar arquivos estáticos do Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    STATIC_EXTENSIONS.some((ext) => pathname.endsWith(ext))
  ) {
    return NextResponse.next();
  }

  // Se já for uma rota de API (exceto se for /api/markdown), não intervir
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // ── 1. Content Negotiation (acceptmarkdown.com) ───────────────────────────
  // Se o cliente solicitar text/markdown ou acessar URL terminada em .md
  if (prefersMarkdown(acceptHeader, pathname)) {
    let cleanPath = pathname;
    if (cleanPath.endsWith(".md")) {
      cleanPath = cleanPath.slice(0, -3);
      if (!cleanPath) cleanPath = "/";
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = cleanPath === "/" ? "/api/markdown" : `/api/markdown${cleanPath}`;

    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set("Vary", "Accept");
    return response;
  }

  // ── 2. Autenticação para navegação HTML ────────────────────────────────────
  const token = request.cookies.get("synapse_session")?.value;
  const session = token ? await verifySession(token) : null;

  // Se rota protegida e sem sessão → redireciona para /login
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      const response = NextResponse.redirect(url);
      response.headers.set("Vary", "Accept");
      return response;
    }
  }

  // Se rota de auth e já autenticado → redireciona para /dashboard
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      const response = NextResponse.redirect(url);
      response.headers.set("Vary", "Accept");
      return response;
    }
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    /*
     * Intercepta todas as rotas exceto estáticos conhecidos
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
