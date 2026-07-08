import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getSettings, getDestinations } from "@/lib/queries";
import { getLang } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { slugForName } from "@/lib/destination-guides";

export const metadata = {
  title: "Destinations — Protocol",
};
export const dynamic = "force-dynamic";

type Destination = ReturnType<typeof getDestinations>[number];
type UI = ReturnType<typeof t>;

const aspectBySpan: Record<string, string> = {
  tall: "aspect-[7/8]",
  medium: "aspect-[1/1]",
  short: "aspect-[5/4]",
};

function DestinationCard({ d, ui }: { d: Destination; ui: UI }) {
  // Cities with a full guide page link to it; others fall back to the
  // filtered tours list.
  const slug = slugForName(d.name);
  const href = slug ? `/destinations/${slug}` : `/tours?dest=${encodeURIComponent(d.name)}`;
  return (
    <Link href={href} className="group relative block overflow-hidden">
      <div className={`relative w-full ${aspectBySpan[d.span] ?? "aspect-[4/5]"}`}>
        {/* Background image via CSS so any admin-uploaded file (any format)
            renders reliably without the next/image optimiser. */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] group-hover:scale-105"
          style={{ backgroundImage: `url("${d.image}")` }}
          role="img"
          aria-label={d.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/10" />
      </div>

      <span className="absolute right-5 top-5 font-sans text-[9px] uppercase tracking-[0.25em] text-gold">
        {d.tours}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold/70">
          {ui.countryLabel}
        </p>
        <h3 className="mt-3 font-serif text-4xl font-light text-cream md:text-5xl">
          {d.name}
        </h3>
        <p className="mt-3 max-w-xs font-sans text-xs font-light leading-relaxed text-cream/60">
          {d.blurb}
        </p>
        <span className="link-underline mt-5 inline-block font-sans text-[9px] uppercase tracking-[0.3em] text-gold opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
          {ui.discover}
        </span>
      </div>
    </Link>
  );
}

export default function DestinationsPage() {
  const lang = getLang();
  const ui = t(lang);
  const s = getSettings("destinations", lang);
  const destinations = getDestinations(lang);
  const left = destinations.filter((_, i) => i % 2 === 0);
  const right = destinations.filter((_, i) => i % 2 === 1);

  return (
    <>
      {/* Header */}
      <section className="bg-ink pb-16 pt-[160px] md:pt-[200px]">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="eyebrow">{s.dest_eyebrow}</p>
            <h1 className="mt-6 font-serif text-5xl font-light leading-[1] text-cream sm:text-6xl sm:leading-[0.95] md:text-8xl lg:text-[96px]">
              {s.dest_title}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md font-sans text-[13px] font-light leading-[1.85] text-muted-600 lg:ml-auto">
              {s.dest_intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Masonry */}
      <section className="bg-ink pb-32">
        <div className="container-x">
          {/* Mobile: single column */}
          <div className="flex flex-col gap-6 md:hidden">
            {destinations.map((d) => (
              <Reveal key={d.id}>
                <DestinationCard d={d} ui={ui} />
              </Reveal>
            ))}
          </div>

          {/* Desktop: two staggered columns */}
          <div className="hidden gap-6 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-6">
              {left.map((d, i) => (
                <Reveal delay={i * 100} key={d.id}>
                  <DestinationCard d={d} ui={ui} />
                </Reveal>
              ))}
            </div>
            <div className="flex flex-col gap-6 md:pt-16">
              {right.map((d, i) => (
                <Reveal delay={i * 100} key={d.id}>
                  <DestinationCard d={d} ui={ui} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Closing line */}
          <Reveal className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-12 md:flex-row md:items-center">
            <p className="max-w-xl font-serif text-2xl font-light italic text-muted-700">
              &ldquo;{s.dest_quote}&rdquo;
            </p>
            <Link
              href="#contact"
              className="link-underline whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.3em] text-gold"
            >
              {s.dest_cta_link}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
