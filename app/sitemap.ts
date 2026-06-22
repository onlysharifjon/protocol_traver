import type { MetadataRoute } from "next";
import { getItineraries } from "@/lib/queries";

const SITE = "https://protocoldmc.com";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static public routes, highest-value first.
  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/tours", priority: 0.9, freq: "weekly" },
    { path: "/destinations", priority: 0.9, freq: "monthly" },
    { path: "/vip-services", priority: 0.8, freq: "monthly" },
    { path: "/mice-events", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/documents", priority: 0.4, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  // Day-by-day itinerary pages.
  let itineraries: ReturnType<typeof getItineraries> = [];
  try {
    itineraries = getItineraries();
  } catch {
    itineraries = [];
  }
  for (const it of itineraries) {
    entries.push({
      url: `${SITE}/tours/${it.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
