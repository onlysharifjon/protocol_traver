import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLang } from "@/lib/locale";
import { getSettings, getVipServices } from "@/lib/queries";

export const metadata = {
  title: "VIP Services — Protocol",
};
export const dynamic = "force-dynamic";

export default function VipServicesPage() {
  const lang = getLang();
  const s = getSettings("vip", lang);
  const services = getVipServices(lang);

  return (
    <>
      {/* Hero — text + portrait image */}
      <section className="bg-ink pb-20 pt-[140px] md:pb-28 md:pt-[190px]">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_460px] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{s.vip_eyebrow}</p>
            <h1 className="mt-6 font-serif text-5xl font-light leading-[1.0] text-cream md:text-6xl lg:text-7xl">
              {s.vip_title1}
              <br />
              {s.vip_title2}
            </h1>
            <p className="mt-9 max-w-xl font-sans text-[15px] font-light leading-[1.95] text-muted-400">
              {s.vip_intro}
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

      {/* Services — numbered blocks with tag, body and a details grid */}
      <section className="bg-ink-600 py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{s.vip_services_eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl font-light leading-[1.15] text-cream md:text-5xl">
              {s.vip_services_title1}
              <br />
              <em className="italic text-gold">{s.vip_services_title2}</em>
            </h2>
            <p className="mt-6 max-w-xl font-sans text-[14px] font-light leading-[1.85] text-muted-400">
              {s.vip_services_intro}
            </p>
          </Reveal>

          <div className="mt-20">
            {services.map((sv, i) => (
              <Reveal key={sv.id}>
                <div
                  className={`grid grid-cols-1 gap-8 border-gold/15 pb-14 md:grid-cols-[90px_1fr] ${
                    i < services.length - 1 ? "mb-14 border-b" : ""
                  }`}
                >
                  <div className="font-serif text-4xl font-light leading-none text-gold/25">
                    {sv.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-cream">
                      {sv.title}
                    </h3>
                    <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.25em] text-gold">
                      {sv.tag}
                    </p>
                    <p className="mt-5 max-w-2xl font-sans text-[14px] font-light leading-[1.85] text-muted-400">
                      {sv.body}
                    </p>
                    <div className="mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                      {sv.details.map((d) => (
                        <div
                          key={d}
                          className="flex items-baseline gap-3 font-sans text-[12px] font-light leading-[1.6] text-muted-400"
                        >
                          <span className="shrink-0 text-gold">—</span>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="border border-gold/15 bg-ink-600 p-10 md:p-14">
              <p className="max-w-3xl font-serif text-xl font-light italic leading-[1.55] text-cream md:text-2xl">
                «{s.vip_quote}»
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink pb-28 md:pb-36">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-4xl font-light italic text-cream md:text-5xl">
              {s.vip_cta_title}
            </h2>
            <div className="mt-12">
              <Link href="#contact" className="btn-ghost">
                {s.vip_cta_button}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
