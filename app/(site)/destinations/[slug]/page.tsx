import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideNav from "@/components/GuideNav";
import { getLang } from "@/lib/locale";
import { getGuide, guideSlugs, type Block, type Section } from "@/lib/destination-guides";
import "./guide.css";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const lang = getLang();
  const guide = getGuide(params.slug, lang);
  if (!guide) return {};
  const city = guide.cover.title;
  const label = lang === "ru" ? "Гид по направлению" : "Destination Guide";
  return {
    title: `${city} — ${label}`,
    description: guide.cover.subtitle,
    openGraph: { title: `${city} — ${label}`, description: guide.cover.subtitle },
  };
}

function html(s: string) {
  return { __html: s };
}

function BlockView({ b, lang }: { b: Block; lang: "ru" | "en" }) {
  switch (b.t) {
    case "lede":
      return <p className="dg-lede" dangerouslySetInnerHTML={html(b.html)} />;
    case "p":
      return <p className="dg-body" dangerouslySetInnerHTML={html(b.html)} />;
    case "quote":
      return (
        <div className="dg-quote">
          <div className="dg-quote-text" dangerouslySetInnerHTML={html(b.html)} />
        </div>
      );
    case "eras":
      return (
        <div className="dg-eras">
          {b.items.map((e, i) => (
            <div className="dg-era" key={i}>
              <div className="dg-era-period">{e.period}</div>
              <div className="dg-era-text" dangerouslySetInnerHTML={html(e.text)} />
            </div>
          ))}
        </div>
      );
    case "stats":
      return (
        <div className="dg-stats">
          {b.items.map((s, i) => (
            <div className="dg-stat" key={i}>
              <div className="dg-stat-val">{s.val}</div>
              <div className="dg-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case "feature":
      return (
        <div className="dg-feature">
          <div className="dg-feature-title">{b.title}</div>
          <div className="dg-feature-desc">{b.desc}</div>
        </div>
      );
    case "districts":
      return (
        <div className="dg-districts">
          {b.items.map((d, i) => (
            <div className="dg-district" key={i}>
              <div className="dg-district-num">{d.num}</div>
              <div>
                <div className="dg-district-name">{d.name}</div>
                <div className="dg-district-tag">{d.tag}</div>
                <div className="dg-district-desc">{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className="dg-cards">
          {b.items.map((c, i) => (
            <div className="dg-card" key={i}>
              {c.icon && (
                <div className="dg-card-name">
                  <i className={c.icon} /> {c.name}
                </div>
              )}
              {!c.icon && <div className="dg-card-name">{c.name}</div>}
              <div className="dg-card-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      );
    case "contrast":
      return (
        <div className="dg-contrast">
          {b.items.map((c, i) => (
            <div className={`dg-contrast-card ${c.accent}`} key={i}>
              <div className={`dg-contrast-label ${c.accent}`}>{c.label}</div>
              <div className="dg-contrast-title">{c.title}</div>
              <div className="dg-contrast-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      );
    case "food":
      return (
        <div className="dg-food">
          {b.items.map((f, i) => (
            <div className="dg-food-item" key={i}>
              <div className="dg-food-name">{f.name}</div>
              <div className="dg-food-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      );
    case "climate":
      return (
        <table className="dg-climate">
          <thead>
            <tr>
              <th>{lang === "ru" ? "Сезон" : "Season"}</th>
              <th>{lang === "ru" ? "Температура" : "Temperature"}</th>
              <th>{lang === "ru" ? "Характер" : "Notes"}</th>
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, i) => (
              <tr key={i}>
                <td>{r.season}</td>
                <td>{r.temp}</td>
                <td>{r.character}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "tags":
      return (
        <div className="dg-tags">
          {b.items.map((t, i) => (
            <span className="dg-tag" key={i}>
              {t}
            </span>
          ))}
        </div>
      );
  }
}

function SectionView({ s, lang }: { s: Section; lang: "ru" | "en" }) {
  return (
    <div id={s.id} className="dg-section">
      <div className="dg-eyebrow">{s.eyebrow}</div>
      <h2 className="dg-title" dangerouslySetInnerHTML={html(s.title)} />
      {s.blocks.map((b, i) => (
        <BlockView b={b} lang={lang} key={i} />
      ))}
    </div>
  );
}

export default function DestinationGuidePage({ params }: { params: { slug: string } }) {
  const lang = getLang();
  const guide = getGuide(params.slug, lang);
  if (!guide) notFound();

  const navItems = guide.sections.map((s) => ({ id: s.id, label: s.nav }));

  return (
    <>
      {/* Tabler icons webfont — used by guide card icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
      />
      <div className="dg-root">
        {/* Cover */}
        <section className="dg-cover">
          <div className="dg-cover-ornament" />
          <div className="dg-cover-eyebrow">{guide.cover.eyebrow}</div>
          <h1 className="dg-cover-title">{guide.cover.title}</h1>
          <p className="dg-cover-subtitle">{guide.cover.subtitle}</p>
          <div className="dg-cover-rule">
            <span>{guide.cover.rule}</span>
          </div>
          <div className="dg-cover-stats">
            {guide.cover.stats.map((s, i) => (
              <div className="dg-cover-stat" key={i}>
                <div className="dg-cover-stat-val">{s.val}</div>
                <div className="dg-cover-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <GuideNav items={navItems} />

        <div className="dg-page">
          {guide.sections.map((s) => (
            <SectionView s={s} lang={lang} key={s.id} />
          ))}

          {/* Closing */}
          <div className="dg-closing">
            <div className="dg-closing-ornament" />
            <h2 className="dg-closing-title" dangerouslySetInnerHTML={html(guide.closing.title)} />
            <p className="dg-closing-text">{guide.closing.text}</p>
            <div className="dg-closing-tagline">{guide.closing.tagline}</div>
            <div className="dg-cta">
              <Link href="/tours" className="primary">
                {lang === "ru" ? "Смотреть туры" : "View tours"}
              </Link>
              <Link href="/#contact">{lang === "ru" ? "Связаться" : "Contact us"}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Pre-generate the known guide routes.
export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}
