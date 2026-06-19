import Link from "next/link";
import { notFound } from "next/navigation";
import { getItinerary } from "@/lib/queries";
import { getLang } from "@/lib/locale";
import { t } from "@/lib/i18n";
import BookTour from "@/components/BookTour";
import Block from "@/components/itinerary/Blocks";
import "./itinerary.css";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const data = getItinerary(params.slug);
  if (!data) return { title: "Tour — Protocol" };
  const { itin } = data;
  const title = [itin.title_main, itin.title_accent].filter(Boolean).join(" ");
  return { title: `${title} — Protocol` };
}

export default function ItineraryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { theme?: string };
}) {
  const data = getItinerary(params.slug);
  if (!data) notFound();
  const { itin, days } = data;

  const lang = getLang();
  const ui = t(lang);
  const tourTitle = [itin.title_main, itin.title_accent].filter(Boolean).join(" ");

  const theme =
    searchParams.theme === "light" || searchParams.theme === "dark"
      ? searchParams.theme
      : String(itin.theme || "dark");
  const other = theme === "light" ? "dark" : "light";

  const chips = String(itin.chips || "").split(" · ").filter(Boolean);
  const route = String(itin.closing_route || "").split(" · ").filter(Boolean);
  const base = `/tours/${params.slug}`;

  return (
    <>
      {/* Tabler icon webfont used by the itinerary design */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
      />
      <div className="itin-root" data-itin-theme={theme}>
        <div className="itin-bar">
          <Link href="/tours" className="itin-back">
            ← Все туры
          </Link>
          <Link href={`${base}?theme=${other}`} className="itin-back">
            {theme === "light" ? "Тёмная тема" : "Светлая тема"}
          </Link>
        </div>

        {/* Cover */}
        <section className="itin-cover">
          <div className="itin-cover-ornament" />
          {itin.eyebrow && <div className="itin-cover-eyebrow">{String(itin.eyebrow)}</div>}
          <div className="itin-cover-logo">
            <div className="itin-logo">
              <div className="itin-logo-name" style={{ fontSize: 30 }}>Protocol</div>
              <div className="itin-logo-divider" style={{ width: 44, margin: "7px auto" }} />
              <div className="itin-logo-tag" style={{ fontSize: 9 }}>Travel Services</div>
            </div>
          </div>
          <h1 className="itin-cover-title">
            {String(itin.title_main)}
            {itin.title_accent ? (
              <>
                <br />
                <em>{String(itin.title_accent)}</em>
              </>
            ) : null}
          </h1>
          {itin.subtitle && <div className="itin-cover-subtitle">{String(itin.subtitle)}</div>}
          {itin.rule && (
            <div className="itin-cover-rule">
              <span>{String(itin.rule)}</span>
            </div>
          )}
          {chips.length > 0 && (
            <div className="itin-cover-chips">
              {chips.map((c, i) => (
                <div className="itin-cover-chip" key={i}>{c}</div>
              ))}
            </div>
          )}
          {itin.tagline && <div className="itin-cover-tagline">{String(itin.tagline)}</div>}
        </section>

        <div className="itin-wrap">
          {/* Overview */}
          <div className="itin-overview">
            <div className="itin-overview-head">
              <div>
                <div className="itin-overview-eyebrow">{String(itin.overview_eyebrow)}</div>
                <div className="itin-overview-title">{String(itin.overview_title)}</div>
              </div>
              <div className="itin-overview-meta">{String(itin.overview_meta)}</div>
            </div>
            <table className="itin-table">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>День</th>
                  <th>Программа</th>
                  <th style={{ width: 130 }}>{String(itin.overview_col3)}</th>
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr key={d.id}>
                    <td className="itin-dnum">{d.num}</td>
                    <td>{d.ov_program}</td>
                    <td>
                      <span className={`itin-citytag${d.ov_gold ? " gold" : ""}`}>{d.ov_city}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Days */}
          {days.map((d) => (
            <div className="itin-day" key={d.id}>
              <div className="itin-day-header">
                <div className="itin-day-header-inner">
                  <div className="itin-day-ghost">{d.num}</div>
                  <div>
                    <div className="itin-day-label">{d.label}</div>
                    <h2 className="itin-day-title">
                      {d.title_main}
                      {d.title_accent ? (
                        <>
                          {" "}
                          <em>{d.title_accent}</em>
                        </>
                      ) : null}
                    </h2>
                    <div className="itin-day-subtitle">{d.subtitle}</div>
                  </div>
                </div>
              </div>
              <div className="itin-day-body">
                {d.blocks.map((b) => (
                  <Block b={b} key={b.id} />
                ))}
              </div>
            </div>
          ))}

          {/* Closing */}
          <div className="itin-closing">
            <div className="itin-closing-ornament" />
            <h2 className="itin-closing-title">
              {String(itin.closing_title_main)}
              {itin.closing_title_accent ? (
                <>
                  {" "}
                  <em>{String(itin.closing_title_accent)}</em>
                </>
              ) : null}
            </h2>
            <p className="itin-closing-text">{String(itin.closing_text)}</p>
            {route.length > 0 && (
              <div className="itin-route">
                {route.map((c, i) => (
                  <span key={i} style={{ display: "contents" }}>
                    <span className="itin-route-city">{c}</span>
                    {i < route.length - 1 && <span className="itin-route-arrow">→</span>}
                  </span>
                ))}
              </div>
            )}
            {itin.closing_tagline && (
              <div className="itin-closing-tagline">{String(itin.closing_tagline)}</div>
            )}
          </div>

          {/* Booking / contact call-to-action */}
          <div className="itin-cta">
            <div className="itin-cta-buttons">
              <BookTour tourId={0} tourTitle={tourTitle} ui={ui} />
              <Link href="/#contact" className="itin-cta-contact">
                {lang === "ru" ? "Связаться" : "Contact Us"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
