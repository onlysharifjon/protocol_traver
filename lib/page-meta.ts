import "server-only";
import type { Metadata } from "next";
import { getLang } from "./locale";

type MetaCopy = { title: string; description: string };

// Language-aware <title> / description / OG for a static page. Use from a
// page's generateMetadata() so the tags follow the visitor's lang cookie.
export function localizedMeta(copy: { ru: MetaCopy; en: MetaCopy }): Metadata {
  const c = copy[getLang()];
  return {
    title: c.title,
    description: c.description,
    openGraph: { title: c.title, description: c.description },
  };
}
