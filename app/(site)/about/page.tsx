import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLang } from "@/lib/locale";
import { getSettings } from "@/lib/queries";

export const metadata = {
  title: "About — Protocol",
};
export const dynamic = "force-dynamic";

const GOLD_LIGHT = "#e4c97e";

const pillarIcons = [
  <path key="0" d="M3 21h18M5 21V7l7-4 7 4v14M9 9v.01M9 13v.01M9 17v.01M15 9v.01M15 13v.01M15 17v.01" />,
  <g key="1">
    <rect x="3" y="11" width="18" height="7" rx="2" />
    <path d="M5 11l2-5h10l2 5M7 18v2M17 18v2" />
  </g>,
  <path key="2" d="M4 3v18M4 8h4M4 13h4M16 3c-2 0-3 2-3 4s1 4 3 4 3-2 3-4-1-4-3-4zM16 11v10" />,
];

export default function AboutPage() {
  const lang = getLang();
  const s = getSettings("about", lang);

  // Repeating blocks are stored as numbered keys; reconstruct them into lists.
  const intro = [1, 2, 3, 4].map((i) => ({
    label: s[`about_intro${i}_label`] ?? "",
    text: s[`about_intro${i}_text`] ?? "",
  }));
  const originText = (s.about_origin_text ?? "").split("\n\n").filter(Boolean);
  const pillars = [1, 2, 3].map((i) => ({
    title: s[`about_pillar${i}_title`] ?? "",
    text: s[`about_pillar${i}_text`] ?? "",
  }));
  const compare = [1, 2, 3].map((i) => ({
    against: s[`about_compare${i}_against`] ?? "",
    protocol: s[`about_compare${i}_protocol`] ?? "",
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-[150px] text-center md:pt-[190px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <Reveal className="relative">
          <p className="eyebrow">{s.about_hero_eyebrow}</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-light leading-[1.15] text-cream md:text-6xl lg:text-[68px]">
            {s.about_hero_title1}
            <br />
            {s.about_hero_title2}
            <em className="italic" style={{ color: GOLD_LIGHT }}>
              {s.about_hero_title_em}
            </em>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg font-light italic leading-[1.6] text-cream/80 md:text-xl">
            {s.about_hero_lead}
          </p>
        </Reveal>
      </section>

      {/* 01 — Who we are */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{s.about_s1_num}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {s.about_s1_title1}
              <br />
              {s.about_s1_title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{s.about_s1_title_em}</em>
            </h2>
            <p className="mt-8 max-w-2xl font-serif text-xl font-light italic leading-[1.55] text-cream">
              {s.about_s1_lead}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {intro.map((b, i) => (
              <Reveal delay={(i % 2) * 100} key={b.label || i}>
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
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{s.about_s2_num}</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {s.about_s2_title1}
              <br />
              {s.about_s2_title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{s.about_s2_title_em}</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-1 gap-8 border border-white/10 bg-ink-500/40 p-8 md:grid-cols-[200px_1fr] md:gap-10 md:p-12">
              <div>
                <div className="font-serif text-6xl font-light leading-none" style={{ color: GOLD_LIGHT }}>
                  {s.about_origin_year}
                </div>
                <div className="mt-3 font-sans text-[9px] uppercase tracking-[0.25em] text-muted-400">
                  {s.about_origin_label}
                </div>
              </div>
              <div className="space-y-5 font-sans text-[14px] font-light leading-[1.85] text-cream/75">
                {originText.map((p, i) => (
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
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{s.about_s3_num}</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {s.about_s3_title1}
              <br />
              {s.about_s3_title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{s.about_s3_title_em}</em>
            </h2>
            <p className="mt-8 max-w-2xl font-sans text-sm font-light leading-[1.85] text-cream/70">
              {s.about_s3_body}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal delay={(i % 3) * 100} key={p.title || i}>
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
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-gold">{s.about_s4_num}</p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-cream md:text-5xl">
              {s.about_s4_title1}
              <br />
              {s.about_s4_title2}
              <em className="italic" style={{ color: GOLD_LIGHT }}>{s.about_s4_title_em}</em>
            </h2>
          </Reveal>

          <div className="mt-12 overflow-hidden border border-white/10">
            {compare.map((row, i) => (
              <Reveal key={i}>
                <div className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-2">
                  <div className="relative bg-ink-600 p-7 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[#4a3030]">
                    <p className="font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-[#8a6060]">
                      {s.about_against_label}
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
              {s.about_cta_pre}
              <span style={{ color: GOLD_LIGHT }}>{s.about_cta_accent}</span>
              {s.about_cta_post}
            </p>
            <div className="mt-10">
              <Link href="#contact" className="btn-ghost">
                {s.about_cta_button}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
