import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLang } from "@/lib/locale";

import { localizedMeta } from "@/lib/page-meta";

export function generateMetadata() {
  return localizedMeta({
    ru: {
      title: "MICE и мероприятия",
      description:
        "Корпоративные поездки, конференции и частные мероприятия в Узбекистане: полная организация под ключ от DMC-оператора Protocol.",
    },
    en: {
      title: "MICE & Events",
      description:
        "Corporate trips, conferences and private events in Uzbekistan: full turnkey organisation by DMC operator Protocol.",
    },
  });
}
export const dynamic = "force-dynamic";

// Self-contained bilingual copy for this page (nav entry is managed from the
// admin "Navigation" resource; the page body lives here).
const copy = {
  ru: {
    eyebrow: "MICE и мероприятия",
    title1: "Деловые встречи,",
    title2: "достойные легенды Шёлкового пути",
    intro:
      "От закрытых конференций под куполами Самарканда до выездных инсентив-программ для первых лиц — мы организуем корпоративные события, которые невозможно повторить нигде в мире. Полный цикл: концепция, логистика, протокол и безупречное исполнение.",
    servicesEyebrow: "Что мы организуем",
    servicesTitle: "Форматы мероприятий",
    services: [
      { title: "Конференции и форумы", body: "Площадки от исторических медресе до пятизвёздочных залов, синхронный перевод, полное техническое сопровождение." },
      { title: "Инсентив-туры", body: "Программы поощрения для команд и партнёров — эксклюзивные впечатления, которые мотивируют сильнее любого бонуса." },
      { title: "Корпоративные события", body: "Юбилеи компаний, продуктовые запуски и приёмы под ключ — с авторской концепцией и продакшеном." },
      { title: "Выставки и road-show", body: "Организация участия, застройка стендов, деловые миссии и встречи с локальными партнёрами." },
      { title: "Гала-ужины", body: "Приёмы в дворцовых интерьерах с национальной кухней, живой музыкой и индивидуальным сценарием вечера." },
      { title: "Тимбилдинг", body: "Командные программы в пустыне, горах и древних городах — от ремесленных мастер-классов до экспедиций." },
    ],
    ctaTitle: "Спланируем ваше мероприятие",
    ctaButton: "Связаться с нами",
  },
  en: {
    eyebrow: "MICE & Events",
    title1: "Corporate gatherings",
    title2: "worthy of the Silk Road",
    intro:
      "From private conferences beneath the domes of Samarkand to incentive programmes for senior leadership, we produce corporate events that cannot be replicated anywhere else. Full cycle: concept, logistics, protocol and flawless execution.",
    servicesEyebrow: "What we produce",
    servicesTitle: "Event formats",
    services: [
      { title: "Conferences & Forums", body: "Venues from historic madrasahs to five-star halls, simultaneous interpretation and complete technical support." },
      { title: "Incentive Travel", body: "Reward programmes for teams and partners — exclusive experiences that motivate more than any bonus." },
      { title: "Corporate Events", body: "Anniversaries, product launches and receptions delivered turnkey, with bespoke concept and production." },
      { title: "Exhibitions & Road-shows", body: "Participation management, stand construction, business missions and meetings with local partners." },
      { title: "Gala Dinners", body: "Receptions in palatial settings with national cuisine, live music and a tailored programme for the evening." },
      { title: "Team Building", body: "Group programmes across deserts, mountains and ancient cities — from artisan workshops to expeditions." },
    ],
    ctaTitle: "Let us plan your event",
    ctaButton: "Get in touch",
  },
};

export default function MiceEventsPage() {
  const lang = getLang();
  const c = copy[lang];

  return (
    <>
      {/* Hero — text + portrait image (image shown at a contained width so
          it stays crisp instead of being upscaled in a full-bleed band) */}
      <section className="bg-ink pb-20 pt-[140px] md:pb-28 md:pt-[190px]">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_460px] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="mt-6 font-serif text-5xl font-light leading-[1.0] text-cream md:text-6xl lg:text-7xl">
              {c.title1}
              <br />
              {c.title2}
            </h1>
            <p className="mt-9 max-w-xl font-sans text-[15px] font-light leading-[1.95] text-muted-400">
              {c.intro}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/mice-memorial.jpg"
                alt="Uzbekistan — a setting for prestigious events and ceremonies"
                fill
                quality={90}
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ink-600 py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{c.servicesEyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl font-light text-cream md:text-5xl">
              {c.servicesTitle}
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s, i) => (
              <Reveal delay={(i % 3) * 100} key={s.title}>
                <div className="mb-6 h-px w-12 bg-gold/40" />
                <h3 className="font-serif text-2xl font-normal text-cream">
                  {s.title}
                </h3>
                <p className="mt-5 font-sans text-[13px] font-light leading-[1.85] text-muted-400">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-28 md:py-36">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-4xl font-light text-cream md:text-5xl">
              {c.ctaTitle}
            </h2>
            <div className="mt-12">
              <Link href="#contact" className="btn-ghost">
                {c.ctaButton}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
