import "server-only";
import { db } from "./db";
import { DEFAULT_LOCALE, type Locale } from "./data";

export type Settings = Record<string, string>;

// Russian plural form: (1) one, (2–4) few, (0, 5+) many
function ruPlural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export function getSettings(group: string, lang: Locale = DEFAULT_LOCALE): Settings {
  const rows = db
    .prepare("SELECT key, value FROM settings WHERE grp = ? AND lang = ?")
    .all(group, lang) as { key: string; value: string }[];
  const map: Settings = {};
  for (const r of rows) map[r.key] = r.value;
  return map;
}

export function getNav(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare("SELECT label, href FROM nav_items WHERE lang = ? ORDER BY position, id")
    .all(lang) as { label: string; href: string }[];
}

export function getFeaturedTours(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare(
      "SELECT idx AS [index], tagline, title, duration, price, image FROM featured_tours WHERE lang = ? ORDER BY position, id"
    )
    .all(lang) as {
    index: string;
    tagline: string;
    title: string;
    duration: string;
    price: string;
    image: string;
  }[];
}

export function getTours(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare(
      "SELECT id, category, place, duration, title, body, price, image FROM tours WHERE lang = ? ORDER BY position, id"
    )
    .all(lang) as {
    id: number;
    category: string;
    place: string;
    duration: string;
    title: string;
    body: string;
    price: string;
    image: string;
  }[];
}

export function getDestinations(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare(
      "SELECT id, name, blurb, tours_label AS tours, image, aspect AS span FROM destinations WHERE lang = ? ORDER BY position, id"
    )
    .all(lang) as {
    id: number;
    name: string;
    blurb: string;
    tours: string;
    image: string;
    span: string;
  }[];
}

export function getHomeFeatures(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare("SELECT title, body FROM home_features WHERE lang = ? ORDER BY position, id")
    .all(lang) as { title: string; body: string }[];
}

export function getHomeStats(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare("SELECT value, suffix, label FROM home_stats WHERE lang = ? ORDER BY position, id")
    .all(lang) as { value: string; suffix: string; label: string }[];
}

export function getTimeline(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare("SELECT year, title, body FROM timeline WHERE lang = ? ORDER BY position, id")
    .all(lang) as { year: string; title: string; body: string }[];
}

export function getTeam(lang: Locale = DEFAULT_LOCALE) {
  return db
    .prepare("SELECT role, name, bio, image FROM team WHERE lang = ? ORDER BY position, id")
    .all(lang) as { role: string; name: string; bio: string; image: string }[];
}

export function getPartners(lang: Locale = DEFAULT_LOCALE): string[] {
  return (
    db
      .prepare("SELECT name FROM partners WHERE lang = ? ORDER BY position, id")
      .all(lang) as { name: string }[]
  ).map((p) => p.name);
}

export function getDocumentGroups(lang: Locale = DEFAULT_LOCALE) {
  const groups = db
    .prepare("SELECT id, title, intro FROM doc_groups WHERE lang = ? ORDER BY position, id")
    .all(lang) as { id: number; title: string; intro: string }[];
  const docStmt = db.prepare(
    "SELECT type, title, subtitle, issuer, issued, status, status_type AS statusType FROM documents WHERE group_id = ? ORDER BY position, id"
  );
  return groups.map((g) => {
    const docs = docStmt.all(g.id) as {
      type: string;
      title: string;
      subtitle: string;
      issuer: string;
      issued: string;
      status: string;
      statusType: string;
    }[];
    const n = docs.length;
    const count =
      lang === "ru"
        ? `${n} ${ruPlural(n, "документ", "документа", "документов")}`
        : `${n} document${n === 1 ? "" : "s"}`;
    return { title: g.title, intro: g.intro, count, docs };
  });
}

export function getFooterColumns(lang: Locale = DEFAULT_LOCALE) {
  const cols = db
    .prepare("SELECT id, title FROM footer_columns WHERE lang = ? ORDER BY position, id")
    .all(lang) as { id: number; title: string }[];
  const linkStmt = db.prepare(
    "SELECT label FROM footer_links WHERE column_id = ? ORDER BY position, id"
  );
  return cols.map((c) => ({
    title: c.title,
    links: (linkStmt.all(c.id) as { label: string }[]).map((l) => l.label),
  }));
}

export function getContact(lang: Locale = DEFAULT_LOCALE) {
  const s = getSettings("contact", lang);
  return {
    email: s.contact_email ?? "",
    phone: s.contact_phone ?? "",
    address: s.contact_address ?? "",
    whatsapp: s.contact_whatsapp ?? "",
  };
}

export function getBrand(lang: Locale = DEFAULT_LOCALE) {
  const s = getSettings("brand", lang);
  return {
    name: s.brand_name ?? "PROTOCOL",
    tagline: s.brand_tagline ?? "Travel Services",
  };
}
