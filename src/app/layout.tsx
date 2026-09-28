import type { Metadata, Viewport } from "next";
import { Inter, Geist, Plus_Jakarta_Sans, Playfair_Display, Tourney } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CloudBackground } from "@/components/cloud-background";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

// Fontes hospedadas junto com o site (sem requisição bloqueante ao Google Fonts).
// Playfair e Tourney são usadas em poucos lugares: não precisam de preload.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});
const tourney = Tourney({ subsets: ["latin"], variable: "--font-tourney", display: "swap", preload: false });

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Synapse Quiz | Plataforma Médica & Residência",
  description: "Plataforma de estudo ativo, repetição espaçada SM-2, casos com imagem e simulados cronometrados para medicina.",
  applicationName: "Synapse Quiz",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Synapse Quiz",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn("font-sans", geist.variable, jakarta.variable, playfair.variable, tourney.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('synapse-theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    var collapsed = localStorage.getItem('synapse_sidebar_collapsed');
    if (collapsed === 'true') {
      document.documentElement.classList.add('sidebar-collapsed');
    }
  } catch(e) {}
})();
            `.trim(),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen text-zinc-900 dark:text-zinc-50`}>
        <ThemeProvider>
          <CloudBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
