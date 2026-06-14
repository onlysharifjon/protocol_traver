import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { content, LOCALES, SETTING_KEY_GROUP, type Locale } from "./data";

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
  return db;
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
