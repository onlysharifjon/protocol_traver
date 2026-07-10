import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLang } from "@/lib/locale";

import { localizedMeta } from "@/lib/page-meta";

export function generateMetadata() {
  return localizedMeta({
    ru: {
      title: "VIP-услуги",
      description:
        "VIP-встреча в аэропорту, представительский транспорт, персональные гиды и закрытые впечатления — сервис уровня Protocol в Узбекистане.",
    },
    en: {
      title: "VIP Services",
      description:
        "VIP airport meet-and-greet, executive transport, private guides and exclusive experiences — Protocol-level service across Uzbekistan.",
    },
  });
}
export const dynamic = "force-dynamic";

// Self-contained bilingual copy for the VIP Services page.
const copy = {
  ru: {
    heroEyebrow: "VIP-услуги",
    heroTitle1: "Новый взгляд",
    heroTitle2: "на ",
    heroTitleEm: "привычное путешествие",
    heroLead:
      "Protocol Travel Services — одна из первых компаний в Узбекистане, посвятившая себя исключительно VIP-путешествиям.",

    s1Num: "01 — Кто мы",
    s1Title1: "Молодая компания",
    s1Title2: "со ",
    s1TitleEm: "зрелым опытом",
    s1Lead:
      "Мы не несём на себе груз устаревших процессов индустрии. Каждое решение мы принимаем заново — руководствуясь одним вопросом: достаточно ли это хорошо для нашего гостя.",
    intro: [
      { label: "Позиция", text: "Мы — новая компания, и в этом наша сила: мы свободны смотреть на индустрию въездного туризма по-новому, не повторяя чужих шаблонов." },
      { label: "Опыт", text: "За нами стоит команда, чей практический опыт в организации путешествий по Шёлковому пути начинается с 2018 года — годы выстраивания отношений с лучшими гидами и экспертами региона." },
      { label: "Фокус", text: "Ультра-премиальный въездной туроператор. Не массовый турбизнес — частный сервис для тех, кто воспринимает безупречность как стандарт, а не привилегию." },
      { label: "Подход", text: "Каждый маршрут создаётся вокруг вас: вашего темпа, ваших увлечений, ваших личных встреч с памятниками, что некогда стояли в центре мира." },
    ],

    s2Num: "02 — Наша история",
    s2Title1: "Опыт начинается",
    s2Title2: "с ",
    s2TitleEm: "2018 года",
    originYear: "2018",
    originLabel: "Начало пути команды",
    originText: [
      "Protocol Travel Services как компания — новый игрок на рынке. Но люди, которые её создали, годами работали в индустрии частного въездного туризма задолго до основания бренда. Опыт наших основателей и сотрудников в организации путешествий по Шёлковому пути начинается с 2018 года: это годы личных знакомств с гидами-историками, реставраторами и владельцами лучших отелей региона — связи, которые невозможно купить, только выстроить.",
      "Мы открыли Protocol, чтобы применить этот опыт без компромиссов массового рынка — без типовых автобусных групп, проходных ресторанов и формальных гидов. Только то, что мы сами хотели бы получить как гости.",
    ],

    s3Num: "03 — Наши стандарты",
    s3Title1: "Как мы",
    s3Title2: "отбираем ",
    s3TitleEm: "партнёров",
    s3Body:
      "Мы лично проверяем каждый отель, каждый автомобиль и каждый ресторан, прежде чем предложить их гостю. Никаких комиссионных соглашений по умолчанию и никаких компромиссов «для группы».",
    pillars: [
      { title: "Отели", text: "Только бутик-резиденции в исторических кварталах и ведущие международные сети — никогда «по умолчанию» или по комиссионной схеме." },
      { title: "Транспорт", text: "Представительские автомобили и минивэны с опытными водителями. Без переполненных автобусов и многочасовых ожиданий между точками маршрута." },
      { title: "Рестораны", text: "Места, где готовят аутентичную узбекскую кухню на высоком уровне — отобранные по личному опыту, а не по туристическому потоку." },
    ],

    s4Num: "04 — Чем мы отличаемся",
    s4Title1: "Не то, к чему",
    s4Title2: "вы ",
    s4TitleEm: "привыкли",
    againstLabel: "Массовый туризм",
    compare: [
      { against: "Группа из 40 человек, фиксированный автобусный маршрут, ресторан «для туристов» с типовым меню на пять языков.", protocol: "Частный автомобиль, маршрут под ваш темп, ужин в месте, которое мы выбрали бы для себя." },
      { against: "Гид с типовым текстом, который читает один и тот же рассказ десятой группе за день.", protocol: "Гид-историк или искусствовед, который годами работает с реставраторами и учёными Шёлкового пути." },
      { against: "Отель, выбранный по самой выгодной комиссии для оператора, а не по качеству сервиса.", protocol: "Отель, который мы лично проверили и в котором готовы остановиться сами." },
    ],

    ctaPre: "«Каждый маршрут создаётся ",
    ctaAccent: "вокруг вас",
    ctaPost: " — вашего темпа, ваших увлечений, ваших личных встреч с историей.»",
    ctaButton: "Связаться с нами",
  },
  en: {
    heroEyebrow: "VIP Services",
    heroTitle1: "A new perspective",
    heroTitle2: "on ",
    heroTitleEm: "familiar travel",
    heroLead:
      "Protocol Travel Services is one of the first companies in Uzbekistan dedicated exclusively to VIP travel.",

    s1Num: "01 — Who we are",
    s1Title1: "A young company",
    s1Title2: "with ",
    s1TitleEm: "seasoned experience",
    s1Lead:
      "We don't carry the weight of the industry's outdated processes. Every decision we make anew — guided by a single question: is this good enough for our guest?",
    intro: [
      { label: "Position", text: "We are a new company, and therein lies our strength: we are free to look at the inbound tourism industry afresh, without repeating anyone else's templates." },
      { label: "Experience", text: "Behind us stands a team whose hands-on experience organising Silk Road journeys dates back to 2018 — years of building relationships with the region's finest guides and experts." },
      { label: "Focus", text: "An ultra-premium inbound tour operator. Not mass tourism — a private service for those who see flawlessness as a standard, not a privilege." },
      { label: "Approach", text: "Every itinerary is built around you: your pace, your passions, your private encounters with monuments that once stood at the centre of the world." },
    ],

    s2Num: "02 — Our story",
    s2Title1: "Experience that begins",
    s2Title2: "in ",
    s2TitleEm: "2018",
    originYear: "2018",
    originLabel: "The team's beginning",
    originText: [
      "Protocol Travel Services as a company is a new player on the market. But the people who created it worked for years in private inbound tourism long before the brand was founded. Our founders' and staff's experience organising Silk Road journeys dates back to 2018: years of personal acquaintance with historian-guides, restorers and owners of the region's finest hotels — connections that cannot be bought, only built.",
      "We opened Protocol to apply this experience without the compromises of the mass market — no cookie-cutter bus groups, no tourist-trap restaurants, no formal guides. Only what we would want to receive as guests ourselves.",
    ],

    s3Num: "03 — Our standards",
    s3Title1: "How we choose",
    s3Title2: "our ",
    s3TitleEm: "partners",
    s3Body:
      "We personally inspect every hotel, every car and every restaurant before offering them to a guest. No default commission arrangements and no compromises 'for the group'.",
    pillars: [
      { title: "Hotels", text: "Only boutique residences in historic quarters and leading international chains — never 'by default' or on a commission scheme." },
      { title: "Transport", text: "Executive cars and minivans with experienced drivers. No overcrowded buses or hours of waiting between stops." },
      { title: "Restaurants", text: "Places serving authentic Uzbek cuisine at a high level — chosen from personal experience, not by tourist flow." },
    ],

    s4Num: "04 — What sets us apart",
    s4Title1: "Not what",
    s4Title2: "you're ",
    s4TitleEm: "used to",
    againstLabel: "Mass tourism",
    compare: [
      { against: "A group of 40, a fixed bus route, a 'tourist' restaurant with a template menu in five languages.", protocol: "A private car, a route at your own pace, dinner in a place we would choose for ourselves." },
      { against: "A guide with a template script reading the same story to their tenth group of the day.", protocol: "A historian or art-historian guide who has worked for years with restorers and scholars of the Silk Road." },
      { against: "A hotel chosen for the operator's best commission, not for the quality of service.", protocol: "A hotel we have personally inspected and would happily stay in ourselves." },
    ],

    ctaPre: "“Every itinerary is built ",
    ctaAccent: "around you",
    ctaPost: " — your pace, your passions, your private encounters with history.”",
    ctaButton: "Get in touch",
  },
};

const GOLD_LIGHT = "#e4c97e";

const pillarIcons = [
  <path key="0" d="M3 21h18M5 21V7l7-4 7 4v14M9 9v.01M9 13v.01M9 17v.01M15 9v.01M15 13v.01M15 17v.01" />,
  <g key="1">
    <rect x="3" y="11" width="18" height="7" rx="2" />
    <path d="M5 11l2-5h10l2 5M7 18v2M17 18v2" />
  </g>,
  <path key="2" d="M4 3v18M4 8h4M4 13h4M16 3c-2 0-3 2-3 4s1 4 3 4 3-2 3-4-1-4-3-4zM16 11v10" />,
];

export default function VipServicesPage() {
  const lang = getLang();
  const c = copy[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-[150px] text-center md:pt-[190px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <Reveal className="relative">
          <p className="eyebrow">{c.heroEyebrow}</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-light leading-[1.15] text-cream md:text-6xl lg:text-[68px]">
            {c.heroTitle1}
            <br />
            {c.heroTitle2}
            <em className="italic" style={{ color: GOLD_LIGHT }}>
              {c.heroTitleEm}
            </em>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg font-light italic leading-[1.6] text-cream/80 md:text-xl">
            {c.heroLead}
          </p>
        </Reveal>
      </section>

      {/* 01 — Who we are */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{c.s1Num}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {c.s1Title1}
              <br />
              {c.s1Title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{c.s1TitleEm}</em>
            </h2>
            <p className="mt-8 max-w-2xl font-serif text-xl font-light italic leading-[1.55] text-cream">
              {c.s1Lead}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {c.intro.map((b, i) => (
              <Reveal delay={(i % 2) * 100} key={b.label}>
                <div className="border-l border-gold pl-6">
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">{b.label}</p>
                  <p className="mt-3 font-sans text-[13px] font-light leading-[1.85] text-cream/75">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Our story */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{c.s2Num}</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {c.s2Title1}
              <br />
              {c.s2Title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{c.s2TitleEm}</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-1 gap-8 border border-white/10 bg-ink-500/40 p-8 md:grid-cols-[200px_1fr] md:gap-10 md:p-12">
              <div>
                <div className="font-serif text-6xl font-light leading-none" style={{ color: GOLD_LIGHT }}>
                  {c.originYear}
                </div>
                <div className="mt-3 font-sans text-[9px] uppercase tracking-[0.25em] text-muted-400">
                  {c.originLabel}
                </div>
              </div>
              <div className="space-y-5 font-sans text-[14px] font-light leading-[1.85] text-cream/75">
                {c.originText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — Standards */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{c.s3Num}</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {c.s3Title1}
              <br />
              {c.s3Title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{c.s3TitleEm}</em>
            </h2>
            <p className="mt-8 max-w-2xl font-sans text-sm font-light leading-[1.85] text-cream/70">
              {c.s3Body}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-3">
            {c.pillars.map((p, i) => (
              <Reveal delay={(i % 3) * 100} key={p.title}>
                <div className="h-full bg-ink-500/40 p-8 md:p-9">
                  <div className="flex h-9 w-9 items-center justify-center border border-gold">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ stroke: "#c9a84c", fill: "none", strokeWidth: 1.5, strokeLinecap: "round" }}>
                      {pillarIcons[i]}
                    </svg>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-light text-cream">{p.title}</h3>
                  <p className="mt-3 font-sans text-xs font-light leading-[1.8] text-muted-400">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Difference */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{c.s4Num}</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {c.s4Title1}
              <br />
              {c.s4Title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{c.s4TitleEm}</em>
            </h2>
          </Reveal>

          <div className="mt-12 overflow-hidden border border-white/10">
            {c.compare.map((row, i) => (
              <Reveal key={i}>
                <div className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-2">
                  <div className="relative bg-ink-600 p-7 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[#4a3030]">
                    <p className="font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-[#8a6060]">
                      {c.againstLabel}
                    </p>
                    <p className="mt-3 font-sans text-[13px] font-light leading-[1.7] text-muted-400">
                      {row.against}
                    </p>
                  </div>
                  <div className="relative bg-ink-500/40 p-7 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gold">
                    <p className="font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-gold">
                      Protocol
                    </p>
                    <p className="mt-3 font-sans text-[13px] font-light leading-[1.7] text-cream">
                      {row.protocol}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl font-serif text-3xl font-light italic leading-[1.3] text-cream md:text-4xl">
              {c.ctaPre}
              <span style={{ color: GOLD_LIGHT }}>{c.ctaAccent}</span>
              {c.ctaPost}
            </p>
            <div className="mt-10">
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
