import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { getLang } from "@/lib/locale";
import { getContact } from "@/lib/queries";

const SITE = "https://protocoldmc.com";

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
  const ru = lang === "ru";

  const title = ru
    ? "Protocol — Частные путешествия по Шёлковому пути в Узбекистане"
    : "Protocol — Private Silk Road Journeys in Uzbekistan";
  const description = ru
    ? "Protocol Travel Services — ведущий въездной туроператор Узбекистана для взыскательных частных путешественников. Индивидуальные путешествия по Самарканду, Бухаре, Хиве и Ташкенту, VIP-обслуживание, частная авиация и MICE."
    : "Protocol Travel Services is Uzbekistan's premier inbound tour operator for discerning private travellers. Bespoke journeys through Samarkand, Bukhara, Khiva & Tashkent, VIP services, private aviation and MICE.";

  const keywords = ru
    ? ["туры по Узбекистану", "Шёлковый путь", "Самарканд", "Бухара", "Хива", "Ташкент", "VIP туры", "частная авиация", "MICE Узбекистан", "люкс путешествия", "Protocol Travel Services"]
    : ["Uzbekistan tours", "Silk Road travel", "Samarkand", "Bukhara", "Khiva", "Tashkent", "luxury travel Uzbekistan", "private jet", "VIP travel", "MICE Uzbekistan", "Protocol Travel Services"];

  return {
    metadataBase: new URL(SITE),
    title: {
      default: title,
      template: "%s · Protocol Travel Services",
    },
    description,
    keywords,
    applicationName: "Protocol Travel Services",
    authors: [{ name: "Protocol Travel Services" }],
    creator: "Protocol Travel Services",
    publisher: "Protocol Travel Services",
    category: "travel",
    openGraph: {
      type: "website",
      siteName: "Protocol Travel Services",
      title,
      description,
      locale: ru ? "ru_RU" : "en_US",
      alternateLocale: ru ? "en_US" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = getLang();
  const contact = getContact(lang);

  // Organisation / TravelAgency structured data for rich results in Google.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Protocol Travel Services",
    legalName: "Protocol Travel Services LLC",
    url: SITE,
    logo: `${SITE}/icon.png`,
    image: `${SITE}/opengraph-image.png`,
    description:
      "Uzbekistan's premier inbound tour operator for discerning private travellers — bespoke Silk Road journeys, VIP services, private aviation and MICE.",
    foundingDate: "2008",
    areaServed: "Uzbekistan",
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
      ...(contact.address ? { streetAddress: contact.address } : {}),
    },
  };

  return (
    <html lang={lang} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
