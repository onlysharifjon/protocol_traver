import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  getSettings,
  getFeaturedTours,
  getHomeFeatures,
  getHomeStats,
} from "@/lib/queries";
import { getLang } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const lang = getLang();
  const ui = t(lang);
  const s = getSettings("home", lang);
  const featuredTours = getFeaturedTours(lang);
  const homeFeatures = getHomeFeatures(lang);
  const homeStats = getHomeStats(lang);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-home.jpg"
          alt="Registan Square, Samarkand illuminated at dusk"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="animate-slowZoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />
        <div className="absolute inset-0 bg-ink/15" />

        <div className="container-x relative z-10 text-center">
          <p className="animate-fadeUp font-sans text-[10px] uppercase tracking-[0.35em] text-gold">
            {s.home_hero_eyebrow}
          </p>
          <h1 className="mx-auto mt-8 max-w-4xl animate-fadeUp font-serif text-5xl font-light leading-[1.08] text-cream sm:text-6xl md:text-7xl lg:text-[84px]">
            {s.home_hero_title_1}
            <br />
            {s.home_hero_title_2}
          </h1>
          <p className="mx-auto mt-8 max-w-xl animate-fadeUp font-sans text-sm font-light leading-relaxed text-cream/70">
            {s.home_hero_subtitle}
          </p>
          <div className="mt-12 animate-fadeUp">
            <Link href="/tours" className="btn-ghost">
              {s.home_hero_button}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center">
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-cream/60">
            {ui.scroll}
          </span>
          <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ---------------- ABOUT INTRO ---------------- */}
      <section className="bg-ink py-28 md:py-36">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">{s.home_about_eyebrow}</p>
            <h2 className="mt-8 font-serif text-4xl font-light leading-[1.18] text-cream md:text-5xl">
              {s.home_about_heading}
            </h2>
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-center">
            <p className="font-sans text-[15px] font-light leading-[1.9] text-muted">
              {s.home_about_p1}
            </p>
            <p className="mt-7 font-sans text-[15px] font-light leading-[1.9] text-muted">
              {s.home_about_p2}
            </p>
            <Link
              href="/about"
              className="link-underline mt-9 w-fit font-sans text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              {s.home_about_link}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CURATED TOURS ---------------- */}
      <section className="bg-ink-600 py-28 md:py-36">
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">{s.home_featured_eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl font-light text-cream md:text-5xl">
                {s.home_featured_heading}
              </h2>
            </div>
            <Link
              href="/tours"
              className="link-underline font-sans text-[10px] uppercase tracking-[0.3em] text-muted-400 hover:text-gold"
            >
              {s.home_featured_link}
            </Link>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredTours.map((tour, i) => (
              <Reveal as="article" delay={i * 120} key={tour.title}>
                <Link href="/tours" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <span className="absolute left-5 top-4 font-serif text-5xl text-gold/20">
                      {tour.index}
                    </span>
                  </div>
                  <p className="mt-6 font-sans text-[9px] uppercase tracking-[0.3em] text-gold">
                    {tour.tagline}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-cream transition-colors group-hover:text-gold">
                    {tour.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-sans text-[11px] tracking-wide text-muted-400">
                      {tour.duration}
                    </span>
                    <span className="font-serif text-lg text-gold">
                      {tour.price}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="bg-ink py-28 md:py-32">
        <div className="container-x grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-12">
          {homeFeatures.map((f, i) => (
            <Reveal delay={i * 120} key={f.title}>
              <div className="mb-7 h-px w-12 bg-gold/40" />
              <h3 className="font-serif text-2xl font-normal text-cream">
                {f.title}
              </h3>
              <p className="mt-5 font-sans text-[13px] font-light leading-[1.85] text-muted-400">
                {f.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      {homeStats.length > 0 && (
        <section className="border-y border-white/5 bg-ink-900 py-20">
          <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">
            {homeStats.map((stat, i) => (
              <Reveal delay={i * 100} key={stat.label} className="text-center md:text-left">
                <div className="flex items-baseline justify-center gap-1 md:justify-start">
                  <span className="font-serif text-5xl font-light text-cream md:text-6xl">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-serif text-xl text-gold">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- TESTIMONIAL ---------------- */}
      <section className="relative overflow-hidden bg-ink py-32 md:py-40">
        <span className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 font-serif text-[400px] leading-none text-gold/[0.03] md:text-[600px]">
          &rdquo;
        </span>
        <div className="container-x relative z-10 text-center">
          <Reveal>
            <span className="font-serif text-7xl leading-none text-gold">
              &ldquo;
            </span>
            <blockquote className="mx-auto mt-6 max-w-4xl font-serif text-2xl font-light italic leading-[1.5] text-cream md:text-[40px] md:leading-[1.45]">
              {s.testimonial_quote}
            </blockquote>
            {(s.testimonial_name || s.testimonial_place) && (
              <div className="mt-12">
                {s.testimonial_name && (
                  <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-cream">
                    {s.testimonial_name}
                  </p>
                )}
                {s.testimonial_place && (
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-400">
                    {s.testimonial_place}
                  </p>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-36 md:py-44">
        <Image
          src="/images/tour-silkroad.jpg"
          alt="Ancient archway interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-x relative z-10 text-center">
          <Reveal>
            <p className="eyebrow">{s.home_cta_eyebrow}</p>
            <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl font-light leading-[1.12] text-cream md:text-6xl">
              {s.home_cta_title_1}
              <br />
              {s.home_cta_title_2}
            </h2>
            <div className="mt-12">
              <Link href="#contact" className="btn-ghost">
                {s.home_cta_button}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
