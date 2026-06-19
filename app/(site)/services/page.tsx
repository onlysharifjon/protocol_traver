import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLang } from "@/lib/locale";

export const metadata = {
  title: "Services — Protocol",
};
export const dynamic = "force-dynamic";

// Self-contained bilingual copy for this page (the nav entry is managed from
// the admin "Navigation" resource; the page body lives here).
const copy = {
  ru: {
    eyebrow: "Услуги",
    title: "Безупречность, организованная заранее",
    intro:
      "Каждая деталь путешествия — от телефонного звонка до взлёта частного самолёта — продумана и подтверждена прежде, чем вы успеете о ней спросить.",
    offerEyebrow: "Что мы предлагаем",
    offerTitle: "Шесть направлений, один стандарт",
    offerIntro:
      "Мы не продаём отдельные услуги — мы выстраиваем вокруг гостя инфраструктуру, в которой не остаётся нерешённых вопросов.",
    services: [
      {
        num: "01",
        title: "Консьерж-сервис 24/7",
        subtitle: "Персональный менеджер",
        body:
          "За каждым гостем закрепляется персональный менеджер, доступный круглосуточно на протяжении всего путешествия. Любая просьба — от столика в ресторане до решения непредвиденной ситуации — выполняется без лишних звонков и ожидания.",
        points: [
          "Бронирование столиков и мест в любое время",
          "Покупка и доставка товаров по запросу",
          "Решение нештатных ситуаций на месте",
          "Связь на родном языке гостя",
        ],
      },
      {
        num: "02",
        title: "VIP-обслуживание в аэропортах",
        subtitle: "Встреча без очередей",
        body:
          "Прибытие и вылет — без очередей, формальностей и ожидания. Гость проходит контроль через залы повышенной комфортности, минуя общий поток, и сразу попадает в подготовленный для него автомобиль.",
        points: [
          "Сопровождение от трапа до автомобиля",
          "Залы повышенной комфортности (VIP / CIP)",
          "Ускоренное прохождение паспортного контроля",
          "Помощь с багажом и таможенными процедурами",
        ],
      },
      {
        num: "03",
        title: "VIP-транспорт",
        subtitle: "Полный парк под любой формат",
        body:
          "В нашем распоряжении весь спектр транспорта для частных и групповых поездок: представительские седаны, внедорожники, минивэны и автобусы — для любой численности гостей и любого формата маршрута.",
        points: [
          "Представительские седаны",
          "Внедорожники для дальних переездов",
          "Минивэны для небольших групп",
          "Автобусы для делегаций",
        ],
      },
      {
        num: "04",
        title: "Вертолётные экскурсии",
        subtitle: "Шёлковый путь с высоты",
        body:
          "Купола Регистана, пустыня Кызылкум и крепостные стены Ичан-Калы выглядят иначе с высоты птичьего полёта. Мы организуем вертолётные экскурсии и трансферы между городами маршрута для тех, кто ценит время и впечатления одинаково высоко.",
        points: [
          "Панорамные облёты исторических городов",
          "Межгородские трансферы по воздуху",
          "Индивидуальные маршруты облёта",
          "Координация с авиационными властями",
        ],
      },
      {
        num: "05",
        title: "Частные самолёты",
        subtitle: "От разрешений до посадки",
        body:
          "Мы берём на себя всю организацию рейсов на частных самолётах: получение разрешений на полёты и посадку, координацию с аэропортами Узбекистана и подготовку наземного обслуживания к моменту приземления.",
        points: [
          "Получение разрешений на вход в воздушное пространство",
          "Слоты на посадку и стоянку воздушного судна",
          "Наземное обслуживание и топливо",
          "Координация экипажа и расписания",
        ],
      },
      {
        num: "06",
        title: "Программы под запрос",
        subtitle: "Маршрут вне каталога",
        body:
          "Когда стандартного маршрута недостаточно, мы организуем то, что в него обычно не входит: встречи с дизайнерами и художниками, визиты в частные мастерские и коллекции, закрытые экспозиции и события, подобранные под интересы конкретного гостя.",
        points: [
          "Встречи с дизайнерами и художниками",
          "Визиты в мастерские и частные коллекции",
          "Доступ к закрытым экспозициям",
          "Индивидуальные тематические программы",
        ],
      },
    ],
    quote:
      "Мы организуем то, что для обычного гостя остаётся за кадром — от разрешения на посадку до встречи с мастером, чьё имя знают немногие.",
    ctaTitle: "Расскажите нам, что вам нужно — остальное мы возьмём на себя.",
    ctaButton: "Связаться с нами",
  },
  en: {
    eyebrow: "Services",
    title: "Perfection, arranged in advance",
    intro:
      "Every detail of the journey — from the first phone call to the take-off of a private jet — is considered and confirmed before you even think to ask.",
    offerEyebrow: "What we offer",
    offerTitle: "Six disciplines, one standard",
    offerIntro:
      "We do not sell individual services — we build an infrastructure around the guest in which no question is left unanswered.",
    services: [
      {
        num: "01",
        title: "24/7 Concierge Service",
        subtitle: "A Personal Manager",
        body:
          "Each guest is assigned a personal manager, available around the clock throughout the journey. Any request — from a restaurant table to resolving the unexpected — is fulfilled without extra calls or waiting.",
        points: [
          "Reservations for tables and seats at any hour",
          "Purchase and delivery of goods on request",
          "On-the-spot resolution of any situation",
          "Communication in the guest's native language",
        ],
      },
      {
        num: "02",
        title: "VIP Airport Service",
        subtitle: "Arrival Without Queues",
        body:
          "Arrival and departure — without queues, formalities, or waiting. The guest passes through premium lounges, bypassing the general flow, and steps straight into a car prepared for them.",
        points: [
          "Escort from the aircraft steps to the car",
          "Premium comfort lounges (VIP / CIP)",
          "Expedited passport control",
          "Assistance with baggage and customs procedures",
        ],
      },
      {
        num: "03",
        title: "VIP Transport",
        subtitle: "A Full Fleet for Any Format",
        body:
          "We command the full spectrum of transport for private and group travel: executive sedans, SUVs, minivans, and coaches — for any number of guests and any itinerary.",
        points: [
          "Executive sedans",
          "SUVs for long-distance transfers",
          "Minivans for small groups",
          "Coaches for delegations",
        ],
      },
      {
        num: "04",
        title: "Helicopter Excursions",
        subtitle: "The Silk Road From Above",
        body:
          "The domes of the Registan, the Kyzylkum desert, and the ramparts of Ichan-Kala look different from a bird's-eye view. We arrange helicopter excursions and inter-city transfers for those who value time and impressions in equal measure.",
        points: [
          "Panoramic flights over historic cities",
          "Inter-city transfers by air",
          "Bespoke flight routes",
          "Coordination with aviation authorities",
        ],
      },
      {
        num: "05",
        title: "Private Jets",
        subtitle: "From Permits to Landing",
        body:
          "We handle the entire organisation of private jet flights: securing flight and landing permits, coordinating with Uzbekistan's airports, and preparing ground handling for the moment of arrival.",
        points: [
          "Airspace entry permits",
          "Landing and parking slots for the aircraft",
          "Ground handling and fuel",
          "Crew and schedule coordination",
        ],
      },
      {
        num: "06",
        title: "Programmes on Request",
        subtitle: "An Itinerary Beyond the Catalogue",
        body:
          "When a standard itinerary is not enough, we arrange what it usually does not include: meetings with designers and artists, visits to private workshops and collections, closed exhibitions and events curated to a specific guest's interests.",
        points: [
          "Meetings with designers and artists",
          "Visits to workshops and private collections",
          "Access to closed exhibitions",
          "Bespoke themed programmes",
        ],
      },
    ],
    quote:
      "We arrange what stays off-screen for the ordinary guest — from a landing permit to a meeting with a master whose name few know.",
    ctaTitle: "Tell us what you need — we will take care of the rest.",
    ctaButton: "Get in touch",
  },
};

export default function ServicesPage() {
  const lang = getLang();
  const c = copy[lang];

  return (
    <>
      {/* Hero */}
      <section className="bg-ink pb-20 pt-[140px] md:pb-28 md:pt-[190px]">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-cream md:text-6xl lg:text-7xl">
              {c.title}
            </h1>
            <p className="mt-9 max-w-2xl font-sans text-[15px] font-light leading-[1.95] text-muted-400">
              {c.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-t border-white/5 bg-ink-600 py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{c.offerEyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl font-light text-cream md:text-5xl">
              {c.offerTitle}
            </h2>
            <p className="mt-7 max-w-2xl font-sans text-[15px] font-light leading-[1.9] text-muted-400">
              {c.offerIntro}
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
            {c.services.map((s) => (
              <Reveal as="article" key={s.num}>
                <div className="flex items-baseline gap-5">
                  <span className="font-serif text-5xl font-light text-gold/25">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-cream">
                      {s.title}
                    </h3>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-sans text-[13px] font-light leading-[1.85] text-muted-400">
                  {s.body}
                </p>
                <ul className="mt-7 space-y-3 border-t border-white/5 pt-7">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 font-sans text-[13px] font-light leading-[1.6] text-muted"
                    >
                      <span className="mt-2 h-px w-4 shrink-0 bg-gold/50" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative overflow-hidden bg-ink py-28 md:py-36">
        <span className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 font-serif text-[300px] leading-none text-gold/[0.03] md:text-[460px]">
          &rdquo;
        </span>
        <div className="container-x relative z-10 text-center">
          <Reveal>
            <span className="font-serif text-6xl leading-none text-gold">
              &ldquo;
            </span>
            <blockquote className="mx-auto mt-6 max-w-4xl font-serif text-2xl font-light italic leading-[1.5] text-cream md:text-4xl md:leading-[1.45]">
              {c.quote}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-ink-600 py-28 md:py-36">
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
