import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getSettings, getTimeline, getTeam, getPartners } from "@/lib/queries";

export const metadata = {
  title: "Our Story — Protocol",
};
export const dynamic = "force-dynamic";

export default function AboutPage() {
  const s = getSettings("about");
  const timeline = getTimeline();
  const team = getTeam();
  const partners = getPartners();

  return (
    <>
      {/* Header */}
      <section className="bg-ink pb-14 pt-[160px] md:pt-[200px]">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{s.about_eyebrow}</p>
            <h1 className="mt-6 font-serif text-6xl font-light leading-[0.92] text-cream md:text-8xl lg:text-[112px]">
              {s.about_title_1}
              <br />
              {s.about_title_2}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Full-width hero image */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden md:h-[55vh]">
        <Image
          src="/images/about-hero.jpg"
          alt="Bukhara old city — the ancient Kalon minaret"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <span className="absolute bottom-6 right-6 font-sans text-[9px] uppercase tracking-[0.2em] text-cream/40">
          {s.about_hero_caption}
        </span>
      </section>

      {/* Mission */}
      <section className="bg-ink py-28 md:py-36">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[340px_1fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/founder.jpg"
                alt="Akbar Rakhimov, founder of Protocol Travel Services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6">
                <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-gold">
                  Founder &amp; Director
                </p>
                <p className="mt-2 font-serif text-xl text-cream">
                  {s.about_founder_signature}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">{s.about_mission_eyebrow}</p>
            <h2 className="mt-7 font-serif text-3xl font-light leading-[1.22] text-cream md:text-5xl">
              {s.about_mission_heading}{" "}
              <span className="italic text-gold">{s.about_mission_highlight}</span>
            </h2>
            <p className="mt-10 font-sans text-sm font-light leading-[1.95] text-muted-500">
              {s.about_founder_p1}
            </p>
            <p className="mt-6 font-sans text-sm font-light leading-[1.95] text-muted-500">
              {s.about_founder_p2}
            </p>
            <p className="mt-8 font-serif text-2xl italic text-cream/40">
              {s.about_founder_signature}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink-600 py-28 md:py-36">
        <div className="container-x">
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">{s.about_milestones_eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] text-cream md:text-5xl">
                {s.about_milestones_title_1}
                <br />
                {s.about_milestones_title_2}
              </h2>
            </div>
            <p className="max-w-md font-sans text-[13px] font-light leading-[1.85] text-muted-600 lg:ml-auto">
              {s.about_milestones_intro}
            </p>
          </Reveal>

          <div className="mt-16 border-t border-white/5">
            {timeline.map((item, i) => (
              <Reveal
                key={item.year}
                delay={(i % 2) * 80}
                className="grid grid-cols-1 gap-4 border-b border-white/5 py-10 md:grid-cols-[120px_1fr] md:gap-12"
              >
                <span className="font-serif text-3xl text-gold md:text-right">
                  {item.year}
                </span>
                <div className="max-w-2xl">
                  <h3 className="font-serif text-xl text-cream">{item.title}</h3>
                  <p className="mt-3 font-sans text-xs font-light leading-[1.85] text-muted-500">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ink py-28 md:py-36">
        <div className="container-x">
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">{s.about_team_eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl font-light text-cream md:text-5xl">
                {s.about_team_heading}
              </h2>
            </div>
            <p className="max-w-md font-sans text-[13px] font-light leading-[1.85] text-muted-600 lg:ml-auto">
              {s.about_team_intro}
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="article" delay={(i % 4) * 100} key={m.name}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                </div>
                <p className="mt-5 font-sans text-[9px] uppercase tracking-[0.25em] text-gold">
                  {m.role}
                </p>
                <h3 className="mt-2 font-serif text-xl text-cream">{m.name}</h3>
                <p className="mt-3 font-sans text-[11px] font-light leading-[1.7] text-muted-500">
                  {m.bio}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-white/5 bg-ink-900 py-20">
        <div className="container-x text-center">
          <Reveal>
            <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-muted-700">
              {s.about_partners_heading}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {partners.map((p) => (
                <span
                  key={p}
                  className="font-serif text-sm tracking-wide text-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
