// Admin resource configuration — drives the generic list/edit UI and the
// server-action whitelist. Plain data (importable from server and client).

export type FieldType = "text" | "textarea" | "image" | "select" | "ref" | "number";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select
  refTable?: string; // for ref
  refLabel?: string; // column to show for ref
};

export type Resource = {
  slug: string;
  table: string;
  title: string; // singular
  titlePlural: string;
  listColumns: string[]; // which fields to show in the list table
  fields: Field[];
};

const positionField: Field = { name: "position", label: "Order", type: "number" };

export const RESOURCES: Resource[] = [
  {
    slug: "featured-tours",
    table: "featured_tours",
    title: "Featured Tour",
    titlePlural: "Featured Tours (Home)",
    listColumns: ["idx", "title", "price"],
    fields: [
      { name: "idx", label: "Number", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "price", label: "Price", type: "text" },
      { name: "image", label: "Image", type: "image" },
      positionField,
    ],
  },
  {
    slug: "tours",
    table: "tours",
    title: "Tour",
    titlePlural: "Tours",
    listColumns: ["title", "place", "duration", "price"],
    fields: [
      { name: "category", label: "Category", type: "text" },
      { name: "place", label: "Place", type: "text" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Description", type: "textarea" },
      { name: "price", label: "Price", type: "text" },
      { name: "image", label: "Image", type: "image" },
      positionField,
    ],
  },
  {
    slug: "destinations",
    table: "destinations",
    title: "Destination",
    titlePlural: "Destinations",
    listColumns: ["name", "tours_label"],
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "blurb", label: "Blurb", type: "textarea" },
      { name: "tours_label", label: "Tours label", type: "text" },
      { name: "image", label: "Image", type: "image" },
      { name: "aspect", label: "Card size", type: "select", options: ["tall", "medium", "short"] },
      positionField,
    ],
  },
  {
    slug: "features",
    table: "home_features",
    title: "Feature",
    titlePlural: "Home Features",
    listColumns: ["title"],
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      positionField,
    ],
  },
  {
    slug: "stats",
    table: "home_stats",
    title: "Stat",
    titlePlural: "Home Stats",
    listColumns: ["value", "label"],
    fields: [
      { name: "value", label: "Value", type: "text" },
      { name: "suffix", label: "Suffix", type: "text" },
      { name: "label", label: "Label", type: "text" },
      positionField,
    ],
  },
  {
    slug: "timeline",
    table: "timeline",
    title: "Milestone",
    titlePlural: "Timeline (About)",
    listColumns: ["year", "title"],
    fields: [
      { name: "year", label: "Year", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      positionField,
    ],
  },
  {
    slug: "team",
    table: "team",
    title: "Team Member",
    titlePlural: "Team (About)",
    listColumns: ["name", "role"],
    fields: [
      { name: "role", label: "Role", type: "text" },
      { name: "name", label: "Name", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "image", label: "Photo", type: "image" },
      positionField,
    ],
  },
  {
    slug: "partners",
    table: "partners",
    title: "Partner",
    titlePlural: "Partners (About)",
    listColumns: ["name"],
    fields: [
      { name: "name", label: "Name", type: "text" },
      positionField,
    ],
  },
  {
    slug: "doc-groups",
    table: "doc_groups",
    title: "Document Group",
    titlePlural: "Document Groups",
    listColumns: ["title"],
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      positionField,
    ],
  },
  {
    slug: "documents",
    table: "documents",
    title: "Document",
    titlePlural: "Documents",
    listColumns: ["title", "status"],
    fields: [
      { name: "group_id", label: "Group", type: "ref", refTable: "doc_groups", refLabel: "title" },
      { name: "type", label: "Type", type: "select", options: ["PDF", "DOC", "CERT"] },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "issuer", label: "Issuer", type: "text" },
      { name: "issued", label: "Issued", type: "text" },
      { name: "status", label: "Status text", type: "text" },
      { name: "status_type", label: "Status type", type: "select", options: ["valid", "expired", "ongoing"] },
      positionField,
    ],
  },
  {
    slug: "nav",
    table: "nav_items",
    title: "Nav Item",
    titlePlural: "Navigation",
    listColumns: ["label", "href"],
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "href", label: "Link", type: "text" },
      positionField,
    ],
  },
  {
    slug: "footer-columns",
    table: "footer_columns",
    title: "Footer Column",
    titlePlural: "Footer Columns",
    listColumns: ["title"],
    fields: [
      { name: "title", label: "Title", type: "text" },
      positionField,
    ],
  },
  {
    slug: "footer-links",
    table: "footer_links",
    title: "Footer Link",
    titlePlural: "Footer Links",
    listColumns: ["label"],
    fields: [
      { name: "column_id", label: "Column", type: "ref", refTable: "footer_columns", refLabel: "title" },
      { name: "label", label: "Label", type: "text" },
      { name: "href", label: "Link", type: "text" },
      positionField,
    ],
  },
];

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

// Settings groups (singleton text), shown as page-by-page forms.
export const SETTINGS_GROUPS: { slug: string; title: string }[] = [
  { slug: "home", title: "Home Page Text" },
  { slug: "tours", title: "Tours Page Text" },
  { slug: "destinations", title: "Destinations Page Text" },
  { slug: "about", title: "About Page Text" },
  { slug: "documents", title: "Documents Page Text" },
  { slug: "brand", title: "Brand" },
  { slug: "contact", title: "Contact Details" },
];

export function prettifyKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
