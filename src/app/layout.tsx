import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mik Araştırma - AI Destekli Pazar, Sosyal Medya ve Sağlık Araştırmaları",
  description: "Yapay zeka teknolojileri ile güçlendirilmiş profesyonel araştırma hizmetleri. Pazar araştırması, sosyal medya analizi ve sağlık araştırmalarında güvenilir çözümler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
