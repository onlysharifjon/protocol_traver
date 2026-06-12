import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { getLang } from "@/lib/locale";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const lang = getLang();
  return lang === "ru"
    ? {
        title: "Protocol — Частные путешествия по Шёлковому пути в Узбекистане",
        description:
          "Protocol Travel Services — ведущий въездной туроператор Узбекистана для взыскательных частных путешественников. Индивидуальные путешествия по Самарканду, Бухаре, Хиве и Ташкенту.",
      }
    : {
        title: "Protocol — Private Silk Road Journeys in Uzbekistan",
        description:
          "Protocol Travel Services is Uzbekistan's premier inbound tour operator for discerning private travellers. Bespoke journeys through Samarkand, Bukhara, Khiva & Tashkent.",
      };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = getLang();
  return (
    <html lang={lang} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
