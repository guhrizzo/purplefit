import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Barlow_Condensed, Inter } from "next/font/google";
import { Providers } from "@/components/accessibility/Providers";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import { a11yBootstrapScript } from "@/lib/a11y-bootstrap";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Fonte de leitura acessível: só é baixada quando o usuário a ativa no painel. */
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const title = `${siteConfig.fullName} | Academia em ${siteConfig.city}/${siteConfig.region}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "academia em Jaú",
    "Purple Fit Jaú",
    "Rede Purple Fit",
    "musculação Jaú",
    "pilates Jaú",
    "Wellhub Jaú",
    "TotalPass Jaú",
    "academia Bombeiro Jaú",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.fullName,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0414",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-animations="on"
      suppressHydrationWarning
      className={`${barlow.variable} ${inter.variable} ${atkinson.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootstrapScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Providers footer={<Footer />}>{children}</Providers>
      </body>
    </html>
  );
}
