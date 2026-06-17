// Parses the source itinerary HTML files into a normalized JSON seed.
// Run: node scripts/parse-itineraries.mjs
import { parse } from "node-html-parser";
import fs from "fs";
import path from "path";

const SRC = "/tmp/itin";
const FILES = [
  { slug: "heart-of-sogd", file: "heart-of-sogd.html" },
  { slug: "silk-road-pearls", file: "silk-road-pearls.html" },
  { slug: "classic-uzbekistan", file: "classic-uzbekistan.html" },
  { slug: "tashkent-facets", file: "tashkent-facets.html" },
];

const txt = (el) => (el ? el.text.replace(/\s+/g, " ").trim() : "");
const cls = (el) => (el ? el.getAttribute("class") || "" : "");

// Split a title node "Сердце<br><em>Согда</em>" into { main, accent }
function splitTitle(el) {
  if (!el) return { main: "", accent: "" };
  const em = el.querySelector("em");
  const accent = em ? em.text.trim() : "";
  // main = everything before <em>, strip <br>
  let main = el.innerHTML
    .replace(/<em>[\s\S]*?<\/em>/g, "")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return { main, accent };
}

function iconOf(block) {
  const i = block.querySelector(".block-icon i, .trip-icon i");
  return i ? (i.getAttribute("class") || "").replace(/\s+/g, " ").trim() : "";
}

function paragraphs(block) {
  return block
    .querySelectorAll(".body-text")
    .map((p) => p.text.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function tagsOf(block) {
  return block.querySelectorAll(".tag-row .tag").map((t) => t.text.trim());
}

function quoteOf(block) {
  const q = block.querySelector(".quote-text");
  return q ? q.text.replace(/\s+/g, " ").trim() : "";
}

function parseBlock(block) {
  const c = cls(block);
  const isOpt = c.includes("block-opt");
  const isSunset = c.includes("sunset-block");
  const base = {
    type: "text",
    opt: isOpt,
    sunset: isSunset,
    icon: iconOf(block),
    eyebrow: txt(block.querySelector(".block-eyebrow, .opt-label")),
    title: txt(block.querySelector(".block-title")),
    body: paragraphs(block),
    quote: quoteOf(block),
    tags: tagsOf(block),
    tip: "",
    data: null,
  };

  const tip = block.querySelector(".tip");
  if (tip && !block.querySelector(".block-title") && !block.querySelector(".body-text")) {
    base.type = "tip";
    base.tip = txt(tip);
    return base;
  }
  if (tip) base.tip = txt(tip);

  // --- inclusions ---
  if (c.includes("inclusions")) {
    base.type = "inclusions";
    base.title = txt(block.querySelector(".incl-label"));
    base.data = {
      items: block.querySelectorAll(".incl-item").map((it) => ({
        icon: (it.querySelector("i")?.getAttribute("class") || "").trim(),
        text: it.text.replace(/\s+/g, " ").trim(),
      })),
    };
    return base;
  }

  // --- train ---
  if (block.querySelector(".train-card")) {
    base.type = "train";
    const cities = block.querySelectorAll(".train-city").map((tc) => ({
      name: txt(tc.querySelector(".train-city-name")),
      sub: txt(tc.querySelector(".train-city-sub")),
    }));
    base.data = {
      cities,
      dur: txt(block.querySelector(".train-dur")),
      sub: txt(block.querySelector(".train-sub")),
    };
    return base;
  }

  // --- info-table ---
  if (block.querySelector(".info-table")) {
    base.type = "info-table";
    base.data = {
      rows: block.querySelectorAll(".info-table tr").map((tr) => {
        const tds = tr.querySelectorAll("td");
        return { key: txt(tds[0]), val: txt(tds[1]) };
      }),
    };
    return base;
  }

  // --- choice ---
  if (block.querySelector(".choice-grid")) {
    base.type = "choice";
    base.data = {
      cards: block.querySelectorAll(".choice-card").map((cc) => ({
        rec: cls(cc).includes("choice-card-rec"),
        eyebrow: txt(cc.querySelector(".choice-eyebrow")),
        title: txt(cc.querySelector(".choice-title-sm")),
        desc: txt(cc.querySelector(".choice-desc")),
      })),
    };
    return base;
  }

  // --- timeline ---
  if (block.querySelector(".tl-compact")) {
    base.type = "timeline";
    base.data = {
      rows: block.querySelectorAll(".tl-row").map((r) => ({
        time: txt(r.querySelector(".tl-time")),
        event: txt(r.querySelector(".tl-event")),
      })),
    };
    return base;
  }

  // --- stat ---
  if (block.querySelector(".stat-row")) {
    base.type = "stat";
    base.data = {
      cards: block.querySelectorAll(".stat-card").map((s) => ({
        val: txt(s.querySelector(".stat-val")),
        label: txt(s.querySelector(".stat-label")),
      })),
    };
    // stat blocks may also carry body/quote/timeline-after; keep body
    return base;
  }

  // --- compare ---
  if (block.querySelector(".compare-grid")) {
    base.type = "compare";
    base.data = {
      cards: block.querySelectorAll(".compare-card").map((cc) => ({
        label: txt(cc.querySelector(".compare-label")),
        name: txt(cc.querySelector(".compare-name")),
        rows: cc.querySelectorAll(".compare-row").map((r) => ({
          key: txt(r.querySelector(".cr-key")),
          val: txt(r.querySelector(".cr-val")),
        })),
      })),
    };
    return base;
  }

  // --- cols ---
  if (block.querySelector(".cols-grid")) {
    base.type = "cols";
    base.data = {
      cards: block.querySelectorAll(".cols-card").map((cc) => ({
        icon: (cc.querySelector(".cols-title i")?.getAttribute("class") || "").trim(),
        title: txt(cc.querySelector(".cols-title")),
        desc: txt(cc.querySelector(".cols-desc")),
      })),
    };
    return base;
  }

  // --- walk / shop ---
  if (block.querySelector(".walk-grid") || block.querySelector(".shop-grid")) {
    const isShop = !!block.querySelector(".shop-grid");
    base.type = isShop ? "shop" : "walk";
    base.data = {
      items: block.querySelectorAll(".walk-item, .shop-item").map((it) => ({
        icon: (it.querySelector(".walk-title i")?.getAttribute("class") || "").trim(),
        title: txt(it.querySelector(".walk-title, .shop-name")),
        desc: txt(it.querySelector(".walk-desc, .shop-desc")),
      })),
    };
    return base;
  }

  // --- trip (big day-trip cards) ---
  if (block.querySelector(".trip-grid")) {
    base.type = "trip";
    base.data = {
      cards: block.querySelectorAll(".trip-card").map((tc) => ({
        icon: (tc.querySelector(".trip-icon i")?.getAttribute("class") || "").trim(),
        eyebrow: txt(tc.querySelector(".trip-eyebrow")),
        title: txt(tc.querySelector(".trip-title")),
        desc: tc.querySelectorAll(".trip-desc").map((d) => d.text.replace(/\s+/g, " ").trim()),
        quote: txt(tc.querySelector(".quote-text")),
        meta: tc.querySelectorAll(".trip-meta-item").map((m) => ({
          key: txt(m.querySelector(".trip-meta-key")),
          val: txt(m.querySelector(".trip-meta-val")),
        })),
        tags: tc.querySelectorAll(".trip-tags .tag").map((t) => t.text.trim()),
      })),
    };
    base.tip = txt(block.querySelector(".tip"));
    return base;
  }

  // --- road ---
  if (block.querySelector(".road-strip")) {
    base.type = "road";
    base.data = {
      label: txt(block.querySelector(".road-strip-label")),
      stops: block.querySelectorAll(".road-item").map((it) => ({
        place: txt(it.querySelector(".road-place")),
        meta: txt(it.querySelector(".road-meta")),
        desc: txt(it.querySelector(".road-desc")),
      })),
    };
    return base;
  }

  // --- depart ---
  if (block.querySelector(".depart-grid")) {
    base.type = "depart";
    base.eyebrow = txt(block.querySelector(".block-eyebrow")) || base.eyebrow;
    base.data = {
      cards: block.querySelectorAll(".depart-card").map((dc) => {
        const bodyEl = dc.querySelector(".depart-body");
        const note = txt(dc.querySelector(".depart-note"));
        const noteEl = bodyEl?.querySelector(".depart-note");
        if (noteEl) noteEl.remove();
        return {
          eyebrow: txt(dc.querySelector(".depart-eyebrow")),
          title: txt(dc.querySelector(".depart-title")),
          body: txt(bodyEl),
          note,
        };
      }),
    };
    return base;
  }

  return base;
}

function parseFile({ slug, file }) {
  const html = fs.readFileSync(path.join(SRC, file), "utf8");
  const root = parse(html);

  const cover = {
    eyebrow: txt(root.querySelector(".cover-eyebrow")),
    title: splitTitle(root.querySelector(".cover-title")),
    subtitle: txt(root.querySelector(".cover-subtitle")),
    rule: txt(root.querySelector(".cover-rule span")),
    chips: root.querySelectorAll(".cover-chips .cover-chip").map((c) => c.text.trim()),
    tagline: txt(root.querySelector(".cover-tagline")),
  };

  const ov = root.querySelector(".overview");
  const ths = ov.querySelectorAll(".overview-table thead th");
  const overview = {
    eyebrow: txt(ov.querySelector(".overview-eyebrow")),
    title: txt(ov.querySelector(".overview-title")),
    meta: txt(ov.querySelector(".overview-meta")),
    col3: txt(ths[2]),
  };
  const ovRows = ov.querySelectorAll(".overview-table tbody tr").map((tr) => {
    const tds = tr.querySelectorAll("td");
    const cityTag = tds[2].querySelector(".city-tag");
    return {
      program: txt(tds[1]),
      city: txt(cityTag),
      gold: cls(cityTag).includes("c-gold"),
    };
  });

  const days = root.querySelectorAll(".day-section").map((sec, i) => {
    const blocks = sec
      .querySelectorAll(".day-body > .block, .day-body > .block-opt, .day-body > .inclusions, .day-body > .sunset-block")
      .map(parseBlock);
    return {
      num: txt(sec.querySelector(".day-num-ghost")),
      label: txt(sec.querySelector(".day-num-label")),
      title: splitTitle(sec.querySelector(".day-title")),
      subtitle: txt(sec.querySelector(".day-subtitle")),
      overview: ovRows[i] || { program: "", city: "", gold: false },
      blocks,
    };
  });

  const closing = root.querySelector(".closing");
  const out = {
    slug,
    theme: "dark",
    cover,
    overview,
    days,
    closing: {
      title: splitTitle(closing.querySelector(".closing-title")),
      text: txt(closing.querySelector(".closing-text")),
      route: closing.querySelectorAll(".route-city").map((r) => r.text.trim()),
      tagline: txt(closing.querySelector(".closing-tagline")),
    },
    footer: txt(root.querySelector(".footer-text")),
  };
  return out;
}

const result = FILES.map(parseFile);
const outPath = path.join(process.cwd(), "lib", "itineraries.seed.json");
fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf8");
console.log("Wrote", outPath);
for (const it of result) {
  console.log(
    `  ${it.slug}: ${it.days.length} days, blocks/day = ${it.days
      .map((d) => d.blocks.length)
      .join(",")}`
  );
}
