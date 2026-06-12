import "server-only";
import { db } from "./db";

export type Settings = Record<string, string>;

export function getSettings(group?: string): Settings {
  const rows = group
    ? (db
        .prepare("SELECT key, value FROM settings WHERE grp = ?")
        .all(group) as { key: string; value: string }[])
    : (db.prepare("SELECT key, value FROM settings").all() as {
        key: string;
        value: string;
      }[]);
  const map: Settings = {};
  for (const r of rows) map[r.key] = r.value;
  return map;
}

export function getNav() {
  return db
    .prepare("SELECT label, href FROM nav_items ORDER BY position, id")
    .all() as { label: string; href: string }[];
}

export function getFeaturedTours() {
  return db
    .prepare(
      "SELECT idx AS [index], tagline, title, duration, price, image FROM featured_tours ORDER BY position, id"
    )
    .all() as {
    index: string;
    tagline: string;
    title: string;
    duration: string;
    price: string;
    image: string;
  }[];
}

export function getTours() {
  return db
    .prepare(
      "SELECT id, category, place, duration, title, body, price, image FROM tours ORDER BY position, id"
    )
    .all() as {
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

export function getDestinations() {
  return db
    .prepare(
      "SELECT id, name, blurb, tours_label AS tours, image, aspect AS span FROM destinations ORDER BY position, id"
    )
    .all() as {
    id: number;
    name: string;
    blurb: string;
    tours: string;
    image: string;
    span: string;
  }[];
}

export function getHomeFeatures() {
  return db
    .prepare("SELECT title, body FROM home_features ORDER BY position, id")
    .all() as { title: string; body: string }[];
}

export function getHomeStats() {
  return db
    .prepare("SELECT value, suffix, label FROM home_stats ORDER BY position, id")
    .all() as { value: string; suffix: string; label: string }[];
}

export function getTimeline() {
  return db
    .prepare("SELECT year, title, body FROM timeline ORDER BY position, id")
    .all() as { year: string; title: string; body: string }[];
}

export function getTeam() {
  return db
    .prepare("SELECT role, name, bio, image FROM team ORDER BY position, id")
    .all() as { role: string; name: string; bio: string; image: string }[];
}

export function getPartners(): string[] {
  return (
    db.prepare("SELECT name FROM partners ORDER BY position, id").all() as {
      name: string;
    }[]
  ).map((p) => p.name);
}

export function getDocumentGroups() {
  const groups = db
    .prepare("SELECT id, title, intro FROM doc_groups ORDER BY position, id")
    .all() as { id: number; title: string; intro: string }[];
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
    return {
      title: g.title,
      intro: g.intro,
      count: `${docs.length} document${docs.length === 1 ? "" : "s"}`,
      docs,
    };
  });
}

export function getFooterColumns() {
  const cols = db
    .prepare("SELECT id, title FROM footer_columns ORDER BY position, id")
    .all() as { id: number; title: string }[];
  const linkStmt = db.prepare(
    "SELECT label FROM footer_links WHERE column_id = ? ORDER BY position, id"
  );
  return cols.map((c) => ({
    title: c.title,
    links: (linkStmt.all(c.id) as { label: string }[]).map((l) => l.label),
  }));
}

export function getContact() {
  const s = getSettings("contact");
  return {
    email: s.contact_email ?? "",
    phone: s.contact_phone ?? "",
    address: s.contact_address ?? "",
    whatsapp: s.contact_whatsapp ?? "",
  };
}

export function getBrand() {
  const s = getSettings("brand");
  return {
    name: s.brand_name ?? "PROTOCOL",
    tagline: s.brand_tagline ?? "Travel Services",
  };
}
