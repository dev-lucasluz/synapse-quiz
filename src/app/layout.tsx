import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CloudBackground } from "@/components/cloud-background";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
    <html lang="pt-BR" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
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
