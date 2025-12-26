import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import CursorGlow from "../components/CursorGlow";

export const metadata: Metadata = {
  title: "Alperen Bayar | Yazılım, SEO ve Otomasyon",
  description:
    "Google Ads, Meta Ads, SEO, n8n otomasyonları, React/Next.js, .NET ve Flutter ile veriye dayalı, ölçeklenebilir çözümler üreten yazılım geliştirici.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Alperen Bayar",
    "Yazılım geliştirici",
    "Next.js",
    "React",
    ".NET",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "n8n otomasyon",
    "dijital pazarlama",
  ],
  openGraph: {
    title: "Alperen Bayar | Yazılım, SEO ve Otomasyon",
    description:
      "SEO, reklam optimizasyonu ve yazılım otomasyonlarıyla ölçeklenebilir çözümler.",
    url: "https://alperenbayar.com",
    siteName: "Alperen Bayar",
    images: [
      {
        url: "/images/alperen.jpg",
        width: 1200,
        height: 630,
        alt: "Alperen Bayar",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alperen Bayar | Yazılım, SEO ve Otomasyon",
    description:
      "SEO, reklam optimizasyonu ve yazılım otomasyonlarıyla ölçeklenebilir çözümler.",
    images: ["/images/alperen.jpg"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <CursorGlow />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
