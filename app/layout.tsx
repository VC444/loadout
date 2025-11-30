import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Loadout - AI System Design Interview Practice",
  description:
    "AI-powered system design interview preparation with voice interaction and real-time diagramming",
  generator: "v0.app",
  keywords: [
    "AI",
    "system design",
    "interview",
    "mock interview",
    "preparation",
    "voice interaction",
    "diagramming",
    "excalidraw",
    "openai",
  ],
  authors: [{ name: "Loadout Team" }],
  creator: "Loadout",
  publisher: "Loadout",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    title: "Loadout - AI System Design Interview Practice",
    description:
      "AI-powered system design interview preparation with voice interaction and real-time diagramming",
    siteName: "Loadout",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loadout - AI System Design Interview Practice",
    description:
      "AI-powered system design interview preparation with voice interaction and real-time diagramming",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
