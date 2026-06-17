import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { content, LOCALES, SETTING_KEY_GROUP, type Locale } from "./data";

type ItinTitle = { main: string; accent: string };
type ItinBlock = {
  type: string;
  opt?: boolean;
  sunset?: boolean;
  icon?: string;
  eyebrow?: string;
  title?: string;
  body?: string[];
  quote?: string;
  tags?: string[];
  tip?: string;
  data?: unknown;
};
type ItinDay = {
  num: string;
  label: string;
  title: ItinTitle;
  subtitle: string;
  overview: { program: string; city: string; gold: boolean };
  blocks: ItinBlock[];
};
type ItinSeed = {
  slug: string;
  theme: string;
  cover: {
    eyebrow: string;
    title: ItinTitle;
    subtitle: string;
    rule: string;
    chips: string[];
    tagline: string;
  };
  overview: { eyebrow: string; title: string; meta: string; col3: string };
  days: ItinDay[];
  closing: { title: ItinTitle; text: string; route: string[]; tagline: string };
  footer: string;
};

// --- Connection (singleton across hot reloads) ---
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "protocol.db");

function createConnection(): Database.Database {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 8000");
  db.pragma("foreign_keys = ON");
  migrateLegacySchema(db);
  initSchema(db);
  seedIfEmpty(db);
  seedItineraries(db);
  seedVipDestinations(db);
  return db;
}

// --- VIP destinations seed (idempotent) ---
const VIP_DESTINATIONS: {
  eyebrow: string;
  title: string;
  body_ru: string;
  body_en: string;
  image: string;
}[] = [
  {
    eyebrow: "Жемчужина Востока / Pearl of the East",
    title: "Самарканд / Samarkand",
    body_ru:
      "Город, в котором синева небес отражается в куполах тысячелетней империи. Самарканд — сердце Шёлкового пути — предлагает закат над Регистаном в абсолютном уединении, ужин среди мозаик XV века и ночлег в особняке, где история — не экспонат, а живой воздух вокруг вас.",
    body_en:
      "A city where the blue of the heavens mirrors the domes of a millennial empire. Samarkand — the soul of the Silk Road — offers a private sunset over the Registan, dinner among 15th-century mosaics, and nights in a residence where history isn't a museum piece, it's the very air you breathe.",
    image: "/images/dest-samarkand.jpg",
  },
  {
    eyebrow: "Священный город / Sacred City",
    title: "Бухара / Bukhara",
    body_ru:
      "Бухара не меняется — она вечна. Здесь каждая улочка хранит тайну, а воздух пропитан шафраном и молитвой. Эксклюзивный опыт — закрытый доступ в медресе на рассвете, ночь в рияде с личным дворецким и шёлковые ткани прямо с рук мастера, чья семья ткёт уже восемь поколений.",
    body_en:
      "Bukhara doesn't change — it endures. Every alleyway holds a secret; the air is steeped in saffron and prayer. Exclusive access to a madrassa at dawn, a night in a private riad with a personal butler, and silk purchased directly from a master whose family has woven for eight generations.",
    image: "/images/dest-bukhara.jpg",
  },
  {
    eyebrow: "Затерянный оазис / Lost Oasis",
    title: "Хива / Khiva",
    body_ru:
      "Когда стены Ичан-калы закрываются на рассвете только для вас — понимаешь, что попал в другое измерение. Хива — музей под открытым небом, дошедший до нас нетронутым сквозь века. Приватная прогулка по крепостным стенам, ужин на кровле с видом на пустыню Кызылкум и звёздное небо без единого огня вокруг — вот роскошь, которую не купить нигде больше.",
    body_en:
      "When the walls of Ichan-Kala open at dawn for you alone, you understand you've crossed into another dimension. Khiva is an open-air museum delivered intact across the centuries. A private walk along the fortress ramparts, dinner on a rooftop facing the Kyzylkum desert, and a starlit sky with no light for miles — a luxury found nowhere else on earth.",
    image: "/images/dest-khiva.jpg",
  },
  {
    eyebrow: "Столица / Capital",
    title: "Ташкент / Tashkent",
    body_ru:
      "Восток встречается с авангардом. Ташкент — это динамичная столица, где советский модернизм соседствует с древними базарами и ультрасовременными кварталами. Для взыскательного путешественника — закрытые дегустации, апартаменты с видом на ночной город и персональный гид, открывающий ворота туда, куда не ступает случайный турист.",
    body_en:
      "Where East meets the avant-garde. Tashkent is a vibrant capital where Soviet modernism stands alongside ancient bazaars and cutting-edge districts. For the discerning traveller — private tastings, suites overlooking the glittering city skyline, and a personal guide who unlocks doors no casual tourist ever finds.",
    image: "/images/dest-tashkent.jpg",
  },
  {
    eyebrow: "Колыбель ремёсел / Cradle of Crafts",
    title: "Ферганская долина / Fergana Valley",
    body_ru:
      "Там, где горы смыкаются в объятиях, рождается самое сердце Средней Азии. Ферганская долина — это живая легенда шёлка, фарфора и пряностей, где мастера передают секреты из рук в руки уже тысячу лет. Для избранного гостя — частный визит в ателье икат-ткачества, дегустация редких сортов плова прямо у тандыра и рассвет над виноградниками, о котором не пишут в путеводителях.",
    body_en:
      "Cradled between mountain ranges lies the very heart of Central Asia. The Fergana Valley is a living legend of silk, porcelain, and spice, where masters have passed their secrets hand to hand for a thousand years. For the privileged guest — a private visit to an ikat weaving atelier, a tasting of rare plov varieties straight from the tandoor, and a dawn over the vineyards that no guidebook has ever described.",
    image: "/images/dest-fergana.jpg",
  },
];

function seedVipDestinations(db: Database.Database) {
  const tx = db.transaction(() => {
    const n = db.prepare("SELECT COUNT(*) AS n FROM vip_destinations").get() as {
      n: number;
    };
    if (n.n > 0) return;
    const stmt = db.prepare(
      `INSERT INTO vip_destinations (lang, position, eyebrow, title, body_ru, body_en, image)
       VALUES ('ru', @position, @eyebrow, @title, @body_ru, @body_en, @image)`
    );
    VIP_DESTINATIONS.forEach((d, i) => stmt.run({ ...d, position: i }));
  });
  tx.exclusive();
}

// --- Itinerary seed (idempotent; runs even on a pre-existing DB) ---
function seedItineraries(db: Database.Database) {
  const tx = db.transaction(() => {
    const n = db.prepare("SELECT COUNT(*) AS n FROM itineraries").get() as {
      n: number;
    };
    if (n.n > 0) return;

    const seedPath = path.join(process.cwd(), "lib", "itineraries.seed.json");
    if (!fs.existsSync(seedPath)) return;
    const items = JSON.parse(fs.readFileSync(seedPath, "utf8")) as ItinSeed[];

    const itinStmt = db.prepare(
      `INSERT INTO itineraries
        (lang, position, slug, theme, eyebrow, title_main, title_accent, subtitle,
         rule, chips, tagline, duration_label, cities_label, image,
         overview_eyebrow, overview_title, overview_meta, overview_col3,
         closing_title_main, closing_title_accent, closing_text, closing_route,
         closing_tagline, footer)
       VALUES (@lang,@position,@slug,@theme,@eyebrow,@title_main,@title_accent,@subtitle,
         @rule,@chips,@tagline,@duration_label,@cities_label,@image,
         @overview_eyebrow,@overview_title,@overview_meta,@overview_col3,
         @closing_title_main,@closing_title_accent,@closing_text,@closing_route,
         @closing_tagline,@footer)`
    );
    const dayStmt = db.prepare(
      `INSERT INTO itinerary_days
        (lang, itinerary_id, position, num, label, title_main, title_accent,
         subtitle, ov_program, ov_city, ov_gold)
       VALUES (@lang,@itinerary_id,@position,@num,@label,@title_main,@title_accent,
         @subtitle,@ov_program,@ov_city,@ov_gold)`
    );
    const blockStmt = db.prepare(
      `INSERT INTO itinerary_blocks
        (lang, day_id, position, type, opt, sunset, icon, eyebrow, title, body,
         quote, tags, tip, data)
       VALUES (@lang,@day_id,@position,@type,@opt,@sunset,@icon,@eyebrow,@title,@body,
         @quote,@tags,@tip,@data)`
    );

    items.forEach((it, ii) => {
      const info = itinStmt.run({
        lang: "ru",
        position: ii,
        slug: it.slug,
        theme: it.theme || "dark",
        eyebrow: it.cover.eyebrow,
        title_main: it.cover.title.main,
        title_accent: it.cover.title.accent,
        subtitle: it.cover.subtitle,
        rule: it.cover.rule,
        chips: it.cover.chips.join(" · "),
        tagline: it.cover.tagline,
        duration_label: it.cover.chips[0] ?? "",
        cities_label: it.cover.subtitle,
        image: "",
        overview_eyebrow: it.overview.eyebrow,
        overview_title: it.overview.title,
        overview_meta: it.overview.meta,
        overview_col3: it.overview.col3,
        closing_title_main: it.closing.title.main,
        closing_title_accent: it.closing.title.accent,
        closing_text: it.closing.text,
        closing_route: it.closing.route.join(" · "),
        closing_tagline: it.closing.tagline,
        footer: it.footer,
      });
      const itinId = Number(info.lastInsertRowid);

      it.days.forEach((d, di) => {
        const dInfo = dayStmt.run({
          lang: "ru",
          itinerary_id: itinId,
          position: di,
          num: d.num,
          label: d.label,
          title_main: d.title.main,
          title_accent: d.title.accent,
          subtitle: d.subtitle,
          ov_program: d.overview.program,
          ov_city: d.overview.city,
          ov_gold: d.overview.gold ? 1 : 0,
        });
        const dayId = Number(dInfo.lastInsertRowid);

        d.blocks.forEach((b, bi) => {
          blockStmt.run({
            lang: "ru",
            day_id: dayId,
            position: bi,
            type: b.type,
            opt: b.opt ? 1 : 0,
            sunset: b.sunset ? 1 : 0,
            icon: b.icon ?? "",
            eyebrow: b.eyebrow ?? "",
            title: b.title ?? "",
            body: (b.body ?? []).join("\n\n"),
            quote: b.quote ?? "",
            tags: (b.tags ?? []).join(", "),
            tip: b.tip ?? "",
            data: b.data ? JSON.stringify(b.data) : "",
          });
        });
      });
    });
  });
  tx.exclusive();
}

// Every content table created by initSchema. Kept here so the legacy migration
// can rebuild them.
const CONTENT_TABLES = [
  "settings", "nav_items", "featured_tours", "tours", "destinations",
  "home_features", "home_stats", "timeline", "team", "partners",
  "doc_groups", "documents", "footer_columns", "footer_links",
];

function columnExists(db: Database.Database, table: string, col: string) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  return cols.some((c) => c.name === col);
}

// --- Legacy migration ---
// The pre-i18n schema had no `lang` column. CREATE TABLE IF NOT EXISTS never
// alters an existing table, so an old DB would throw "no such column: lang" on
// every query. Since all content is reseeded from code, we detect the old
// schema (settings table without a `lang` column), snapshot the file, and drop
// the stale tables so initSchema + seedIfEmpty can rebuild them for both langs.
function migrateLegacySchema(db: Database.Database) {
  const hasSettings = db
    .prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='settings'")
    .get();
  if (!hasSettings) return; // fresh DB — nothing to migrate
  if (columnExists(db, "settings", "lang")) return; // already current schema

  console.warn("[db] legacy pre-i18n schema detected — rebuilding tables");
  db.pragma("wal_checkpoint(TRUNCATE)");
  try {
    fs.copyFileSync(DB_PATH, `${DB_PATH}.legacy-${Date.now()}.bak`);
  } catch (err) {
    console.warn("[db] could not back up legacy DB:", err);
  }

  db.pragma("foreign_keys = OFF");
  db.transaction(() => {
    for (const t of CONTENT_TABLES) db.exec(`DROP TABLE IF EXISTS ${t}`);
  })();
  db.pragma("foreign_keys = ON");
}

// --- Schema ---
// Every content table carries a `lang` column ('ru' | 'en'). Settings are keyed
// by (key, lang) so the same wording exists once per language.
function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'ru',
      value TEXT NOT NULL,
      grp TEXT NOT NULL DEFAULT 'general',
      PRIMARY KEY (key, lang)
    );
    CREATE TABLE IF NOT EXISTS nav_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      href TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS featured_tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      idx TEXT NOT NULL,
      tagline TEXT NOT NULL,
      title TEXT NOT NULL,
      duration TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      category TEXT NOT NULL,
      place TEXT NOT NULL,
      duration TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      blurb TEXT NOT NULL,
      tours_label TEXT NOT NULL,
      image TEXT NOT NULL,
      aspect TEXT NOT NULL DEFAULT 'medium'
    );
    CREATE TABLE IF NOT EXISTS home_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS home_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      value TEXT NOT NULL,
      suffix TEXT NOT NULL DEFAULT '',
      label TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS timeline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      year TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      role TEXT NOT NULL,
      name TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS doc_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      intro TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      group_id INTEGER NOT NULL REFERENCES doc_groups(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      issuer TEXT NOT NULL,
      issued TEXT NOT NULL,
      status TEXT NOT NULL,
      status_type TEXT NOT NULL DEFAULT 'valid'
    );
    CREATE TABLE IF NOT EXISTS footer_columns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS footer_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      column_id INTEGER NOT NULL REFERENCES footer_columns(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      href TEXT NOT NULL DEFAULT '#'
    );
    -- Customer tour bookings. Not content (never seeded / never language-scoped);
    -- written by the public site, read in the /admin page.
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      tour_id INTEGER,
      tour_title TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    );
    -- Detailed day-by-day tour programmes (itineraries):
    -- itineraries -> itinerary_days -> itinerary_blocks.
    CREATE TABLE IF NOT EXISTS itineraries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      slug TEXT NOT NULL,
      theme TEXT NOT NULL DEFAULT 'dark',
      eyebrow TEXT NOT NULL DEFAULT '',
      title_main TEXT NOT NULL DEFAULT '',
      title_accent TEXT NOT NULL DEFAULT '',
      subtitle TEXT NOT NULL DEFAULT '',
      rule TEXT NOT NULL DEFAULT '',
      chips TEXT NOT NULL DEFAULT '',
      tagline TEXT NOT NULL DEFAULT '',
      duration_label TEXT NOT NULL DEFAULT '',
      cities_label TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      overview_eyebrow TEXT NOT NULL DEFAULT '',
      overview_title TEXT NOT NULL DEFAULT '',
      overview_meta TEXT NOT NULL DEFAULT '',
      overview_col3 TEXT NOT NULL DEFAULT '',
      closing_title_main TEXT NOT NULL DEFAULT '',
      closing_title_accent TEXT NOT NULL DEFAULT '',
      closing_text TEXT NOT NULL DEFAULT '',
      closing_route TEXT NOT NULL DEFAULT '',
      closing_tagline TEXT NOT NULL DEFAULT '',
      footer TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS itinerary_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      itinerary_id INTEGER NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      num TEXT NOT NULL DEFAULT '',
      label TEXT NOT NULL DEFAULT '',
      title_main TEXT NOT NULL DEFAULT '',
      title_accent TEXT NOT NULL DEFAULT '',
      subtitle TEXT NOT NULL DEFAULT '',
      ov_program TEXT NOT NULL DEFAULT '',
      ov_city TEXT NOT NULL DEFAULT '',
      ov_gold INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS itinerary_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      day_id INTEGER NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      type TEXT NOT NULL DEFAULT 'text',
      opt INTEGER NOT NULL DEFAULT 0,
      sunset INTEGER NOT NULL DEFAULT 0,
      icon TEXT NOT NULL DEFAULT '',
      eyebrow TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      quote TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '',
      tip TEXT NOT NULL DEFAULT '',
      data TEXT NOT NULL DEFAULT ''
    );
    -- VIP exclusive destinations (shown bilingually on the VIP page).
    CREATE TABLE IF NOT EXISTS vip_destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      eyebrow TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL DEFAULT '',
      body_ru TEXT NOT NULL DEFAULT '',
      body_en TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT ''
    );
  `);
}

// --- Seed (only when DB is fresh) ---
function seedIfEmpty(db: Database.Database) {
  const tx = db.transaction(() => {
    // Re-check inside the exclusive lock so concurrent processes (e.g. Next.js
    // build workers) don't seed twice.
    const count = db.prepare("SELECT COUNT(*) AS n FROM settings").get() as {
      n: number;
    };
    if (count.n > 0) return;

    const setStmt = db.prepare(
      "INSERT INTO settings (key, lang, value, grp) VALUES (?, ?, ?, ?)"
    );

    const ins = (table: string, cols: string[]) =>
      db.prepare(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${cols
          .map(() => "?")
          .join(", ")})`
      );

    const navStmt = ins("nav_items", ["lang", "position", "label", "href"]);
    const ftStmt = ins("featured_tours", [
      "lang", "position", "idx", "tagline", "title", "duration", "price", "image",
    ]);
    const tourStmt = ins("tours", [
      "lang", "position", "category", "place", "duration", "title", "body", "price", "image",
    ]);
    const destStmt = ins("destinations", [
      "lang", "position", "name", "blurb", "tours_label", "image", "aspect",
    ]);
    const featStmt = ins("home_features", ["lang", "position", "title", "body"]);
    const statStmt = ins("home_stats", ["lang", "position", "value", "suffix", "label"]);
    const tlStmt = ins("timeline", ["lang", "position", "year", "title", "body"]);
    const teamStmt = ins("team", ["lang", "position", "role", "name", "bio", "image"]);
    const partStmt = ins("partners", ["lang", "position", "name"]);
    const groupStmt = ins("doc_groups", ["lang", "position", "title", "intro"]);
    const docStmt = ins("documents", [
      "lang", "group_id", "position", "type", "title", "subtitle", "issuer", "issued", "status", "status_type",
    ]);
    const colStmt = ins("footer_columns", ["lang", "position", "title"]);
    const linkStmt = ins("footer_links", ["lang", "column_id", "position", "label", "href"]);

    for (const lang of LOCALES as Locale[]) {
      const c = content[lang];

      for (const [key, grp] of SETTING_KEY_GROUP) {
        setStmt.run(key, lang, c.text[key] ?? "", grp);
      }

      c.nav.forEach((n, i) => navStmt.run(lang, i, n.label, n.href));
      c.featuredTours.forEach((t, i) =>
        ftStmt.run(lang, i, t.index, t.tagline, t.title, t.duration, t.price, t.image)
      );
      c.tours.forEach((t, i) =>
        tourStmt.run(lang, i, t.category, t.place, t.duration, t.title, t.body, t.price, t.image)
      );
      c.destinations.forEach((d, i) =>
        destStmt.run(lang, i, d.name, d.blurb, d.tours, d.image, d.span)
      );
      c.homeFeatures.forEach((f, i) => featStmt.run(lang, i, f.title, f.body));
      c.homeStats.forEach((s, i) => statStmt.run(lang, i, s.value, s.suffix, s.label));
      c.timeline.forEach((t, i) => tlStmt.run(lang, i, t.year, t.title, t.body));
      c.team.forEach((m, i) => teamStmt.run(lang, i, m.role, m.name, m.bio, m.image));
      c.partners.forEach((p, i) => partStmt.run(lang, i, p));

      c.documentGroups.forEach((g, gi) => {
        const info = groupStmt.run(lang, gi, g.title, g.intro);
        const gid = Number(info.lastInsertRowid);
        g.docs.forEach((d, di) =>
          docStmt.run(lang, gid, di, d.type, d.title, d.subtitle, d.issuer, d.issued, d.status, d.statusType)
        );
      });

      c.footerColumns.forEach((col, ci) => {
        const info = colStmt.run(lang, ci, col.title);
        const cid = Number(info.lastInsertRowid);
        col.links.forEach((l, li) => linkStmt.run(lang, cid, li, l, "#"));
      });
    }
  });

  tx.exclusive();
}

// --- Connection export (after all definitions to avoid TDZ during seeding) ---
const globalForDb = globalThis as unknown as { __db?: Database.Database };
export const db: Database.Database = globalForDb.__db ?? createConnection();
if (process.env.NODE_ENV !== "production") globalForDb.__db = db;
