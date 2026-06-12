import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import * as seed from "./data";

// --- Connection (singleton across hot reloads) ---
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "protocol.db");

function createConnection(): Database.Database {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 8000");
  db.pragma("foreign_keys = ON");
  initSchema(db);
  seedIfEmpty(db);
  return db;
}

// --- Schema ---
function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      grp TEXT NOT NULL DEFAULT 'general'
    );
    CREATE TABLE IF NOT EXISTS nav_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      href TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS featured_tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      position INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      blurb TEXT NOT NULL,
      tours_label TEXT NOT NULL,
      image TEXT NOT NULL,
      aspect TEXT NOT NULL DEFAULT 'medium'
    );
    CREATE TABLE IF NOT EXISTS home_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS home_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      value TEXT NOT NULL,
      suffix TEXT NOT NULL DEFAULT '',
      label TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS timeline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      year TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      role TEXT NOT NULL,
      name TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS doc_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      intro TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS footer_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

    // settings (singleton text, grouped by page)
    const setStmt = db.prepare(
      "INSERT INTO settings (key, value, grp) VALUES (?, ?, ?)"
    );
    for (const [key, value, grp] of SEED_SETTINGS) setStmt.run(key, value, grp);

    const ins = (table: string, cols: string[]) =>
      db.prepare(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${cols
          .map(() => "?")
          .join(", ")})`
      );

    const navStmt = ins("nav_items", ["position", "label", "href"]);
    seed.nav.forEach((n, i) => navStmt.run(i, n.label, n.href));

    const ftStmt = ins("featured_tours", [
      "position", "idx", "tagline", "title", "duration", "price", "image",
    ]);
    seed.featuredTours.forEach((t, i) =>
      ftStmt.run(i, t.index, t.tagline, t.title, t.duration, t.price, t.image)
    );

    const tourStmt = ins("tours", [
      "position", "category", "place", "duration", "title", "body", "price", "image",
    ]);
    seed.tours.forEach((t, i) =>
      tourStmt.run(i, t.category, t.place, t.duration, t.title, t.body, t.price, t.image)
    );

    const destStmt = ins("destinations", [
      "position", "name", "blurb", "tours_label", "image", "aspect",
    ]);
    seed.destinations.forEach((d, i) =>
      destStmt.run(i, d.name, d.blurb, d.tours, d.image, d.span)
    );

    const featStmt = ins("home_features", ["position", "title", "body"]);
    seed.homeFeatures.forEach((f, i) => featStmt.run(i, f.title, f.body));

    const statStmt = ins("home_stats", ["position", "value", "suffix", "label"]);
    seed.homeStats.forEach((s, i) => statStmt.run(i, s.value, s.suffix, s.label));

    const tlStmt = ins("timeline", ["position", "year", "title", "body"]);
    seed.timeline.forEach((t, i) => tlStmt.run(i, t.year, t.title, t.body));

    const teamStmt = ins("team", ["position", "role", "name", "bio", "image"]);
    seed.team.forEach((m, i) => teamStmt.run(i, m.role, m.name, m.bio, m.image));

    const partStmt = ins("partners", ["position", "name"]);
    seed.partners.forEach((p, i) => partStmt.run(i, p));

    const groupStmt = ins("doc_groups", ["position", "title", "intro"]);
    const docStmt = ins("documents", [
      "group_id", "position", "type", "title", "subtitle", "issuer", "issued", "status", "status_type",
    ]);
    seed.documentGroups.forEach((g, gi) => {
      const info = groupStmt.run(gi, g.title, g.intro);
      const gid = Number(info.lastInsertRowid);
      g.docs.forEach((d, di) =>
        docStmt.run(gid, di, d.type, d.title, d.subtitle, d.issuer, d.issued, d.status, d.statusType)
      );
    });

    const colStmt = ins("footer_columns", ["position", "title"]);
    const linkStmt = ins("footer_links", ["column_id", "position", "label", "href"]);
    seed.footerColumns.forEach((c, ci) => {
      const info = colStmt.run(ci, c.title);
      const cid = Number(info.lastInsertRowid);
      c.links.forEach((l, li) => linkStmt.run(cid, li, l, "#"));
    });
  });

  tx.exclusive();
}

// All singleton text, grouped per admin page: [key, value, group]
const SEED_SETTINGS: [string, string, string][] = [
  // brand
  ["brand_name", "PROTOCOL", "brand"],
  ["brand_tagline", "Travel Services", "brand"],
  // contact
  ["contact_email", seed.contact.email, "contact"],
  ["contact_phone", seed.contact.phone, "contact"],
  ["contact_address", seed.contact.address, "contact"],
  ["contact_whatsapp", seed.contact.whatsapp, "contact"],
  // home — hero
  ["home_hero_eyebrow", "Uzbekistan · Private Tours · Since 2008", "home"],
  ["home_hero_title_1", "The Silk Road,", "home"],
  ["home_hero_title_2", "As It Was Meant To Be", "home"],
  ["home_hero_subtitle", "Bespoke private journeys through Samarkand, Bukhara, Khiva & Tashkent", "home"],
  ["home_hero_button", "Explore Our Tours", "home"],
  // home — about intro
  ["home_about_eyebrow", "About Protocol", "home"],
  ["home_about_heading", "We do not simply arrange travel. We compose experiences that endure long after the journey ends.", "home"],
  ["home_about_p1", "Protocol Travel Services is Uzbekistan's premier inbound tour operator for discerning private travellers. Founded in Tashkent in 2008, we have spent over fifteen years cultivating relationships with the finest guides, restorers, and scholars of the Silk Road — people who unlock doors that remain closed to ordinary visitors.", "home"],
  ["home_about_p2", "Every itinerary is designed around you: your pace, your passions, your private moments with monuments that once stood at the centre of the world.", "home"],
  ["home_about_link", "Our Story", "home"],
  // home — featured
  ["home_featured_eyebrow", "Featured Journeys", "home"],
  ["home_featured_heading", "Curated Private Tours", "home"],
  ["home_featured_link", "View All Tours →", "home"],
  // home — testimonial
  ["testimonial_quote", seed.testimonial.quote, "home"],
  ["testimonial_name", seed.testimonial.name, "home"],
  ["testimonial_place", seed.testimonial.place, "home"],
  // home — cta
  ["home_cta_eyebrow", "Begin Here", "home"],
  ["home_cta_title_1", "Your Silk Road Journey", "home"],
  ["home_cta_title_2", "Awaits Its Author", "home"],
  ["home_cta_button", "Plan Your Journey", "home"],
  // tours page
  ["tours_eyebrow", "Private Journeys", "tours"],
  ["tours_title_1", "Our Tours &", "tours"],
  ["tours_title_2", "Expeditions", "tours"],
  ["tours_intro", "Every itinerary is designed as a starting point. We refine each journey around your pace, your passions, your private moments with the ancient world.", "tours"],
  // destinations page
  ["dest_eyebrow", "Where We Take You", "destinations"],
  ["dest_title", "Destinations", "destinations"],
  ["dest_intro", "Six cities. Thirty centuries. One continuous civilisation that once connected the world — and still does, for those who look closely enough.", "destinations"],
  ["dest_quote", "Every destination we offer, we know by foot — not by brochure.", "destinations"],
  ["dest_cta_link", "Plan a Custom Journey →", "destinations"],
  // about page
  ["about_eyebrow", "Protocol Travel Services", "about"],
  ["about_title_1", "Our", "about"],
  ["about_title_2", "Story", "about"],
  ["about_hero_caption", "Bukhara, Uzbekistan", "about"],
  ["about_mission_eyebrow", "Our Mission", "about"],
  ["about_mission_heading", "To reveal the Silk Road as it has never been shown to the outside world — from the inside, with", "about"],
  ["about_mission_highlight", "depth and discretion.", "about"],
  ["about_founder_p1", "I founded Protocol because I was tired of watching my country be seen only in glimpses — a photograph of a dome, a souvenir from a market stall, a rushed morning at the Registan. Uzbekistan deserves more than that. So do the people who travel here.", "about"],
  ["about_founder_p2", "Our guests spend evenings with calligraphers in their workshops, mornings with archaeologists mid-excavation, and afternoons in private libraries holding manuscripts that predate print. This is not tourism. This is scholarship made comfortable.", "about"],
  ["about_founder_signature", "Akbar Rakhimov", "about"],
  ["about_milestones_eyebrow", "Milestones", "about"],
  ["about_milestones_title_1", "Sixteen Years", "about"],
  ["about_milestones_title_2", "in the Making", "about"],
  ["about_milestones_intro", "We have grown slowly and on purpose — adding one new specialist at a time, one new monument at a time, one new relationship at a time.", "about"],
  ["about_team_eyebrow", "The People", "about"],
  ["about_team_heading", "Meet the Team", "about"],
  ["about_team_intro", "A small, deliberately chosen group. Every specialist is an expert in a particular city, era, or craft — not a generalist guide.", "about"],
  ["about_partners_heading", "Trusted Partners & Accreditations", "about"],
  // documents page
  ["docs_eyebrow", "Trust & Transparency", "documents"],
  ["docs_title_1", "Licenses &", "documents"],
  ["docs_title_2", "Certifications", "documents"],
  ["docs_intro", "Protocol Travel Services operates with full transparency. Every license, certificate, and membership we hold is listed here — available for your review and download. We believe that trust is not claimed; it is demonstrated.", "documents"],
  ["docs_footnote", "All documents are maintained in their original language and accompanied by certified English translations where required. For verification requests, notarised copies, or due-diligence inquiries, please contact us directly at legal@protocoluz.com. Documents are updated within 30 days of renewal or amendment.", "documents"],
];

// --- Connection export (after all definitions to avoid TDZ during seeding) ---
const globalForDb = globalThis as unknown as { __db?: Database.Database };
export const db: Database.Database = globalForDb.__db ?? createConnection();
if (process.env.NODE_ENV !== "production") globalForDb.__db = db;
