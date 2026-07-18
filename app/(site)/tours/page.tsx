import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BookTour from "@/components/BookTour";
import { getSettings, getTours, getItineraries } from "@/lib/queries";
import { getLang } from "@/lib/locale";
import { t } from "@/lib/i18n";

import { localizedMeta } from "@/lib/page-meta";

export function generateMetadata() {
  return localizedMeta({
    ru: {
      title: "Туры и программы",
      description:
        "Частные туры по Узбекистану и Шёлковому пути: авторские маршруты по Самарканду, Бухаре, Хиве и Ташкенту с личным гидом и полным сопровождением.",
    },
    en: {
      title: "Tours & Expeditions",
      description:
        "Private tours of Uzbekistan and the Silk Road: bespoke itineraries through Samarkand, Bukhara, Khiva and Tashkent with a private guide and full support.",
    },
  });
}
export const dynamic = "force-dynamic";

export default function ToursPage({
  searchParams,
}: {
  searchParams?: { dest?: string };
}) {
  const lang = getLang();
  const ui = t(lang);
  const s = getSettings("tours", lang);
  const allTours = getTours(lang);

  // Optional destination filter (set from the Destinations page cards).
  const dest = searchParams?.dest?.trim() || "";
  const matched = dest ? allTours.filter((tr) => tr.place === dest) : [];
  // Fall back to the full list when a destination has no dedicated tour yet,
  // so the page is never empty.
  const tours = dest && matched.length > 0 ? matched : allTours;

  const itineraries = getItineraries(lang);

  const filters = [
    { label: ui.filterDestination, value: dest || ui.allDestinations },
    { label: ui.filterDuration, value: ui.anyDuration },
    { label: ui.filterTourType, value: ui.allTypes },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-ink px-0 pb-16 pt-[160px] md:pt-[200px]">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">{s.tours_eyebrow}</p>
              <h1 className="mt-6 font-serif text-5xl font-light leading-[1.05] text-cream md:text-7xl lg:text-[80px]">
                {s.tours_title_1}
                <br />
                <span className="italic text-gold">{s.tours_title_2}</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-md font-sans text-[13px] font-light leading-[1.85] text-muted-500 lg:ml-auto">
                {s.tours_intro}
              </p>
            </Reveal>
          </div>

          {/* Filter bar */}
          <Reveal
            delay={200}
            className="mt-14 flex flex-col gap-6 border-y border-white/5 py-6 md:flex-row md:items-center md:justify-between"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-12">
              {filters.map((f) => (
                <div key={f.label}>
                  <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-muted-400">
                    {f.label}
                  </p>
                  <button className="mt-2 flex items-center gap-2 font-sans text-xs tracking-wide text-muted-400 transition-colors hover:text-cream">
                    {f.value}
                    <span className="text-gold">↓</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {dest && (
                <Link
                  href="/tours"
                  className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold hover:text-cream"
                >
                  ✕ {ui.allDestinations}
                </Link>
              )}
              <p className="font-serif text-lg text-muted-400">
                {tours.length} {ui.journeys}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Detailed day-by-day programmes */}
      {itineraries.length > 0 && (
        <section className="bg-ink pb-24">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">
                {lang === "en" ? "Day-by-day programmes" : "Программы по дням"}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-cream md:text-4xl">
                {lang === "en" ? "Signature itineraries" : "Авторские маршруты"}
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {itineraries.map((it, i) => {
                const title = [it.title_main, it.title_accent].filter(Boolean).join(" ");
                return (
                  <Reveal as="article" delay={(i % 2) * 120} key={it.id}>
                    <Link
                      href={`/tours/${it.slug}`}
                      className="group block border border-white/10 bg-ink-600 p-8 transition-colors hover:border-gold/40"
                    >
                      <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
                        {it.eyebrow}
                      </p>
                      <h3 className="mt-4 font-serif text-3xl font-light text-cream transition-colors group-hover:text-gold">
                        {title}
                      </h3>
                      <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-muted-400">
                        {it.cities_label}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                        <span className="font-sans text-[11px] tracking-wide text-muted-400">
                          {it.duration_label}
                        </span>
                        <span className="link-underline font-sans text-[9px] uppercase tracking-[0.25em] text-gold">
                          {lang === "en" ? "View programme →" : "Смотреть программу →"}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tour grid */}
      <section className="bg-ink pb-32">
        <div className="container-x grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <Reveal as="article" delay={(i % 3) * 120} key={tour.id}>
              <div className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-3">
                    <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-gold">
                      {tour.category}
                    </span>
                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-cream/50">
                      {tour.place}
                    </span>
                  </div>
                </div>

                <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.25em] text-muted-400">
                  {tour.duration}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-cream transition-colors group-hover:text-gold">
                  {tour.title}
                </h3>
                <p className="mt-4 font-sans text-xs font-light leading-[1.85] text-muted-500">
                  {tour.body}
                </p>
                <div className="mt-6 border-t border-white/5 pt-5">
                  <BookTour tourId={tour.id} tourTitle={tour.title} ui={ui} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
