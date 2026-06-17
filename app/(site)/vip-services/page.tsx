import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLang } from "@/lib/locale";
import { getVipDestinations } from "@/lib/queries";

export const metadata = {
  title: "VIP Services — Protocol",
};
export const dynamic = "force-dynamic";

// Self-contained bilingual copy for this page (the nav entry is managed from
// the admin "Navigation" resource; the page body lives here).
const copy = {
  ru: {
    eyebrow: "VIP-услуги",
    title1: "Безупречность",
    title2: "на уровне глав государств",
    intro:
      "Протокол высочайшего уровня — наша профессия с 2008 года. Частная авиация, личный консьерж, эксклюзивный доступ и абсолютная конфиденциальность. Мы обслуживаем тех, для кого время дороже всего, а каждая деталь имеет значение.",
    servicesEyebrow: "Что входит",
    servicesTitle: "Привилегии",
    services: [
      { title: "Частная авиация и трансферы", body: "Бизнес-джеты, вертолёты и автомобили представительского класса с личным водителем на всём маршруте." },
      { title: "Персональный консьерж", body: "Выделенный менеджер 24/7, который решает любой запрос — от бронирования до невозможного." },
      { title: "Эксклюзивный доступ", body: "Закрытые показы памятников после часов, частные коллекции и встречи, недоступные обычным гостям." },
      { title: "Протокол и безопасность", body: "Сопровождение, дипломатический протокол и дискретная охрана от прибытия до отъезда." },
      { title: "Резиденции класса люкс", body: "Президентские сюиты, дворцовые резиденции и виллы с полным обслуживанием и приватностью." },
      { title: "Индивидуальные маршруты", body: "Программа, выстроенная вокруг ваших интересов, графика и пожеланий — без единого компромисса." },
    ],
    ctaTitle: "Создадим путешествие исключительно для вас",
    ctaButton: "Связаться с нами",
  },
  en: {
    eyebrow: "VIP Services",
    title1: "Flawless service",
    title2: "at head-of-state standard",
    intro:
      "Protocol of the highest order has been our craft since 2008. Private aviation, a personal concierge, exclusive access and absolute discretion. We serve those for whom time is the rarest luxury and every detail matters.",
    servicesEyebrow: "What's included",
    servicesTitle: "Privileges",
    services: [
      { title: "Private Aviation & Transfers", body: "Business jets, helicopters and chauffeured executive cars across your entire itinerary." },
      { title: "Personal Concierge", body: "A dedicated 24/7 manager who handles any request — from reservations to the seemingly impossible." },
      { title: "Exclusive Access", body: "After-hours monument viewings, private collections and encounters unavailable to ordinary guests." },
      { title: "Protocol & Security", body: "Escort, diplomatic protocol and discreet protection from arrival to departure." },
      { title: "Luxury Residences", body: "Presidential suites, palatial residences and fully serviced villas with complete privacy." },
      { title: "Bespoke Itineraries", body: "A programme built entirely around your interests, schedule and wishes — without a single compromise." },
    ],
    ctaTitle: "A journey crafted for you alone",
    ctaButton: "Get in touch",
  },
};

export default function VipServicesPage() {
  const lang = getLang();
  const c = copy[lang];
  const destinations = getVipDestinations();

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
                src="/images/dest-samarkand.jpg"
                alt="Samarkand — the setting for exclusive private journeys"
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

      {/* Exclusive VIP destinations — bilingual showcase with individual imagery */}
      {destinations.length > 0 && (
        <section className="border-t border-white/5 bg-ink py-24 md:py-32">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">
                {lang === "ru" ? "Куда мы вас отвезём" : "Where we take you"}
              </p>
              <h2 className="mt-6 font-serif text-4xl font-light text-cream md:text-5xl">
                {lang === "ru" ? "Эксклюзивные направления" : "Exclusive Destinations"}
              </h2>
            </Reveal>

            <div className="mt-16 space-y-px">
              {destinations.map((d, i) => {
                const reversed = i % 2 === 1;
                return (
                  <Reveal key={d.id}>
                    <article className="grid grid-cols-1 overflow-hidden border border-white/5 bg-ink-600 lg:grid-cols-2">
                      {/* Image */}
                      <div
                        className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px] ${
                          reversed ? "lg:order-2" : ""
                        }`}
                      >
                        <Image
                          src={d.image}
                          alt={d.title}
                          fill
                          quality={90}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                      </div>

                      {/* Text */}
                      <div className={`p-9 md:p-12 lg:p-14 ${reversed ? "lg:order-1" : ""}`}>
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                          {d.eyebrow}
                        </p>
                        <h3 className="mt-5 font-serif text-4xl font-light leading-tight text-gold md:text-5xl">
                          {d.title}
                        </h3>

                        <div className="mt-8">
                          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold/70">
                            На русском
                          </p>
                          <p className="mt-3 font-sans text-[13px] font-light leading-[1.9] text-muted-400">
                            {d.body_ru}
                          </p>
                        </div>

                        <div className="mt-7">
                          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold/70">
                            In English
                          </p>
                          <p className="mt-3 font-sans text-[13px] font-light leading-[1.9] text-muted-400">
                            {d.body_en}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
