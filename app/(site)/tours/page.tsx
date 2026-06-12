import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getSettings, getTours } from "@/lib/queries";

export const metadata = {
  title: "Our Tours & Expeditions — Protocol",
};
export const dynamic = "force-dynamic";

const filters = [
  { label: "Destination", value: "All Destinations" },
  { label: "Duration", value: "Any Duration" },
  { label: "Tour Type", value: "All Types" },
];

export default function ToursPage() {
  const s = getSettings("tours");
  const tours = getTours();

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
            <p className="font-serif text-lg text-muted-400">
              {tours.length} journeys
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tour grid */}
      <section className="bg-ink pb-32">
        <div className="container-x grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <Reveal as="article" delay={(i % 3) * 120} key={tour.id}>
              <Link href="#" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
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
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                  <span className="font-serif text-xl text-gold">
                    {tour.price}
                  </span>
                  <span className="link-underline font-sans text-[9px] uppercase tracking-[0.25em] text-muted-400 group-hover:text-gold">
                    View Tour →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
