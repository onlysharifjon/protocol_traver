import type { ItineraryBlock } from "@/lib/queries";

function parseData<T>(raw: string): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function paras(body: string) {
  return body ? body.split(/\n\n+/).filter(Boolean) : [];
}
function tagList(tags: string) {
  return tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

function Header({ b }: { b: ItineraryBlock }) {
  if (!b.icon && !b.eyebrow && !b.title) return null;
  return (
    <div className="itin-block-header">
      {b.icon && (
        <div className="itin-icon">
          <i className={b.icon} />
        </div>
      )}
      <div>
        {b.eyebrow && <div className="itin-eyebrow">{b.eyebrow}</div>}
        {b.title && <div className="itin-block-title">{b.title}</div>}
      </div>
    </div>
  );
}

function Common({ b }: { b: ItineraryBlock }) {
  return (
    <>
      <Header b={b} />
      {paras(b.body).map((p, i) => (
        <p className="itin-text" key={i}>
          {p}
        </p>
      ))}
      {b.quote && (
        <div className="itin-quote">
          <div className="itin-quote-text">{b.quote}</div>
        </div>
      )}
      {tagList(b.tags).length > 0 && (
        <div className="itin-tags">
          {tagList(b.tags).map((t, i) => (
            <span className="itin-tag" key={i}>
              {t}
            </span>
          ))}
        </div>
      )}
      {b.tip && (
        <div className="itin-tip">
          <i className="ti ti-info-circle" />
          <span>{b.tip}</span>
        </div>
      )}
    </>
  );
}

type Card = { rec?: boolean; eyebrow?: string; title?: string; desc?: string };
type Train = { cities: { name: string; sub: string }[]; dur: string; sub: string };
type InfoT = { rows: { key: string; val: string }[] };
type Incl = { items: { icon: string; text: string }[] };
type Timeline = { rows: { time: string; event: string }[] };
type Stat = { cards: { val: string; label: string }[] };
type Compare = { cards: { label: string; name: string; rows: { key: string; val: string }[] }[] };
type Cols = { cards: { icon: string; title: string; desc: string }[] };
type Items = { items: { icon: string; title: string; desc: string }[] };
type Road = { label: string; stops: { place: string; meta: string; desc: string }[] };
type Depart = { cards: { eyebrow: string; title: string; body: string; note: string }[] };
type Trip = {
  cards: {
    icon: string;
    eyebrow: string;
    title: string;
    desc: string[];
    quote: string;
    meta: { key: string; val: string }[];
    tags: string[];
  }[];
};

export default function Block({ b }: { b: ItineraryBlock }) {
  const cls = `itin-block${b.opt ? " opt" : ""}${b.sunset ? " sunset" : ""}`;
  const optLabel = b.opt && (
    <div className="itin-opt-label">
      <i className="ti ti-plus" style={{ fontSize: 10 }} /> {b.eyebrow}
    </div>
  );

  switch (b.type) {
    case "inclusions": {
      const d = parseData<Incl>(b.data);
      return (
        <div className="itin-incl">
          <div className="itin-incl-label">{b.title || "Включено"}</div>
          <div className="itin-incl-grid">
            {d?.items.map((it, i) => (
              <div className="itin-incl-item" key={i}>
                {it.icon && <i className={it.icon} />} {it.text}
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "tip":
      return (
        <div className={cls}>
          <div className="itin-tip">
            <i className="ti ti-info-circle" />
            <span>{b.tip || b.body}</span>
          </div>
        </div>
      );
    case "train": {
      const d = parseData<Train>(b.data);
      return (
        <div className={cls}>
          <Header b={b} />
          <div className="itin-train">
            <div className="itin-train-city">
              <div className="itin-train-name">{d?.cities[0]?.name}</div>
              <div className="itin-train-sub">{d?.cities[0]?.sub}</div>
            </div>
            <div className="itin-train-mid">
              <div className="itin-train-line">
                <span className="itin-train-dot" />
                <span className="itin-train-dash" />
                <i className="ti ti-train" />
                <span className="itin-train-dash" />
                <span className="itin-train-dot" />
              </div>
              <div className="itin-train-dur">{d?.dur}</div>
              <div className="itin-train-label">{d?.sub}</div>
            </div>
            <div className="itin-train-city">
              <div className="itin-train-name">{d?.cities[1]?.name}</div>
              <div className="itin-train-sub">{d?.cities[1]?.sub}</div>
            </div>
          </div>
          {paras(b.body).map((p, i) => (
            <p className="itin-text" key={i}>{p}</p>
          ))}
          {b.quote && (
            <div className="itin-quote"><div className="itin-quote-text">{b.quote}</div></div>
          )}
        </div>
      );
    }
    case "info-table": {
      const d = parseData<InfoT>(b.data);
      return (
        <div className={cls}>
          <Common b={{ ...b, tip: "" }} />
          <div className="itin-divider" />
          <table className="itin-info">
            <tbody>
              {d?.rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.key}</td>
                  <td>{r.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {b.tip && (
            <div className="itin-tip"><i className="ti ti-info-circle" /><span>{b.tip}</span></div>
          )}
        </div>
      );
    }
    case "choice": {
      const d = parseData<{ cards: Card[] }>(b.data);
      return (
        <div className={cls}>
          <Header b={b} />
          <div className="itin-grid2">
            {d?.cards.map((c, i) => (
              <div className={`itin-cardlet${c.rec ? " rec" : ""}`} key={i}>
                <div className={`itin-cardlet-eyebrow${c.rec ? "" : " dim"}`}>{c.eyebrow}</div>
                <div className="itin-cardlet-title">{c.title}</div>
                <div className="itin-cardlet-desc">{c.desc}</div>
              </div>
            ))}
          </div>
          {b.quote && (
            <div className="itin-quote"><div className="itin-quote-text">{b.quote}</div></div>
          )}
        </div>
      );
    }
    case "timeline": {
      const d = parseData<Timeline>(b.data);
      return (
        <div className={cls}>
          <Common b={b} />
          <div className="itin-tl">
            {d?.rows.map((r, i) => (
              <div className="itin-tl-row" key={i}>
                <span className="itin-tl-time">{r.time}</span>
                <span className="itin-tl-event">{r.event}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "stat": {
      const d = parseData<Stat>(b.data);
      return (
        <div className={cls}>
          <Common b={b} />
          <div className="itin-stat">
            {d?.cards.map((c, i) => (
              <div className="itin-stat-card" key={i}>
                <div className="itin-stat-val">{c.val}</div>
                <div className="itin-stat-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "compare": {
      const d = parseData<Compare>(b.data);
      return (
        <div className={cls}>
          <Header b={b} />
          {optLabel}
          {paras(b.body).map((p, i) => (
            <p className="itin-text" key={i}>{p}</p>
          ))}
          <div className="itin-grid2">
            {d?.cards.map((c, i) => (
              <div className={`itin-cardlet${i === 0 ? " rec" : " dim-top"}`} key={i}>
                <div className={`itin-cardlet-eyebrow${i === 0 ? "" : " dim"}`}>{c.label}</div>
                <div className="itin-cardlet-title">{c.name}</div>
                {c.rows.map((r, j) => (
                  <div className="itin-kv" key={j}>
                    <span className="itin-kv-key">{r.key}</span>
                    <span className="itin-kv-val">{r.val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {b.tip && (
            <div className="itin-tip"><i className="ti ti-info-circle" /><span>{b.tip}</span></div>
          )}
        </div>
      );
    }
    case "cols": {
      const d = parseData<Cols>(b.data);
      return (
        <div className={cls}>
          <Common b={b} />
          <div className="itin-items">
            {d?.cards.map((c, i) => (
              <div className="itin-item" key={i}>
                <div className="itin-item-title">
                  {c.icon && <i className={c.icon} />} {c.title}
                </div>
                <div className="itin-item-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "walk":
    case "shop": {
      const d = parseData<Items>(b.data);
      return (
        <div className={cls}>
          <Common b={b} />
          <div className="itin-items">
            {d?.items.map((c, i) => (
              <div className="itin-item" key={i}>
                {b.type === "shop" ? (
                  <div className="itin-item-name">{c.title}</div>
                ) : (
                  <div className="itin-item-title">
                    {c.icon && <i className={c.icon} />} {c.title}
                  </div>
                )}
                <div className="itin-item-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "road": {
      const d = parseData<Road>(b.data);
      return (
        <div className={cls}>
          <Header b={b} />
          <div className="itin-road">
            <div className="itin-road-label">{d?.label}</div>
            {d?.stops.map((s, i) => (
              <div className="itin-road-item" key={i}>
                <span className="itin-road-dot" />
                <div>
                  <div className="itin-road-place">{s.place}</div>
                  {s.meta && <div className="itin-road-meta">{s.meta}</div>}
                  <div className="itin-road-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          {b.quote && (
            <div className="itin-quote"><div className="itin-quote-text">{b.quote}</div></div>
          )}
        </div>
      );
    }
    case "depart": {
      const d = parseData<Depart>(b.data);
      return (
        <div className={cls}>
          {b.eyebrow && <div className="itin-eyebrow" style={{ marginBottom: 14 }}>{b.eyebrow}</div>}
          <div className="itin-grid2">
            {d?.cards.map((c, i) => (
              <div className="itin-cardlet" key={i} style={{ padding: 0 }}>
                <div className={`itin-cardlet-head${i === 0 ? " rec" : " dim-top"}`} style={{ borderTop: "1px solid var(--i-gold)" }}>
                  <div className={`itin-cardlet-eyebrow${i === 0 ? "" : " dim"}`}>{c.eyebrow}</div>
                  <div className="itin-cardlet-title">{c.title}</div>
                </div>
                <div className="itin-cardlet-body">
                  {c.body}
                  {c.note && <div className="itin-cardlet-note">{c.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "trip": {
      const d = parseData<Trip>(b.data);
      return (
        <div className={cls}>
          <div className="itin-grid2">
            {d?.cards.map((c, i) => (
              <div className={`itin-trip-card ${i === 0 ? "a" : "b"}`} key={i}>
                {c.icon && (
                  <div className="itin-trip-icon">
                    <i className={c.icon} />
                  </div>
                )}
                <div className={`itin-cardlet-eyebrow${i === 0 ? "" : " dim"}`}>{c.eyebrow}</div>
                <div className="itin-trip-title">{c.title}</div>
                {c.desc.map((p, j) => (
                  <p className="itin-cardlet-desc" key={j}>{p}</p>
                ))}
                {c.quote && (
                  <div className="itin-quote" style={{ margin: "10px 0" }}>
                    <div className="itin-quote-text" style={{ fontSize: 15 }}>{c.quote}</div>
                  </div>
                )}
                {c.meta.map((m, j) => (
                  <div className="itin-kv" key={j}>
                    <span className="itin-kv-key">{m.key}</span>
                    <span className="itin-kv-val">{m.val}</span>
                  </div>
                ))}
                {c.tags?.length > 0 && (
                  <div className="itin-tags">
                    {c.tags.map((t, j) => (
                      <span className="itin-tag" key={j}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {b.tip && (
            <div className="itin-tip"><i className="ti ti-info-circle" /><span>{b.tip}</span></div>
          )}
        </div>
      );
    }
    default:
      return (
        <div className={cls}>
          {optLabel}
          <Common b={b} />
        </div>
      );
  }
}
